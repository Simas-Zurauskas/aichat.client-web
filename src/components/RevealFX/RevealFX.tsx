'use client';

import React, { useState, useEffect, forwardRef } from 'react';
import styled from '@emotion/styled';

const RevealFxContainer = styled.span<{ isRevealed: boolean; speed: string; translateValue?: string }>`
  display: inline-block;
  position: relative;
  mask-image: linear-gradient(to right, black 0%, black 25%, transparent 50%);
  mask-size: 300% 100%;
  transition: all ${({ speed }) => speed} ease-in-out;
  mask-position: ${({ isRevealed }) => (isRevealed ? '0 0' : '100% 0')};
  filter: ${({ isRevealed }) => (isRevealed ? 'blur(0)' : 'blur(0.5rem)')};
  transform: ${({ isRevealed, translateValue }) => (isRevealed ? 'translateY(0)' : `translateY(${translateValue})`)};
`;

interface RevealFxProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  speed?: 'slow' | 'medium' | 'fast';
  delay?: number;
  translateY?: number | string;
  trigger?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const RevealFx = forwardRef<HTMLSpanElement, RevealFxProps>(
  ({ children, speed = 'medium', delay = 0, translateY, trigger, style, className, ...rest }, ref) => {
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
      if (trigger) {
        const timer = setTimeout(() => {
          setIsRevealed(trigger);
        }, delay * 1000);
      }
    }, [trigger, delay]);

    const getSpeedDuration = () => {
      switch (speed) {
        case 'fast':
          return '1s';
        case 'medium':
          return '2s';
        case 'slow':
          return '3s';
        default:
          return '2s';
      }
    };

    const getTranslateYValue = () => {
      if (typeof translateY === 'number') {
        return `${translateY}rem`;
      } else if (typeof translateY === 'string') {
        return `var(--static-space-${translateY})`;
      }
      return undefined;
    };

    const translateValue = getTranslateYValue();

    return (
      <RevealFxContainer
        ref={ref}
        aria-hidden="true"
        isRevealed={isRevealed}
        speed={getSpeedDuration()}
        translateValue={translateValue}
        style={style}
        className={className}
        {...rest}
      >
        {children}
      </RevealFxContainer>
    );
  },
);

RevealFx.displayName = 'RevealFx';

export default RevealFx;
