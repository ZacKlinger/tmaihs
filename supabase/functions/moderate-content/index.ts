import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ALLOWED_ORIGINS = [
  'https://tmaihs.lovable.app',
  'https://id-preview--7b83ffee-5309-495b-a168-c1601951c8b7.lovable.app',
  'http://localhost:8080',
];

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') || '';
  if (ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed) || origin === allowed)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
    };
  }
  return {
    'Access-Control-Allow-Origin': '',
    'Access-Control-Allow-Headers': '',
  };
}

// Content length limits
const MAX_CONTENT_LENGTH = 5000;
const MAX_AUTHOR_NAME_LENGTH = 100;

// Rate limiting configuration (in-memory, resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per 10 minutes per IP (tightened for security)

// HTML/XSS patterns for server-side sanitization
const HTML_TAG_PATTERN = /<[^>]+>/;
const SCRIPT_INJECTION_PATTERNS = [
  /javascript:/gi,
  /on\w+\s*=/gi,
  /data:/gi,
];

/**
 * Validate input for HTML tags and script injection (XSS prevention)
 */
function sanitizeAndValidate(text: string): { sanitized: string; isValid: boolean; reason?: string } {
  // Check for script injection patterns first
  for (const pattern of SCRIPT_INJECTION_PATTERNS) {
    if (pattern.test(text)) {
      return { sanitized: text, isValid: false, reason: 'Script content is not allowed' };
    }
  }
  
  // Check for HTML tags
  if (HTML_TAG_PATTERN.test(text)) {
    return { sanitized: text, isValid: false, reason: 'HTML tags are not allowed' };
  }
  
  return { sanitized: text, isValid: true };
}

function getClientIP(req: Request): string {
  // Try various headers for client IP
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIP = req.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  // Fallback to a hash of user-agent + other headers as identifier
  const userAgent = req.headers.get('user-agent') || 'unknown';
  return `ua-${userAgent.substring(0, 50)}`;
}

function checkRateLimit(clientId: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const existing = rateLimitMap.get(clientId);

  // Clean up old entries periodically
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < now) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!existing || existing.resetTime < now) {
    // New window
    rateLimitMap.set(clientId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((existing.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  existing.count++;
  return { allowed: true };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: getCorsHeaders(req) });
  }

  try {
    // Rate limiting check
    const clientId = getClientIP(req);
    const rateCheck = checkRateLimit(clientId);
    
    if (!rateCheck.allowed) {
      console.log(`Rate limit exceeded for client: ${clientId}`);
      return new Response(
        JSON.stringify({ 
          error: 'Too many requests. Please wait before posting again.',
          retryAfter: rateCheck.retryAfter 
        }),
        { 
          status: 429, 
          headers: { 
            ...getCorsHeaders(req), 
            'Content-Type': 'application/json',
            'Retry-After': String(rateCheck.retryAfter)
          } 
        }
      );
    }

    const { content, authorName } = await req.json();
    
    // Validate content exists and is a string
    if (!content || typeof content !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Content is required' }),
        { status: 400, headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } }
      );
    }

    // Validate content length
    if (content.length > MAX_CONTENT_LENGTH) {
      console.log(`Content too long: ${content.length} characters`);
      return new Response(
        JSON.stringify({ 
          isAppropriate: false, 
          reason: `Content exceeds maximum length of ${MAX_CONTENT_LENGTH} characters.` 
        }),
        { headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } }
      );
    }

    // Validate author name length if provided
    if (authorName && typeof authorName === 'string' && authorName.length > MAX_AUTHOR_NAME_LENGTH) {
      console.log(`Author name too long: ${authorName.length} characters`);
      return new Response(
        JSON.stringify({ 
          isAppropriate: false, 
          reason: `Author name exceeds maximum length of ${MAX_AUTHOR_NAME_LENGTH} characters.` 
        }),
        { headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } }
      );
    }

    // XSS Prevention: Validate content for HTML/script injection
    const contentValidation = sanitizeAndValidate(content);
    if (!contentValidation.isValid) {
      console.log(`Content rejected - XSS risk: ${contentValidation.reason}`);
      return new Response(
        JSON.stringify({ 
          isAppropriate: false, 
          reason: contentValidation.reason 
        }),
        { headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } }
      );
    }

    // XSS Prevention: Validate author name for HTML/script injection
    if (authorName && typeof authorName === 'string') {
      const nameValidation = sanitizeAndValidate(authorName);
      if (!nameValidation.isValid) {
        console.log(`Author name rejected - XSS risk: ${nameValidation.reason}`);
        return new Response(
          JSON.stringify({ 
            isAppropriate: false, 
            reason: `Author name: ${nameValidation.reason}` 
          }),
          { headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } }
        );
      }
    }

    console.log(`Moderating content (${content.length} chars) from client: ${clientId}`);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not set');
      // Fallback to allowing content if AI moderation unavailable
      return new Response(
        JSON.stringify({ isAppropriate: true, reason: null }),
        { headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-lite',
        messages: [
          {
            role: 'system',
            content: `You are a content moderator for an educational discussion board used by teachers.
Your job is to determine if the content is appropriate for a professional educational context.

Flag content that contains:
- Profanity, slurs, or offensive language
- Personal attacks or harassment
- Hate speech or discriminatory content
- Sexually explicit content
- Violence or threats
- Spam or promotional content
- Personally identifiable student information

Allow content that:
- Discusses AI, education, and teaching professionally
- Expresses concerns, questions, or excitement about AI
- Is respectful even if expressing disagreement

Respond with a JSON object:
{
  "isAppropriate": boolean,
  "reason": string or null (only if not appropriate)
}`
          },
          {
            role: 'user',
            content: `Please moderate this content:\n\n${content}`
          }
        ],
        temperature: 0.1,
        max_tokens: 200
      })
    });

    if (!response.ok) {
      console.error('AI moderation API error:', response.status);
      // Fallback to allowing content if AI moderation fails
      return new Response(
        JSON.stringify({ isAppropriate: true, reason: null }),
        { headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || '';
    
    console.log('AI moderation response:', aiResponse);

    // Parse the AI response
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        return new Response(
          JSON.stringify({
            isAppropriate: result.isAppropriate !== false,
            reason: result.reason || null
          }),
          { headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } }
        );
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
    }

    // Default to allowing if parsing fails
    return new Response(
      JSON.stringify({ isAppropriate: true, reason: null }),
      { headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Moderation error:', error);
    return new Response(
      JSON.stringify({ error: 'Moderation failed' }),
      { status: 500, headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } }
    );
  }
});
