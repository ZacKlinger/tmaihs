// Basic profanity filter with common offensive words
const PROFANITY_LIST = [
  'fuck', 'shit', 'ass', 'bitch', 'damn', 'crap', 'bastard', 'hell',
  'dick', 'cock', 'pussy', 'cunt', 'whore', 'slut', 'fag', 'nigger',
  'retard', 'idiot', 'stupid', 'dumb', 'kill', 'die', 'hate'
];

// Patterns that might indicate harmful content
const HARMFUL_PATTERNS = [
  /\b(threat|threaten|bomb|weapon|gun|shoot|stab|attack)\b/gi,
  /\b(suicide|self.?harm|cut.?myself)\b/gi,
  /\b(drug|cocaine|heroin|meth)\b/gi,
];

// HTML/script injection patterns for XSS prevention
const HTML_INJECTION_PATTERN = /<[^>]+>/;
const SCRIPT_PATTERNS = [
  /<script\b[^>]*>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi, // onclick=, onerror=, etc.
  /data:/gi,
];

export interface FilterResult {
  isClean: boolean;
  reason?: string;
  flaggedWords?: string[];
}

/**
 * Basic client-side content filter for profanity and harmful content
 */
export function filterContent(text: string): FilterResult {
  const lowerText = text.toLowerCase();
  const flaggedWords: string[] = [];

  // Check for HTML/script injection (XSS prevention)
  if (HTML_INJECTION_PATTERN.test(text)) {
    return {
      isClean: false,
      reason: 'HTML tags are not allowed in content',
      flaggedWords: ['HTML tags']
    };
  }

  // Check for script injection patterns
  for (const pattern of SCRIPT_PATTERNS) {
    if (pattern.test(text)) {
      return {
        isClean: false,
        reason: 'Script content is not allowed',
        flaggedWords: ['script injection']
      };
    }
  }

  // Check for profanity
  for (const word of PROFANITY_LIST) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    if (regex.test(lowerText)) {
      flaggedWords.push(word);
    }
  }

  // Check for harmful patterns
  for (const pattern of HARMFUL_PATTERNS) {
    const matches = lowerText.match(pattern);
    if (matches) {
      flaggedWords.push(...matches);
    }
  }

  if (flaggedWords.length > 0) {
    return {
      isClean: false,
      reason: 'Content contains inappropriate language or topics',
      flaggedWords: [...new Set(flaggedWords)]
    };
  }

  return { isClean: true };
}

/**
 * Generate a unique identifier for anonymous tracking
 */
export function generateAnonymousId(): string {
  const stored = localStorage.getItem('tmahs-anonymous-id');
  if (stored) return stored;
  
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  const randomHex = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
  const newId = `anon_${Date.now()}_${randomHex}`;
  localStorage.setItem('tmahs-anonymous-id', newId);
  return newId;
}

/**
 * Get voter identifier for upvote tracking
 */
export function getVoterId(): string {
  const stored = localStorage.getItem('tmahs-voter-id');
  if (stored) return stored;
  
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  const randomHex = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
  const newId = `voter_${Date.now()}_${randomHex}`;
  localStorage.setItem('tmahs-voter-id', newId);
  return newId;
}
