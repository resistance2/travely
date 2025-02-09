import { SERVER } from '@/constants/url';
import axios from 'axios';

interface Applicant {
  userId: string;
  status: string;
  mbti: string;
}

export interface GuideTravel {
  id: string;
  travelTitle: string;
  teamId: string;
  appliedUsers: Applicant[];
  commentCount: number;
}

interface getMyCreatedGuideTravelListResponse {
  success: boolean;
  data: {
    travels: GuideTravel[];
    pageInfo: {
      totalElements: number;
      totalPages: number;
      currentPage: number;
      pageSize: number;
      hasNext: boolean;
    };
  };
}

interface IGetMyCreatedGuideTravel {
  userId: string;
  page: number;
  size: number;
}

const getMyCreatedGuideTravelList = async ({
  userId,
  page,
  size,
}: IGetMyCreatedGuideTravel): Promise<getMyCreatedGuideTravelListResponse> => {
  try {
    const response = await axios.get<getMyCreatedGuideTravelListResponse>(
      `${SERVER}/api/v1/travels-guide/my-travel-guides/${userId}`,
      {
        params: {
          page,
          size,
        },
      },
    );
    if (!response.data.success) {
      throw new Error('내 가이드 구인 여행 리스트 가져오기 실패');
    }
    return response.data;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : '내 가이드 구인 여행 리스트 가져오기 실패',
    );
  }
};

export default getMyCreatedGuideTravelList;
