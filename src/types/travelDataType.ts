import { TagType } from '@/types/tagType';
import { Review } from './reviewType';

type Status = 'waiting' | 'approved' | 'rejected';

export interface PageData {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
export interface TravelData {
  travelId: string;
  travelTitle: string;
  createdAt: string;
  updateAt: string;
  teamTeams: string[];
  travelActive: boolean;
  bankAccount: {
    accountNumber: string;
    bankCode: string;
  };
}
export interface TravelTeamData {
  teamId: string;
  travelStartDate: string;
  travelEndDate: string;
  personLimit: number;
  appliedUsers?: ApplicationUserData[];
  approvedUsers?: ApplicationUserData[];
  pagination: PageData;
}
export interface ApplicationUserData {
  status: Status;
  userName?: string;
  socialName: string;
  userEmail: string;
  userProfileImage: string;
  mbti: string;
  phoneNumber: string;
  userId: string;
  appliedAt: string;
}

export interface GuideData {
  userId: string;
  userProfileImage: string;
  socialName: string;
  userEmail: string;
  guideTotalRating: number;
}

export interface TravelDetailData {
  guide: GuideData;
  title: string;
  content: string;
  price: number;
  thumbnail: string;
  tag: string[];
  travelCourse: string[];
  includedItems: string[] | null;
  excludedItems: string[] | null;
  meetingTime: string[] | null;
  meetingPlace: string | null;
  FAQ: { question: string; answer: string }[] | null;
  reviews: Review[];
  team: Pick<
    TravelTeamData,
    'teamId' | 'travelStartDate' | 'travelEndDate' | 'personLimit' | 'approvedUsers'
  >[];
  totalRating: number;
  bookmark: number;
  isBookmark: boolean;
  isTraveler: boolean;
}

export interface AddTravelData {
  userId: string | null;
  thumbnail: string | null;
  travelTitle: string | null;
  travelContent: string | null;
  travelCourse: string[] | null;
  tag: TagType[] | null;
  team: Pick<TravelTeamData, 'personLimit' | 'travelStartDate' | 'travelEndDate'>[] | null;
  travelPrice: number | null;
  includedItems: string[] | null;
  excludedItems: string[] | null;
  meetingTime: string[] | null;
  FAQ: { question: string; answer: string }[] | null;
  meetingPlace: string | null;
}
