// components/Typewriter.tsx
"use client";

import React, { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number; // ms per char
  deletingSpeed?: number; // ms per char when deleting
  pauseBetween?: number; // ms to pause after full word typed
  loop?: boolean;
  className?: string;
}

export default function Typewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseBetween = 1500,
  loop = true,
  className = "",
}: TypewriterProps) {
  const [index, setIndex] = useState(0); // index of current word
  const [subIndex, setSubIndex] = useState(0); // how many chars currently shown
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  // caret blink
  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(t);
  }, []);

  // typing / deleting effect
  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentIndex = index % words.length;
    const currentWord = words[currentIndex];

    // If loop is false and we've finished the last word and finished typing it,
    // stop further action (do not start deleting).
    if (!loop && index >= words.length - 1 && !isDeleting && subIndex === currentWord.length) {
      return;
    }

    let timeoutId: number | null = null;

    if (!isDeleting && subIndex < currentWord.length) {
      // typing forward until full length
      timeoutId = window.setTimeout(() => {
        setSubIndex((s) => s + 1);
      }, typingSpeed);
    } else if (!isDeleting && subIndex === currentWord.length) {
      // reached full word: pause, then start deleting (if looping allowed)
      timeoutId = window.setTimeout(() => {
        if (loop || index < words.length - 1) {
          setIsDeleting(true);
        }
      }, pauseBetween);
    } else if (isDeleting && subIndex > 0) {
      // deleting characters
      timeoutId = window.setTimeout(() => {
        setSubIndex((s) => s - 1);
      }, deletingSpeed);
    } else if (isDeleting && subIndex === 0) {
      // finished deleting: move to next word and start typing
      setIsDeleting(false);
      setIndex((i) => i + 1);
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
    // dependencies intentionally include words and control props
  }, [subIndex, isDeleting, index, words, typingSpeed, deletingSpeed, pauseBetween, loop]);

  const display = words.length ? words[index % words.length].slice(0, Math.max(0, subIndex)) : "";

  return (
    <span className={className}>
      {display}
      <span aria-hidden className={`ml-1 inline-block ${blink ? "opacity-100" : "opacity-0"} transition-opacity`}>
        |
      </span>
    </span>
  );
}
