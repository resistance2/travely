import useAddTravelStore from '@/stores/useAddTravelStore';
import useFieldStore from '@/stores/useFieldStore';
import useImageStore from '@/stores/useImageStore';
import useSectionsStore from '@/stores/useSectionsStore';
import { useCallback } from 'react';

const useResetAddTravel = () => {
  const resetImages = useImageStore((state) => state.actions.resetImages);
  const resetData = useAddTravelStore((state) => state.resetData);
  const resetSections = useSectionsStore((state) => state.resetSections);
  const resetField = useFieldStore((state) => state.actions.resetField);

  const resetAddTravel = useCallback(() => {
    resetImages();
    resetData();
    resetField();
    resetSections();
  }, [resetImages, resetData, resetField, resetSections]);
  return { resetAddTravel };
};

export default useResetAddTravel;
