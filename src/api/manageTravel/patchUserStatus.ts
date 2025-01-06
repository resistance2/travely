import axios from 'axios';

const SERVER = import.meta.env.VITE_SERVER_URL;

const patchUserStatus = async (
  teamId: string,
  userId: string,
  status: string,
): Promise<boolean | Error> => {
  try {
    const response = await axios.patch(`${SERVER}/api/v1/users/update-user-status`, {
      teamId,
      userId,
      status,
    });
    return response.data.success;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '유저 상태 변경 실패');
  }
};

export default patchUserStatus;
