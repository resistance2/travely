import { validateAddTravel } from '@/utils/validCheck';
import useCreateTravel from '@/hooks/query/useCreateTravel';
import { AddTravelData } from '@/types/travelDataType';

const useHandleAddTravel = (data: AddTravelData) => {
  const mutate = useCreateTravel().mutate;

  const handleAddTravel = () => {
    if (validateAddTravel(data)) {
      mutate(data);
    }
  };

  return { handleAddTravel };
};

export default useHandleAddTravel;
