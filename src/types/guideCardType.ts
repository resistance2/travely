export interface IGuideCard {
  readonly thumbnail: string; // 이미지 경로
  readonly travelTitle: string; // 카드의 제목
  readonly createdBy: {
    // 작성자
    readonly userId: string;
    readonly userName: string;
  };
  readonly team: {
    readonly personLimit: number;
    readonly mbti: string[];
  };
  readonly reviewCnt: number;
}
