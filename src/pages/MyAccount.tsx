import BorderBtn from '@/components/BorderBtn';
import { auth } from '@/firebase';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const MyAccount = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore((state) => state);
  const setModalName = useModalStore((state) => state.setModalName);
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('로그아웃에 실패했습니다 :', error);
    }
  };

  useEffect(() => {
    if (!user) {
      setModalName(null);
      navigate('/');
    }
  }, [user, navigate, setModalName]);

  return (
    <MyAccountWrap>
      <UserSummary>
        {user && user.userProfileImage ? (
          <ProfileImage src={user.userProfileImage} alt="프로필 이미지" />
        ) : null}
      </UserSummary>
      {user && (
        <BorderBtn color="#888" size="sm" className="btn-logout" onClick={logout}>
          로그아웃
        </BorderBtn>
      )}
    </MyAccountWrap>
  );
};

export default MyAccount;

const MyAccountWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const UserSummary = styled.div`
  height: 180px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;
