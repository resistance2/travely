import useFieldStore from '@/stores/useFieldStore';
import { validateAddTravel } from '@/utils/validCheck';

import useCreateTravel from '@/hooks/query/useCreateTravel';
import useAddTravelStore from '@/stores/useAddTravelStore';
import useModalStore from '@/stores/useModalStore';
import useUploadTravelImages from '@/hooks/custom/useUploadTravelImages';
import { AddTravelData } from '@/types/travelDataType';

const useHandleAddTravel = () => {
  const { upload } = useUploadTravelImages();
  const mutate = useCreateTravel().mutate;

  const handleAddTravel = async () => {
    const data: AddTravelData = {
      userId: useAddTravelStore.getState().data.userId,
      travelContent: useFieldStore.getState().fields.content,
      travelTitle: useAddTravelStore.getState().data.travelTitle,
      thumbnail: null,
      travelPrice: useAddTravelStore.getState().data.travelPrice,
      includedItems: useFieldStore.getState().fields.includeList,
      FAQ: useFieldStore.getState().fields.faqs,
      meetingTime: useFieldStore.getState().fields.meetingTime,
      excludedItems: useFieldStore.getState().fields.excludeList,
      meetingPlace: useAddTravelStore.getState().data.meetingPlace,
      tag: useAddTravelStore.getState().data.tag,
      team: useFieldStore.getState().fields.scheduleList,
      travelCourse: useFieldStore.getState().fields.courseList,
    };

    if (!validateAddTravel(data)) return false;
    if (data.travelPrice === 0) {
      const modalStore = useModalStore.getState();
      modalStore.setModalName('zero-price-confirm');
      return false;
    }

    const imageResult = await upload();

    if (!imageResult) return false;

    mutate({ ...data, ...imageResult });
  };

  return { handleAddTravel };
};

export default useHandleAddTravel;
