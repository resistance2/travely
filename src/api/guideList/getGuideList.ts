import useUserStore from '@/stores/useUserStore';
import { IGuideCard } from '@/types/guideCardType';
import axios from 'axios';
import { SERVER } from '@/constants/url';

interface IPageInfo {
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
}
interface IGetGuideList {
  page: number;
  size: number;
}
interface IGetGuideListRes {
  success: boolean;
  data: {
    travels: IGuideCard[];
    pageInfo: IPageInfo;
  };
}
export interface IGetGuidelListReturn {
  cardDatas: IGuideCard[];
  nextCursor: number | null;
  currentPage: number;
}

const getGuideList = async ({ page, size }: IGetGuideList) => {
  const userId = useUserStore.getState().user?.userId;

  const res = await axios.get<IGetGuideListRes>(
    `${SERVER}/api/v1/travels-guide/travel-list?userId=${userId}&page=${page}&size=${size}`,
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

export default getGuideList;
