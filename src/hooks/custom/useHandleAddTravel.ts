import useFieldStore from '@/stores/useFieldStore';
import { validateAddTravel } from '@/utils/validCheck';
import useImageStore from '@/stores/useImageStore';
import useHandleImageUpload from '@/hooks/custom/useHandleImageUpload';
import useCreateTravel from '@/hooks/query/useCreateTravel';
import useAddTravelStore from '@/stores/useAddTravelStore';

const useHandleAddTravel = () => {
  const setData = useAddTravelStore((state) => state.setData);
  const images = useImageStore((state) => state.images);
  const uploadImages = useHandleImageUpload(images).uploadImages;
  const mutate = useCreateTravel().mutate;

  const submitAddTravel = async () => {
    const data = useAddTravelStore.getState().data;

    if (validateAddTravel(data)) {
      try {
        const { thumbnail, meetingSpace } = await uploadImages();
        setData({ thumbnail: thumbnail[0], meetingPlace: meetingSpace[0] });
      } catch (error) {
        console.error(error);
        return false;
      }

      const updatedData = useAddTravelStore.getState().data;
      if (!updatedData.thumbnail || updatedData.thumbnail.trim().length === 0) {
        console.error('썸네일 등록에 오류가 있습니다.');
        return false;
      }

      mutate(updatedData);
    } else {
      return false;
    }
  };

  const handleAddTravel = () => {
    const { includeList, excludeList, faqs, courseList, meetingTime, scheduleList } =
      useFieldStore.getState().fields;

    setData({
      includedItems: includeList,
      excludedItems: excludeList,
      FAQ: faqs,
      travelCourse: courseList,
      meetingTime,
      team: scheduleList,
    });

    submitAddTravel();
  };

  return { handleAddTravel };
};

export default useHandleAddTravel;
