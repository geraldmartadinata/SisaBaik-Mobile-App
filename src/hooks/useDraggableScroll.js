import { useRef, useState, useEffect } from 'react';

export default function useDraggableScroll() {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    const onMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - slider.offsetLeft);
      setScrollLeft(slider.scrollLeft);
    };

    const onMouseLeave = () => {
      setIsDragging(false);
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault(); // cegah seleksi teks
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // pengali kecepatan
      slider.scrollLeft = scrollLeft - walk;
    };

    const onWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        slider.scrollLeft += e.deltaY;
      }
    };

    slider.addEventListener('mousedown', onMouseDown);
    slider.addEventListener('mouseleave', onMouseLeave);
    slider.addEventListener('mouseup', onMouseUp);
    slider.addEventListener('mousemove', onMouseMove);
    slider.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mouseleave', onMouseLeave);
      slider.removeEventListener('mouseup', onMouseUp);
      slider.removeEventListener('mousemove', onMouseMove);
      slider.removeEventListener('wheel', onWheel);
    };
  }, [isDragging, startX, scrollLeft]);

  return scrollRef;
}
