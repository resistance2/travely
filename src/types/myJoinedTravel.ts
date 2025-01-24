export interface myJoinedTravel {
  id: string;
  travelTitle: string;
  guideInfo: {
    socialName: string;
    userProfileImg: string;
    userId: string;
    userEmail: string; // 추가
    userRating: number; // 추가
  };
  travelTeam: {
    travelStartDate: string;
    travelEndDate: string;
    personLimit: number;
    approvedMembersMbti: {
      mbti: (string | null)[]; // MBTI 배열 및 null 허용
    };
  };
  currentUserStatus: {
    status: string;
  };
  reviewWritten: boolean;
  thumbnail?: string;
}
