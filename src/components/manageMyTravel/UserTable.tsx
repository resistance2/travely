import { css } from '@emotion/react';
import { ApplicationUserData } from '@/types/travelDataType';
import Profile from '@/components/Profile';
import FiledBtn from '@/components/FiledBtn';
import { formatDate } from '@/utils/format';

interface UserTableProps {
  data: ApplicationUserData[];
}

const UserTable = ({ data }: UserTableProps) => {
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
                <div css={{ display: 'flex', gap: '5px' }}>
                  <FiledBtn color={'#4A95F2'} size={'sm'}>
                    승인
                  </FiledBtn>
                  <FiledBtn color={'#d7d7d7'} size={'sm'}>
                    거절
                  </FiledBtn>
                </div>
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
