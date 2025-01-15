import { SERVER } from '@/constants/url';
import axios from 'axios';

const updateAccountNumber = async (userId: string, accountNumber: string, bankCode: string) => {
  try {
    const response = await axios.patch(`${SERVER}/api/v1/users/bank-account`, {
      userId,
      accountNumber,
      bankCode,
    });
    return response.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : '계좌번호 변경 실패');
  }
};
export default updateAccountNumber;
