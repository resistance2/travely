import { User } from '@/types/userType';

export interface Review {
  reviewId: string;
  title: string;
  content: string;
  imgSrc?: string[];
  createdAt?: string;
  reviewCount?: number;
  rating: number;
  user?: User;
}
