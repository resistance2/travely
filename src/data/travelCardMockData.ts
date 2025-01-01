import { ITravelCard } from '@/types/travelCardType';

const travelCardMockData: ITravelCard[] = [
  {
    thumbnail: '/src/assets/thumb.png',
    travelTitle: '대한민국 국밥 TOP 30',
    createdBy: {
      userId: '0',
      userName: '배하은',
    },
    price: 49000,
    review: {
      travelScore: 5.0,
      reviewCnt: 23,
    },
    tag: ['Food', 'Culture'],
    bookmark: false,
  },
  {
    thumbnail: '/src/assets/thumb.png',
    travelTitle: '서울 최고의 김치찌개 맛집',
    createdBy: {
      userId: '1',
      userName: '맛집탐방러',
    },
    price: 42000,
    review: {
      travelScore: 4.8,
      reviewCnt: 18,
    },
    tag: ['Food', 'Festival'],
    bookmark: false,
  },
  {
    thumbnail: '/src/assets/thumb.png',
    travelTitle: '강릉 해변에서 즐기는 바비큐',
    createdBy: {
      userId: '2',
      userName: '여행러버',
    },
    price: 60000,
    review: {
      travelScore: 4.9,
      reviewCnt: 35,
    },
    tag: ['Nature', 'Food'],
    bookmark: true,
  },
  {
    thumbnail: '/src/assets/thumb.png',
    travelTitle: '부산의 밤을 즐기는 방법',
    createdBy: {
      userId: '3',
      userName: '밤하늘',
    },
    price: 55000,
    review: {
      travelScore: 4.7,
      reviewCnt: 12,
    },
    tag: ['Culture', 'K-POP'],
    bookmark: false,
  },
  {
    thumbnail: '/src/assets/thumb.png',
    travelTitle: '전주 한옥마을 힐링 투어',
    createdBy: {
      userId: '4',
      userName: '힐링러버',
    },
    price: 50000,
    review: {
      travelScore: 5.0,
      reviewCnt: 27,
    },
    tag: ['Culture', 'Healing'],
    bookmark: true,
  },
  {
    thumbnail: '/src/assets/thumb.png',
    travelTitle: '대한민국 국밥 TOP 30',
    createdBy: {
      userId: '5',
      userName: '하루얌',
    },
    price: 49000,
    review: {
      travelScore: 5.0,
      reviewCnt: 23,
    },
    tag: ['Food', 'Culture'],
    bookmark: false,
  },
  {
    thumbnail: '/src/assets/thumb.png',
    travelTitle: '서울 최고의 김치찌개 맛집',
    createdBy: {
      userId: '6',
      userName: '맛집탐방러',
    },
    price: 42000,
    review: {
      travelScore: 4.8,
      reviewCnt: 18,
    },
    tag: ['Food', 'Festival'],
    bookmark: false,
  },
  {
    thumbnail: '/src/assets/thumb.png',
    travelTitle: '강릉 해변에서 즐기는 바비큐',
    createdBy: {
      userId: '7',
      userName: '여행러버',
    },
    price: 60000,
    review: {
      travelScore: 4.9,
      reviewCnt: 35,
    },
    tag: ['Nature', 'Food'],
    bookmark: true,
  },
  {
    thumbnail: '/src/assets/thumb.png',
    travelTitle: '부산의 밤을 즐기는 방법',
    createdBy: {
      userId: '8',
      userName: '밤하늘',
    },
    price: 55000,
    review: {
      travelScore: 4.7,
      reviewCnt: 12,
    },
    tag: ['Culture', 'K-POP'],
    bookmark: false,
  },
  {
    thumbnail: '/src/assets/thumb.png',
    travelTitle: '전주 한옥마을 힐링 투어',
    createdBy: {
      userId: '9',
      userName: '힐링러버',
    },
    price: 50000,
    review: {
      travelScore: 5.0,
      reviewCnt: 27,
    },
    tag: ['Culture', 'Healing'],
    bookmark: true,
  },
];

export default travelCardMockData;
