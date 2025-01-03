import { useState } from 'react';

const useComposing = () => {
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = <T extends HTMLElement>(
    e: React.KeyboardEvent<T>,
    callback: () => void,
  ) => {
    if (e.key === 'Enter' && !isComposing) {
      callback();
    }
  };

  return { isComposing, setIsComposing, handleKeyDown };
};

export default useComposing;
