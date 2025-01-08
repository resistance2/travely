import { IGuideCard } from '@/types/guideCardType';

const guideCardMockData: IGuideCard[] = [
  {
    id: '0',
    thumbnail: '/src/assets/guide-card-thumb.png',
    travelTitle: '국밥투어 해주실분 구합니다',
    createdBy: {
      userId: 'user_1071',
      userName: '박민준',
    },
    team: {
      personLimit: 6,
      mbti: ['ENFJ', 'ISFP'],
    },
    commentCnt: 26,
  },
  {
    id: '1',
    thumbnail: '/src/assets/guide-card-thumb.png',
    travelTitle: '서울 맛집 잘 아시는분 구합니다',
    createdBy: {
      userId: 'user_8807',
      userName: '이영희',
    },
    team: {
      personLimit: 6,
      mbti: ['ESFP', 'INTJ', 'ESTJ', 'ENTP', 'ISTJ', 'ISFJ'],
    },
    commentCnt: 49,
  },
  {
    id: '2',
    thumbnail: '/src/assets/guide-card-thumb.png',
    travelTitle: '반려동물 제주도 여행 계획 해주실분?',
    createdBy: {
      userId: 'user_3186',
      userName: '홍길동',
    },
    team: {
      personLimit: 6,
      mbti: ['ISFJ', 'ENFP', 'INTJ', 'INFJ'],
    },
    commentCnt: 11,
  },
  {
    id: '3',
    thumbnail: '/src/assets/guide-card-thumb.png',
    travelTitle: '등산 동호회 가이드 해주실 분',
    createdBy: {
      userId: 'user_6332',
      userName: '이영희',
    },
    team: {
      personLimit: 6,
      mbti: ['ENFP', 'ENTP', 'ENFJ'],
    },
    commentCnt: 40,
  },
  {
    id: '4',
    thumbnail: '/src/assets/guide-card-thumb.png',
    travelTitle: '서울 야경 투어 계획 해주실 분',
    createdBy: {
      userId: 'user_9239',
      userName: '홍길동',
    },
    team: {
      personLimit: 6,
      mbti: ['INFP'],
    },
    commentCnt: 1,
  },
  {
    id: '5',
    thumbnail: '/src/assets/guide-card-thumb.png',
    travelTitle: '국밥투어 해주실분 구합니다',
    createdBy: {
      userId: 'user_8095',
      userName: '강미나',
    },
    team: {
      personLimit: 6,
      mbti: ['INFP', 'ISTP', 'INFJ', 'ESTP', 'INTP'],
    },
    commentCnt: 27,
  },
  {
    id: '6',
    thumbnail: '/src/assets/guide-card-thumb.png',
    travelTitle: '서울 맛집 잘 아시는분 구합니다',
    createdBy: {
      userId: 'user_8067',
      userName: '강미나',
    },
    team: {
      personLimit: 6,
      mbti: ['ESTJ', 'ISFJ', 'ISTJ', 'ENTP', 'ISFP', 'INFP'],
    },
    commentCnt: 36,
  },
  {
    id: '7',
    thumbnail: '/src/assets/guide-card-thumb.png',
    travelTitle: '반려동물 제주도 여행 계획 해주실분?',
    createdBy: {
      userId: 'user_4015',
      userName: '윤정우',
    },
    team: {
      personLimit: 6,
      mbti: ['ENTJ', 'INTJ', 'ISTJ', 'ESTP', 'ISFJ', 'ENFJ'],
    },
    commentCnt: 43,
  },
  {
    id: '8',
    thumbnail: '/src/assets/guide-card-thumb.png',
    travelTitle: '등산 동호회 가이드 해주실 분',
    createdBy: {
      userId: 'user_6187',
      userName: '박민준',
    },
    team: {
      personLimit: 6,
      mbti: ['INTJ', 'ESTJ', 'ESFJ', 'INTP'],
    },
    commentCnt: 3,
  },
  {
    id: '9',
    thumbnail: '/src/assets/guide-card-thumb.png',
    travelTitle: '서울 야경 투어 계획 해주실 분',
    createdBy: {
      userId: 'user_1332',
      userName: '이영희',
    },
    team: {
      personLimit: 6,
      mbti: ['ENFP', 'ESTP', 'ISFP'],
    },
    commentCnt: 17,
  },
];

export default guideCardMockData;
