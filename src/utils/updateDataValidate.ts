import { ShowToast } from '@/components/Toast';
import { AddForFindGuideData } from '@/types/guideFindDataType';

const ERROR_MESSAGE: Record<string, string> = {
  travelTitle: '제목을 입력해주세요.',
  travelContent: '소개글을 입력해주세요.',
  team: '일정 및 팀을 추가해주세요',
} as const;

export const addForFindGuideDataValidate = (data: AddForFindGuideData): boolean => {
  const dataToArray: string[][] = Object.entries(data);
  const result = dataToArray
    .map((data) => {
      const [key, value] = data;
      if (key !== 'thumbnail') {
        if (value === null || value === undefined || value === '') {
          ShowToast(ERROR_MESSAGE[data[0]], 'failed');
          return false;
        }
      }
      return true;
    })
    .find((value) => value === false);
  return result === undefined;
};
