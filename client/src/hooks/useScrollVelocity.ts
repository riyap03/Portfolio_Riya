import { useEffect, useRef, useState } from 'react';

export function useScrollVelocity() {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollRef = useRef(0);
  const velocityRef = useRef(0);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollRef.current;
      
      // Calculate velocity with damping
      velocityRef.current = delta * 0.5 + velocityRef.current * 0.5;
      lastScrollRef.current = currentScroll;

      // Normalize velocity to 0-1 range
      const normalizedVelocity = Math.min(Math.abs(velocityRef.current) / 10, 1);
      setScrollVelocity(normalizedVelocity);

      // Decay velocity when not scrolling
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        velocityRef.current *= 0.95;
        if (Math.abs(velocityRef.current) < 0.1) {
          velocityRef.current = 0;
        }
        setScrollVelocity(Math.min(Math.abs(velocityRef.current) / 10, 1));
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return scrollVelocity;
}
