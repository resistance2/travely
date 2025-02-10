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
  const hasAppliedUsers = data.length !== 0;

  return (
    <table css={tableWrapper(hasAppliedUsers)}>
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
        {hasAppliedUsers ? (
          data.map((user, index) => (
            <tr key={index}>
              <td css={{ minWidth: '80px' }}>
                <div>
                  <Profile url={user.userProfileImage} size={'40px'} />
                  {user?.userName || user.socialName}
                </div>
              </td>
              <td>{user.mbti || '없음'}</td>
              <td>{user.phoneNumber || '없음'}</td>
              <td>{user.userEmail}</td>
              <td>{formatDate(user.appliedAt)}</td>
              <td css={{ minWidth: '145px' }}>
                {user.status === 'waiting' ? (
                  <UserStatusWaiting
                    teamId={teamId}
                    userId={user.userId}
                    userName={user.socialName}
                    hasAccount={hasAccount}
                  />
                ) : user.status === 'approved' ? (
                  '승인'
                ) : (
                  '거절'
                )}
              </td>
            </tr>
          ))
        ) : (
          <div css={noData}>신청한 유저가 없습니다.</div>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;

const tableWrapper = (hasAppliedUsers: boolean) => css`
  width: 100%;
  margin-top: 40px;
  ${!hasAppliedUsers &&
  `
      margin-bottom: 100px;
    `}
  & thead {
    background-color: #ededed;
  }
  & tbody {
    position: relative;
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

const noData = css`
  width: 100%;
  position: absolute;
  top: 30px;
  margin: 0 auto;
  font-weight: 500;
  font-size: 18px;
  color: #888;
`;
