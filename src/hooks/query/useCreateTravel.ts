import createTravel from '@/api/addTravel/createTravel';
import useResetAddTravel from '@/hooks/custom/useResetAddTravel';

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useCreateTravel = () => {
  const navigate = useNavigate();
  const resetAddTravel = useResetAddTravel().resetAddTravel;

  return useMutation({
    mutationFn: createTravel,
    onSuccess: (data) => {
      if (data) {
        alert('글 작성 완료');
        resetAddTravel();
        navigate('/travel-list');
      }
    },
    onError: () => {
      alert('글 작성에 실패했습니다.');
    },
  });
};

export default useCreateTravel;
