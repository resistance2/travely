import createTravel from '@/api/addTravel/createTravel';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useCreateTravel = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createTravel,
    onSuccess: (data) => {
      if (data) {
        alert('글 작성 완료');
        navigate('/');
      }
    },
    onError: () => {
      alert('글 작성 실패!!!!!!!!');
    },
  });
};

export default useCreateTravel;
