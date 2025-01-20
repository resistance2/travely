import useUserStore from '@/stores/useUserStore';
import { TagPath } from '@/types/tagType';
import { ITravelCard } from '@/types/travelCardType';
import axios from 'axios';
import { SERVER } from '@/constants/url';

interface IPageInfo {
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
}
interface IGetTravelList {
  page: number;
  size: number;
  tag: TagPath | '전체';
}
interface IGetTravelListRes {
  success: boolean;
  data: {
    travels: ITravelCard[];
    pageInfo: IPageInfo;
  };
}

export interface IGetTravelListReturn {
  cardDatas: ITravelCard[];
  nextCursor: number | null;
  currentPage: number;
}

const getTravelList = async ({
  page,
  size,
  tag,
}: IGetTravelList): Promise<IGetTravelListReturn> => {
  const userId = useUserStore.getState().user?.userId;
  const res = await axios.get<IGetTravelListRes>(
    `${SERVER}/api/v1/travels/travel-list?userId=${userId}&page=${page}&size=${size}&tag=${tag === '전체' ? 'all' : tag}`,
  );
  const { currentPage, hasNext } = res.data.data.pageInfo;
  const cardDatas = res.data.data.travels;
  const nextCursor = hasNext ? currentPage + 1 : null;

  return {
    cardDatas,
    nextCursor,
    currentPage,
  };
};

export default getTravelList;
