import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content } = await req.json();
    
    if (!content || typeof content !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Moderating content:', content.substring(0, 100) + '...');

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not set');
      // Fallback to allowing content if AI moderation unavailable
      return new Response(
        JSON.stringify({ isAppropriate: true, reason: null }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
    }

    // Default to allowing if parsing fails
    return new Response(
      JSON.stringify({ isAppropriate: true, reason: null }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Moderation error:', error);
    return new Response(
      JSON.stringify({ error: 'Moderation failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
