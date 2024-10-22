import { TagType } from '@/types/tagType';
import thumbImg from '@/assets/thumb.png';

export interface CardData {
  imgSrc: string;
  title: string;
  userName: string;
  tags: TagType[];
  price: string;
  rating: string;
  reviewCount: string;
  people: string;
  bookMark: boolean;
}

const travelCardMockData: CardData[] = [
  {
    imgSrc: thumbImg,
    title: '대한민국 국밥 TOP 30',
    userName: '하루얌',
    tags: ['Food', 'Culture'],
    price: '49000',
    rating: '5.0',
    reviewCount: '23',
    people: '1',
    bookMark: false,
  },
  {
    imgSrc: thumbImg,
    title: '서울 최고의 김치찌개 맛집',
    userName: '맛집탐방러',
    tags: ['Food', 'Festival'],
    price: '42000',
    rating: '4.8',
    reviewCount: '18',
    people: '1',
    bookMark: false,
  },
  {
    imgSrc: thumbImg,
    title: '강릉 해변에서 즐기는 바비큐',
    userName: '여행러버',
    tags: ['Nature', 'Food'],
    price: '60000',
    rating: '4.9',
    reviewCount: '35',
    people: '1',
    bookMark: true,
  },
  {
    imgSrc: thumbImg,
    title: '부산의 밤을 즐기는 방법',
    userName: '밤하늘',
    tags: ['Culture', 'K-POP'],
    price: '55000',
    rating: '4.7',
    reviewCount: '12',
    people: '1',
    bookMark: false,
  },
  {
    imgSrc: thumbImg,
    title: '전주 한옥마을 힐링 투어',
    userName: '힐링러버',
    tags: ['Culture', 'Healing'],
    price: '50000',
    rating: '5.0',
    reviewCount: '27',
    people: '1',
    bookMark: true,
  },
  {
    imgSrc: thumbImg,
    title: '대한민국 국밥 TOP 30',
    userName: '하루얌',
    tags: ['Food', 'Culture'],
    price: '49000',
    rating: '5.0',
    reviewCount: '23',
    people: '1',
    bookMark: false,
  },
  {
    imgSrc: thumbImg,
    title: '서울 최고의 김치찌개 맛집',
    userName: '맛집탐방러',
    tags: ['Food', 'Festival'],
    price: '42000',
    rating: '4.8',
    reviewCount: '18',
    people: '1',
    bookMark: false,
  },
  {
    imgSrc: thumbImg,
    title: '강릉 해변에서 즐기는 바비큐',
    userName: '여행러버',
    tags: ['Nature', 'Food'],
    price: '60000',
    rating: '4.9',
    reviewCount: '35',
    people: '1',
    bookMark: true,
  },
  {
    imgSrc: thumbImg,
    title: '부산의 밤을 즐기는 방법',
    userName: '밤하늘',
    tags: ['Culture', 'K-POP'],
    price: '55000',
    rating: '4.7',
    reviewCount: '12',
    people: '1',
    bookMark: false,
  },
  {
    imgSrc: thumbImg,
    title: '전주 한옥마을 힐링 투어',
    userName: '힐링러버',
    tags: ['Culture', 'Healing'],
    price: '50000',
    rating: '5.0',
    reviewCount: '27',
    people: '1',
    bookMark: true,
  },
  {
    imgSrc: thumbImg,
    title: '대한민국 국밥 TOP 30',
    userName: '하루얌',
    tags: ['Food', 'Culture'],
    price: '49000',
    rating: '5.0',
    reviewCount: '23',
    people: '1',
    bookMark: false,
  },
  {
    imgSrc: thumbImg,
    title: '서울 최고의 김치찌개 맛집',
    userName: '맛집탐방러',
    tags: ['Food', 'Festival'],
    price: '42000',
    rating: '4.8',
    reviewCount: '18',
    people: '1',
    bookMark: false,
  },
  {
    imgSrc: thumbImg,
    title: '강릉 해변에서 즐기는 바비큐',
    userName: '여행러버',
    tags: ['Nature', 'Food'],
    price: '60000',
    rating: '4.9',
    reviewCount: '35',
    people: '1',
    bookMark: true,
  },
  {
    imgSrc: thumbImg,
    title: '부산의 밤을 즐기는 방법',
    userName: '밤하늘',
    tags: ['Culture', 'K-POP'],
    price: '55000',
    rating: '4.7',
    reviewCount: '12',
    people: '1',
    bookMark: false,
  },
  {
    imgSrc: thumbImg,
    title: '전주 한옥마을 힐링 투어',
    userName: '힐링러버',
    tags: ['Culture', 'Healing'],
    price: '50000',
    rating: '5.0',
    reviewCount: '27',
    people: '1',
    bookMark: true,
  },
  {
    imgSrc: thumbImg,
    title: '대한민국 국밥 TOP 30',
    userName: '하루얌',
    tags: ['Food', 'Culture'],
    price: '49000',
    rating: '5.0',
    reviewCount: '23',
    people: '1',
    bookMark: false,
  },
  {
    imgSrc: thumbImg,
    title: '서울 최고의 김치찌개 맛집',
    userName: '맛집탐방러',
    tags: ['Food', 'Festival'],
    price: '42000',
    rating: '4.8',
    reviewCount: '18',
    people: '1',
    bookMark: false,
  },
  {
    imgSrc: thumbImg,
    title: '강릉 해변에서 즐기는 바비큐',
    userName: '여행러버',
    tags: ['Nature', 'Food'],
    price: '60000',
    rating: '4.9',
    reviewCount: '35',
    people: '1',
    bookMark: true,
  },
  {
    imgSrc: thumbImg,
    title: '부산의 밤을 즐기는 방법',
    userName: '밤하늘',
    tags: ['Culture', 'K-POP'],
    price: '55000',
    rating: '4.7',
    reviewCount: '12',
    people: '1',
    bookMark: false,
  },
  {
    imgSrc: thumbImg,
    title: '전주 한옥마을 힐링 투어',
    userName: '힐링러버',
    tags: ['Culture', 'Healing'],
    price: '50000',
    rating: '5.0',
    reviewCount: '27',
    people: '1',
    bookMark: true,
  },
];

export default travelCardMockData;
