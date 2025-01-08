import { AddTravelData } from '@/types/travelDataType';

export const isValidRatingNumber = (rating: number) =>
  !Number.isNaN(rating) && rating >= 0 && rating <= 5;

export const validateAddTravel = (data: AddTravelData): boolean => {
  const { userId, travelTitle, travelContent, travelCourse, tag, team, travelPrice } = data;

  if (!userId || userId.trim().length === 0) {
    alert('유저 ID는 필수입니다.');
    return false;
  }

  if (!travelTitle || travelTitle.trim().length === 0 || travelTitle.length > 30) {
    alert('여행 제목은 필수이며 30자 이내여야 합니다.');
    return false;
  }

  if (!travelContent || travelContent.trim().length === 0) {
    alert('상품 소개는 필수입니다.');
    return false;
  }

  if (!Array.isArray(travelCourse) || travelCourse.length === 0) {
    alert('여행 코스는 필수입니다.');
    return false;
  }

  if (!Array.isArray(tag) || tag.length === 0) {
    alert('태그는 최소 1개 이상 선택해주세요.');
    return false;
  }

  if (!Array.isArray(team) || team.length === 0) {
    alert('팀 정보는 필수입니다.');
    return false;
  }

  if (travelPrice === 0) {
    const userConfirmed = window.confirm('여행 가격이 0원입니다. 계속 하시겠습니까?');
    if (!userConfirmed) {
      return false;
    }
  }

  return true;
};
