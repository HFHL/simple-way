"use client";

import React, { useEffect, useState, useRef } from "react";

import { techWords } from "@/components/list/TechWords";

interface FallingWord {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  isStatic: boolean;
  stopY: number;
  fadeStartTime: number;
  isFading: boolean;
}

export const BackgroundWords: React.FC = () => {
  const [words, setWords] = useState<FallingWord[]>([]);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const generateWord = (): FallingWord => ({
      id: Date.now() + Math.random(),
      text: techWords[Math.floor(Math.random() * techWords.length)],
      x: Math.random() * 100,
      y: -30 - Math.random() * 100,
      speed: Math.random() * 1.2 + 0.6,
      opacity: Math.random() * 0.6 + 0.1,
      isStatic: false,
      stopY: Math.random() * 80 + 10,
      fadeStartTime: 0,
      isFading: false,
    });

    const initialWords = Array.from({ length: 6 }, generateWord);

    setWords(initialWords);

    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;
      const deltaTime = currentTime - lastTimeRef.current;

      lastTimeRef.current = currentTime;

      setWords((prevWords) => {
        let newWords = [...prevWords];

        newWords = newWords.map((word) => {
          // 如果正在消失，计算消失动画
          if (word.isFading) {
            const fadeProgress = (currentTime - word.fadeStartTime) / 3000;

            if (fadeProgress >= 1) {
              return { ...word, opacity: 0 }; // 完全透明
            }

            const fadeOpacity = word.opacity * (1 - fadeProgress);
            const fadeY = word.stopY + fadeProgress * 20;

            return {
              ...word,
              y: fadeY,
              opacity: fadeOpacity,
            };
          }

          // 如果已经静止，检查是否开始消失
          if (word.isStatic) {
            const staticTime = currentTime - word.fadeStartTime;

            if (staticTime > 2000 + Math.random() * 2000 && !word.isFading) {
              return {
                ...word,
                isFading: true,
                fadeStartTime: currentTime,
              };
            }

            return word;
          }

          const newY = word.y + word.speed * deltaTime * 0.15;

          let newIsStatic: boolean = word.isStatic;
          let newFadeStartTime = word.fadeStartTime;

          if (newY >= word.stopY) {
            newIsStatic = true;
            newFadeStartTime = currentTime;
          }

          return {
            ...word,
            y: newIsStatic ? word.stopY : newY,
            isStatic: newIsStatic,
            fadeStartTime: newFadeStartTime,
          };
        });

        // 移除完全透明的文字和超出屏幕的单词
        newWords = newWords.filter((word) => {
          if (word.opacity <= 0) return false;
          if (word.isFading) return true;
          if (word.isStatic) return true;

          return word.y < 110;
        });

        // 添加新单词
        const fallingWords = newWords.filter(
          (word) => !word.isStatic && !word.isFading,
        );

        if (fallingWords.length < 6 && Math.random() < 0.03) {
          newWords.push(generateWord());
        }

        return newWords;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {words.map((word) => (
        <div
          key={word.id}
          className="absolute font-mono text-default-300 dark:text-default-700 transition-all duration-1000"
          style={{
            left: `${word.x}%`,
            top: `${word.y}%`,
            opacity: word.opacity,
            fontSize: "14px",
          }}
        >
          {word.text}
        </div>
      ))}
    </div>
  );
};
