import { TravelTeamData } from './travelDataType';

export type TeamData = Pick<TravelTeamData, 'travelStartDate' | 'travelEndDate' | 'personLimit'>;

export type DetailTeam = Pick<
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
  userScore: number;
  userEmail: string;
}

export interface Comment {
  commentId: string;
  userId: string;
  socialName: string;
  userProfileImage: string | null;
  updatedAt: string;
  comment: string;
}

export interface PageInfo {
  currentPage: number;
  totalPages: number;
  totalComments: number;
}

export interface CommentData {
  commentList: Comment[] | null;
  pageInfo: PageInfo;
}

export interface FindGuideDetailData {
  author: Author;
  title: string;
  content: string;
  thumbnail: string | null;
  team: DetailTeam[];
  createdAt: string;
}
