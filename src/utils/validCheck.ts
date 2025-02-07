import { ShowToast } from '@/components/Toast';
import { AddTravelData } from '@/types/travelDataType';

export const isValidRatingNumber = (rating: number) => {
  return !Number.isNaN(rating) && rating >= 0 && rating <= 5 && typeof rating === 'number';
};

export const validateAddTravel = (data: AddTravelData): boolean => {
  const { userId, travelTitle, travelContent, travelCourse, tag, team } = data;

  if (!userId || userId.trim().length === 0) {
    ShowToast('유저 ID는 필수입니다.', 'failed');
    return false;
  }

  if (!travelTitle || travelTitle.trim().length === 0 || travelTitle.length > 30) {
    ShowToast('여행 제목은 필수이며 30자 이내여야 합니다.', 'failed');
    return false;
  }

  if (!travelContent || travelContent.trim().length === 0) {
    ShowToast('상품 소개는 필수입니다.', 'failed');
    return false;
  }

  if (!Array.isArray(travelCourse) || travelCourse.length === 0) {
    ShowToast('여행 코스는 필수입니다.', 'failed');
    return false;
  }

  if (!Array.isArray(tag) || tag.length === 0) {
    ShowToast('태그는 최소 1개 이상 선택해주세요.', 'failed');
    return false;
  }

  if (!Array.isArray(team) || team.length === 0) {
    ShowToast('팀 정보는 필수입니다.', 'failed');
    return false;
  }

  return true;
};
