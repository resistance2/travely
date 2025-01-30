// import { SERVER } from '@/constants/url';
import { SERVER } from '@/constants/url';
import { TagType } from '@/types/tagType';
import axios from 'axios';

export interface TravelPatchRequestData {
  title?: string;
  content?: string;
  price?: number;
  thumbnail?: string;
  tag?: TagType;
  travelCourse?: string[];
  includedItems?: string[];
  excludedItems?: string[];
  meetingTime?: string[];
  travelFAQ?: {
    question: string;
    answer: string;
  }[];
  meetingPlace?: string;
}

export interface TravelPatchResponseData {
  _id: string;
  userId: string;
  title: string;
  content: string;
  price: number;
  thumbnail: string;
  tag: TagType;
  travelCourse: string[];
  includedItems?: string[];
  excludedItems?: string[];
  travelFAQ?: {
    question: string;
    answer: string;
  }[];
  meetingPlace?: string;
}

interface TravelPatchResponse {
  success: boolean;
  data: TravelPatchResponseData;
}

const patchTravel = async (
  travelId: string,
  travelData: TravelPatchRequestData,
): Promise<TravelPatchResponse> => {
  try {
    const response = await axios.patch<TravelPatchResponse>(
      `${SERVER}/api/v1/travels/${travelId}`,
      travelData,
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err instanceof Error ? err.message : '여행 정보 수정 실패');
  }
};

export default patchTravel;
