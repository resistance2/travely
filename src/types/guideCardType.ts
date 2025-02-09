export interface IGuideCard {
  readonly id: string;
  readonly thumbnail: string;
  readonly travelTitle: string;
  readonly createdBy: {
    readonly userId: {
      _id: string;
      mbti: string;
    };
    readonly userName: string;
  };
  readonly team: {
    readonly personLimit: number;
    readonly mbti: string[];
  };
  readonly commentCnt: number;
}
