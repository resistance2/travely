import { User } from '@/types/userType';

export interface Review {
  id: number;
  title: string;
  content: string;
  imgSrc?: string;
  createdAt?: Date;
  reviewCount: number;
  rating: number;
  user?: User;
}
