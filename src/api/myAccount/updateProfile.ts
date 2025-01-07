import { UpdateProfileResponse } from '@/types/userType';
import axios from 'axios';

const SERVER = import.meta.env.VITE_SERVER_URL;

const updateProfile = async (profile: {
  userId: string;
  profileImage: string;
  mbti: string;
  phoneNumber: string;
}): Promise<UpdateProfileResponse> => {
  try {
    const formData = new FormData();
    formData.append('userId', profile.userId);
    formData.append('profileImage', profile.profileImage);
    formData.append('mbti', profile.mbti);
    formData.append('phoneNumber', profile.phoneNumber);

    const response = await axios.patch(`${SERVER}/api/v1/users/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data.user;
  } catch (err) {
    console.error('Error updating profile:', err);
    throw new Error(err instanceof Error ? err.message : '프로필 수정 실패');
  }
};

export default updateProfile;
