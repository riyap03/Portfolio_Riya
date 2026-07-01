import { useEffect, useRef } from 'react';

export function useMagneticCursor(ref: React.RefObject<HTMLElement | null>, strength: number = 0.3) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      const maxDistance = 150;

      if (distance < maxDistance) {
        const force = (1 - distance / maxDistance) * strength;
        const offsetX = (distX / distance) * force * 20;
        const offsetY = (distY / distance) * force * 20;

        element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      } else {
        element.style.transform = 'translate(0, 0)';
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0, 0)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);
}
