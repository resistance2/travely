import { TagType } from '@/types/tagType';

export interface ITravelCard {
  readonly id: string; //여행고유 아이디
  readonly thumbnail: string; // 이미지 경로
  readonly travelTitle: string; // 카드의 제목
  readonly createdBy: {
    // 작성자
    readonly userId: string;
    readonly userName: string;
  };
  readonly price: number; //가격
  readonly review: {
    //리뷰
    readonly travelScore: number;
    readonly reviewCnt: number;
  };
  readonly tag: TagType[]; // 태그 목록
  readonly bookmark: boolean; // 북마크 여부
}
