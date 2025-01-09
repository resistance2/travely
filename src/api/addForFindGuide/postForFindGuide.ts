import { AddForFindGuideData } from '@/types/guideFindDataType';
import axios from 'axios';

const SERVER = import.meta.env.VITE_SERVER_URL;

const postForFindGuide = async (dataToUpload: AddForFindGuideData): Promise<string> => {
  try {
    const response = await axios.post(`${SERVER}/api/v1/travels-guide/add-travel`, dataToUpload);
    return response.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '가이드 구해요 글 작성 실패');
  }
};

export default postForFindGuide;
