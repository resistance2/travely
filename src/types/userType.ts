export type User = {
  userProfileImage: string;
  socialName: string;
  userEmail: string;
  isVerifiedUser: boolean;
  userId: string;
  MBTI?: string;
  phoneNumber?: string;
  accountNumber?: string;

  // myCreatedTravel: string[];
  // myPassedTravel: string[];
  // myReviews: string[];
  // myBookmark: string[];
};

export interface UpdateProfileResponse {
  phoneNumber: string;
  mbti: string;
  userProfileImage: string | File;
}
