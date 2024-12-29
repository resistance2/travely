import axios from 'axios';

const SERVER = import.meta.env.VITE_SERVER_URL;

const getMyCreatedTravel = async (userId: string) => {
  try {
    const response = await axios.get(
      `${SERVER}/api/v1/travels/my-created-travels?userId=${userId}`,
    );
    return response.data.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '내가만든 여행 데이터 가져오기 실패');
  }
};

export default getMyCreatedTravel;
