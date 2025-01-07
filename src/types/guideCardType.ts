export interface IGuideCard {
  readonly thumbnail: string;
  readonly travelTitle: string;
  readonly createdBy: {
    readonly userId: string;
    readonly userName: string;
  };
  readonly team: {
    readonly personLimit: number;
    readonly mbti: string[];
  };
  readonly commentCnt: number;
}
