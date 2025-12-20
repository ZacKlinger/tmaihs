import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const GHOST_PHRASES = [
  "tell me about the ethics of AI",
  "help me plan a lesson",
  "help me level up my prompt engineering",
];

const TYPING_SPEED = 70; // ms per character - human reading speed
const TYPING_VARIANCE = 40; // natural human variance
const DELETE_SPEED = 35; // deliberate deletion speed
const PAUSE_AFTER_TYPING = 2500; // 2.5 seconds to read the message
const PAUSE_AFTER_DELETING = 1800; // 1.8 seconds of blinking cursor before next phrase

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
      const pauseDuration = isDeleting ? PAUSE_AFTER_DELETING : PAUSE_AFTER_TYPING;
      const timer = setTimeout(() => {
        setIsPaused(false);
        if (!isDeleting) {
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
        className="block text-sm text-muted-foreground mb-3 text-center font-sans"
      >
        Curious about something else?
      </label>
      
      <form onSubmit={handleSubmit} className="relative">
        <div 
          className={cn(
            "relative rounded-xl border bg-background/80 backdrop-blur-sm transition-all duration-300",
            isFocused 
              ? "border-primary/40 shadow-soft" 
              : "border-border/50 hover:border-border"
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
              "w-full bg-transparent py-4 px-6 text-charcoal placeholder:text-transparent",
              "focus:outline-none font-sans text-base",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            placeholder={ghostText}
            autoComplete="off"
          />
          
          {/* Ghost text overlay - only visible when unfocused and no user input */}
          {!hasUserTyped && !isFocused && (
            <div 
              className="absolute inset-0 flex items-center px-6 pointer-events-none"
              aria-hidden="true"
            >
              <span className="text-muted-foreground/60 font-sans text-base">
                {ghostText}
                <span 
                  className="ml-0.5 text-primary/70 inline-block w-[2px] h-[1.1em] align-middle bg-primary/70"
                  style={{ animation: "cursor-blink 0.8s steps(1) infinite" }}
                />
              </span>
            </div>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Loader2 className="h-5 w-5 animate-spin text-primary/60" />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
