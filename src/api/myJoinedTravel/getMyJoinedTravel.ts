import { SERVER } from '@/constants/url';
import { myJoinedTravel } from '@/types/myJoinedTravel';
import axios from 'axios';

interface IGetMyJoinedTravel {
  userId: string;
  page: number;
  size: number;
}

interface IMyJoinedPageInfo {
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
}

interface IGETMyJoinedTravelRes {
  success: boolean;
  data: {
    travels: myJoinedTravel[];
    pageInfo: IMyJoinedPageInfo;
  };
}

export interface IGetMyJoinedTravelReturn {
  travelDatas: myJoinedTravel[];
  nextCursor: number | null;
  currentPage: number;
}

const getMyJoinedTravel = async ({ userId, page, size }: IGetMyJoinedTravel) => {
  try {
    const params = new URLSearchParams({
      userId,
      page: page.toString(),
      size: size.toString(),
    });
    const response = await axios.get<IGETMyJoinedTravelRes>(
      `${SERVER}/api/v1/travels/my-travels?${params.toString()}`,
    );
    const { currentPage, hasNext } = response.data.data.pageInfo;
    const travelDatas = response.data.data.travels;
    const nextCursor = hasNext ? currentPage + 1 : null;
    return {
      travelDatas,
      nextCursor,
      currentPage,
    };
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '내가참여한 여행 데이터 가져오기 실패');
  }
};

export default getMyJoinedTravel;
