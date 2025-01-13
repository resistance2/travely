import updateProfile from '@/api/myAccount/updateProfile';
import { ShowToast } from '@/components/Toast';
import useUserStore from '@/stores/useUserStore';
import { updateProfileData } from '@/types/updateProfileData';
import { UpdateProfileResponse, User } from '@/types/userType';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { setUser } = useUserStore((state) => state);

  return useMutation({
    mutationFn: ({ profileData }: { profileData: updateProfileData }) => updateProfile(profileData),
    onSuccess: (data: UpdateProfileResponse, variable) => {
      const userId = variable.profileData.userId;
      queryClient.invalidateQueries({ queryKey: ['update-profile', userId] });

      setUser((prevUser) => {
        const updatedUser = {
          ...prevUser,
          phoneNumber: data.phoneNumber,
          MBTI: data.mbti,
          userProfileImage: data.userProfileImage,
        } as User;
        return updatedUser;
      });
      ShowToast('프로필이 수정되었습니다.', 'success');
    },
    onError: () => {
      ShowToast('프로필 수정에 실패했습니다.', 'failed');
    },
  });
};

export default useUpdateProfile;
