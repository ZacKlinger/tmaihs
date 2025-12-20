import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const GHOST_PHRASES = [
  "tell me about the ethics of AI",
  "help me plan a lesson",
  "how do I level up my prompt engineering",
];

const TYPING_SPEED = 75; // ms per character - thoughtful pace
const TYPING_VARIANCE = 35; // natural human variance
const DELETE_SPEED = 40; // deliberate deletion speed
const PAUSE_AFTER_TYPING = 2800; // 2.8 seconds to read the message
const PAUSE_AFTER_DELETING = 2000; // 2 seconds of pause before next phrase

interface GhostInputProps {
  onSubmit: (query: string) => void;
  isLoading?: boolean;
}

export function GhostInput({ onSubmit, isLoading = false }: GhostInputProps) {
  const [value, setValue] = useState("");
  const [ghostText, setGhostText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasUserTyped, setHasUserTyped] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ghost text animation
  useEffect(() => {
    if (hasUserTyped || isFocused || isHovered) return;

    const currentPhrase = GHOST_PHRASES[phraseIndex];
    
    if (isPaused) {
      const justFinishedTyping = charIndex === currentPhrase.length;
      const pauseDuration = justFinishedTyping ? PAUSE_AFTER_TYPING : PAUSE_AFTER_DELETING;
      
      const timer = setTimeout(() => {
        setIsPaused(false);
        if (justFinishedTyping) {
          setIsDeleting(true);
        }
      }, pauseDuration);
      return () => clearTimeout(timer);
    }

    if (isDeleting) {
      if (charIndex > 0) {
        const timer = setTimeout(() => {
          setCharIndex(prev => prev - 1);
          setGhostText(currentPhrase.slice(0, charIndex - 1));
        }, DELETE_SPEED);
        return () => clearTimeout(timer);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % GHOST_PHRASES.length);
        setIsPaused(true);
      }
    } else {
      if (charIndex < currentPhrase.length) {
        const variance = Math.random() * TYPING_VARIANCE;
        const timer = setTimeout(() => {
          setCharIndex(prev => prev + 1);
          setGhostText(currentPhrase.slice(0, charIndex + 1));
        }, TYPING_SPEED + variance);
        return () => clearTimeout(timer);
      } else {
        setIsPaused(true);
      }
    }
  }, [charIndex, phraseIndex, isDeleting, isPaused, hasUserTyped, isFocused, isHovered]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (newValue.length > 0 && !hasUserTyped) {
      setHasUserTyped(true);
      setGhostText("");
    }
    if (newValue.length === 0) {
      setHasUserTyped(false);
    }
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSubmit(value.trim());
    }
  }, [value, isLoading, onSubmit]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <label 
        htmlFor="ghost-input"
        className="block text-sm text-white mb-3 text-center font-sans drop-shadow-sm"
      >
        Curious about something else?
      </label>
      
      <form onSubmit={handleSubmit} className="relative">
        <div 
          className={cn(
            "relative rounded-2xl border bg-white/95 backdrop-blur-md transition-all duration-300",
            "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_8px_rgba(0,0,0,0.04),0_16px_32px_rgba(0,0,0,0.08)]",
            isFocused 
              ? "border-white/80 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08),0_24px_48px_rgba(0,0,0,0.12)]" 
              : "border-white/60 hover:border-white/80"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <input
            ref={inputRef}
            id="ghost-input"
            type="text"
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className={cn(
              "w-full bg-transparent py-3.5 px-5 text-charcoal placeholder:text-transparent",
              "focus:outline-none font-sans text-base",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            placeholder={ghostText}
            autoComplete="off"
          />
          
          {/* Ghost text overlay - black text, black cursor */}
          {!hasUserTyped && !isFocused && (
            <div 
              className="absolute inset-0 flex items-center px-5 pointer-events-none"
              aria-hidden="true"
            >
              <span className="text-charcoal/70 font-sans text-base">
                {ghostText}
                <span 
                  className="ml-0.5 inline-block w-[2px] h-[1.1em] align-middle bg-charcoal/80 animate-cursor-blink"
                />
              </span>
            </div>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Loader2 className="h-5 w-5 animate-spin text-stone-500" />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
