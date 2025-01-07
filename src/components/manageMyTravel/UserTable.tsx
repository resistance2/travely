import { css } from '@emotion/react';
import { ApplicationUserData } from '@/types/travelDataType';
import Profile from '@/components/Profile';
import { formatDate } from '@/utils/format';
import UserStatusWaiting from './UserStatusWaiting';

interface UserTableProps {
  data: ApplicationUserData[];
  teamId: string;
  hasAccount: boolean;
}

const UserTable = ({ data, teamId, hasAccount }: UserTableProps) => {
  return (
    <table css={tableWrapper}>
      <thead>
        <tr>
          <th>유저</th>
          <th>MBTI</th>
          <th>연락처</th>
          <th>이메일</th>
          <th>신청날짜</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => (
          <tr key={index}>
            <td css={{ minWidth: '80px' }}>
              <div>
                <Profile url={user.userProfileImage} size={'40px'} /> {user.userName}
              </div>
            </td>
            <td>{user.mbti}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.userEmail}</td>
            <td>{formatDate(user.appliedAt)}</td>
            <td css={{ minWidth: '145px' }}>
              {user.status === 'waiting' ? (
                <UserStatusWaiting
                  teamId={teamId}
                  userId={user.userId}
                  userName={user.userName}
                  hasAccount={hasAccount}
                />
              ) : user.status === 'approved' ? (
                '승인'
              ) : (
                '거절'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;

const tableWrapper = css`
  width: 100%;
  margin-top: 40px;
  & thead {
    background-color: #ededed;
  }
  & th,
  td {
    text-align: center;
    height: 45px;
    vertical-align: middle;
  }
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
