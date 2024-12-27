import guideImg from '@/assets/guide.jpg';

// TODO 목업 데이터와 실제 DB 데이터 비교 필요
export const travelMyJoinedData = [
  {
    travelTitle: '대한민국 고궁 투어',
    guideInfo: {
      userProfileImg: guideImg,
      userName: '가이드 손성오',
      userEmail: 'guide@example.com',
      userRating: 4.5,
    },
    travelTeam: {
      travelStartDate: '2025-01-25',
      travelEndDate: '2025-01-28',
      personLimit: 7,
      approvedMembersMbti: {
        mbti: ['ENFP', 'ISTJ', 'ENTJ'],
      },
    },
    currentUserStatus: {
      userId: 'seong5@gmail.com',
      status: 'approved',
    },
    reviewWritten: true,
  },
  {
    travelTitle: '부산 국밥 투어',
    guideInfo: {
      userProfileImg: guideImg,
      userName: '가이드 박철수',
      userEmail: 'guide2@example.com',
      userRating: 4.5,
    },
    travelTeam: {
      travelStartDate: '2025-02-10',
      travelEndDate: '2025-02-13',
      personLimit: 5,
      approvedMembersMbti: {
        mbti: ['INFP', 'ENTP'],
      },
    },
    currentUserStatus: {
      userId: 'seong5@gmail.com',
      status: 'waiting',
    },
    reviewWritten: false,
  },
  {
    travelTitle: '제주 올레길 트레킹',
    guideInfo: {
      userProfileImg: guideImg,
      userName: '가이드 김영희',
      userEmail: 'guide3@example.com',
      userRating: 4.5,
    },
    travelTeam: {
      travelStartDate: '2025-03-01',
      travelEndDate: '2025-03-04',
      personLimit: 6,
      approvedMembersMbti: {
        mbti: ['ISFJ', 'ESTJ', 'ENFJ', 'ISTP'],
      },
    },
    currentUserStatus: {
      userId: 'seong5@gmail.com',
      status: 'refused',
    },
    reviewWritten: false,
  },
  {
    travelTitle: '몰도바 여행',
    guideInfo: {
      userProfileImg: guideImg,
      userName: '가이드 손성오',
      userEmail: 'guide4@example.com',
      userRating: 4.5,
    },
    travelTeam: {
      travelStartDate: '2024-10-07',
      travelEndDate: '2024-10-015',
      personLimit: 6,
      approvedMembersMbti: {
        mbti: ['ISFJ', 'ESTJ', 'ENFJ', 'ISTP'],
      },
    },
    currentUserStatus: {
      userId: 'seong5@gmail.com',
      status: 'refused',
    },
    reviewWritten: false,
  },
  {
    travelTitle: '몰도바 여행',
    guideInfo: {
      userProfileImg: guideImg,
      userName: '가이드 손성오',
      userEmail: 'guide4@example.com',
      userRating: 4.5,
    },
    travelTeam: {
      travelStartDate: '2024-10-07',
      travelEndDate: '2024-10-015',
      personLimit: 1,
      approvedMembersMbti: {
        mbti: ['ISFJ', 'ESTJ', 'ENFJ', 'ISTP'],
      },
    },
    currentUserStatus: {
      userId: 'seong5@gmail.com',
      status: 'approved',
    },
    reviewWritten: true,
  },
  {
    travelTitle: '몰도바 여행',
    guideInfo: {
      userProfileImg: guideImg,
      userName: '가이드 손성오',
      userEmail: 'guide4@example.com',
      userRating: 1.5,
    },
    travelTeam: {
      travelStartDate: '2024-10-07',
      travelEndDate: '2024-10-015',
      personLimit: 6,
      approvedMembersMbti: {
        mbti: ['ISFJ', 'ESTJ', 'ENFJ', 'ISTP'],
      },
    },
    currentUserStatus: {
      userId: 'seong5@gmail.com',
      status: 'approved',
    },
    reviewWritten: false,
  },
];
