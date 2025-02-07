import { SERVER } from '@/constants/url';
import { myCreatedTravel } from '@/types/myCreatedTravelType';
import axios from 'axios';

interface IGetMyCreatedTravel {
  userId: string;
  page: number;
  size: number;
}

interface IMyCreatedPageInfo {
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
}

interface IGetMyCreatedTravelRes {
  success: boolean;
  data: {
    travels: myCreatedTravel[];
    pageInfo: IMyCreatedPageInfo;
  };
}

export interface IGetMyCreatedTravelReturn {
  travelDatas: myCreatedTravel[];
  nextCursor: number | null;
  currentPage: number;
}

const getMyCreatedTravel = async ({ userId, page, size }: IGetMyCreatedTravel) => {
  try {
    const response = await axios.get<IGetMyCreatedTravelRes>(
      `${SERVER}/api/v1/travels/my-created-travels`,
      {
        params: {
          userId,
          page,
          size,
        },
      },
    );
    const { currentPage, hasNext } = response.data.data.pageInfo;
    const createdTravelDatas = response.data.data.travels;
    const nextCursor = hasNext ? currentPage + 1 : null;
    return {
      createdTravelDatas,
      nextCursor,
      currentPage,
    };
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '내가만든 여행 데이터 가져오기 실패');
  }
};

export default getMyCreatedTravel;
