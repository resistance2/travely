import createTravel from '@/api/addTravel/createTravel';
import { useMutation } from '@tanstack/react-query';

const useCreateTravel = () => {
  return useMutation({
    mutationFn: createTravel,
    onSuccess: () => {
      alert('글 작성 완료');
    },
    onError: () => {
      alert('글 작성 실패!!!!!!!!');
    },
  });
};

export default useCreateTravel;
