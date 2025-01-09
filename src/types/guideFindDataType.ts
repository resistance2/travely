import { TravelTeamData } from './travelDataType';

export type TeamData = Pick<
  TravelTeamData,
  'teamId' | 'travelStartDate' | 'travelEndDate' | 'personLimit'
>;

export interface AddForFindGuideData {
  userId: string | null;
  travelTitle: string | null;
  travelContent: string;
  thumbnail: string | null;
  team: TeamData[] | null;
}

export interface Author {
  userId: string;
  userProfileImage: string;
  socialName: string;
  userScore: number | null;
}

export interface Comment {
  commentId: string;
  userId: string;
  socialName: string;
  userProfileImage: string | null;
  updatedAt: string;
  comment: string;
}

export interface FindGuideDetailData {
  author: Author;
  title: string;
  content: string;
  thumbnail: string | null;
  team: TeamData[] | null;
  createdAt: string;
  commentList: Comment[] | null;
}
