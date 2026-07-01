import { useEffect, useState } from 'react';

export function useCelestialCamera() {
  const [cameraState, setCameraState] = useState({
    scrollProgress: 0,
    depth: 0,
    rotation: 0,
    scale: 1,
    opacity: 1
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;

      // Calculate depth (z-axis movement)
      const depth = scrollProgress * 1000;

      // Calculate subtle rotation
      const rotation = scrollProgress * 10;

      // Calculate scale (zoom effect)
      const scale = 1 + scrollProgress * 0.2;

      // Calculate opacity for fade effects
      const opacity = Math.min(1, 1 + (scrollProgress - 0.9) * 10);

      setCameraState({
        scrollProgress,
        depth,
        rotation,
        scale,
        opacity
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return cameraState;
}
