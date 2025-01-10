import { SERVER } from '@/constants/url';
import { AddTravelData } from '@/types/travelDataType';
import axios from 'axios';
interface ICreateTravelRes {
  success: boolean;
  data: AddTravelData;
}
const createTravel = async (data: AddTravelData): Promise<boolean> => {
  try {
    const res = await axios.post<ICreateTravelRes>(`${SERVER}/api/v1/travels/add-travel`, {
      ...data,
    });
    return res.data.success;
  } catch (error) {
    console.error('글 작성에 실패했습니다. ' + error);
    throw error;
  }
};

export default createTravel;
