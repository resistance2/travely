import { useEffect, useRef, useState } from 'react';

const useMoreBtn = <T extends HTMLElement>() => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState<number | null>(null);
  const heightRef = useRef<T>(null);

  useEffect(() => {
    if (heightRef.current) {
      setHeight(heightRef.current.offsetHeight);
    }
  }, [heightRef]);

  const handleToggle = () => setIsOpen(!isOpen);

  return {
    isOpen,
    heightRef,
    handleToggle,
    height,
  };
};

export default useMoreBtn;
