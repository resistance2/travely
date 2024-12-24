import { useRef, useState } from 'react';

const useAccordion = () => {
  const [openId, setOpenIds] = useState<{ [key: string]: boolean } | null>(null);

  const panelRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = (id: string, isOpen: boolean) => {
    setOpenIds((prev) => ({ ...prev, [id]: isOpen }));
  };

  return { openId, handleToggle, panelRef };
};

export default useAccordion;
