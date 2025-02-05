import { SERVER } from '@/constants/url';
import axios from 'axios';

interface registerTravelRequestParam {
  userId: string;
  teamId: string;
}

interface registerTravelResponse {
  success: boolean;
  data: {
    teamId: string;
    travelId: string;
  };
}

const registerTravel = async ({ userId, teamId }: registerTravelRequestParam) => {
  const { data } = await axios.post<registerTravelResponse>(
    `${SERVER}/api/v1/travels/${teamId}/join`,
    { userId },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return data;
};

export default registerTravel;
