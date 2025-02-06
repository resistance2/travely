import { SERVER } from '@/constants/url';
import axios from 'axios';

interface WaitingCountResponse {
  success: boolean;
  data: {
    waitings: number;
  };
}

const getTravelersWaitingCount = async (userId: string): Promise<WaitingCountResponse> => {
  try {
    const response = await axios.get<WaitingCountResponse>(
      `${SERVER}/api/v1/travels/travelers/waiting-count`,
      {
        params: {
          userId,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching travelers waiting count:', error);
    throw error;
  }
};

export default getTravelersWaitingCount;
