import { AddTravelData } from '@/types/travelDataType';
import axios from 'axios';

const createTravel = async (data: AddTravelData) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/travels/add-travel`, {
      data,
    });
    return res.data;
  } catch (error) {
    console.error('글 작성에 실패했습니다. ' + error);
    throw error;
  }
};

export default createTravel;
