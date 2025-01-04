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
        <SocialName>{user?.socialName}</SocialName>
        <Email>{user?.userEmail}</Email>
        {/* <p>{user?.Rating}</p> */}
      </UserSummary>
      <UserDetails>
        <Details>
          <Title>이름</Title>
          <Content>{user?.socialName}</Content>
        </Details>
        <Details>
          <Title>전화번호</Title>
          {/* //user?.PhoneNumber 가 있다면 보여주고 없다면 '미정' */}
          <Content>{user?.PhoneNumber || '미정'}</Content>
        </Details>
        <Details>
          <Title>이메일</Title>
          <Content>{user?.userEmail}</Content>
        </Details>
        <Details>
          <Title>MBTI</Title>
          <Content>{user?.MBTI || '미정'}</Content>
        </Details>
      </UserDetails>
      <Footer>
        <BorderBtn color="#4a95f2" size="sm" className="btn-logout">
          프로필 수정
        </BorderBtn>
        {user && (
          <BorderBtn color="#888" size="sm" className="btn-logout" onClick={logout}>
            로그아웃
          </BorderBtn>
        )}
      </Footer>
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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const SocialName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
`;

const Email = styled.p`
  font-size: 12px;
  color: #8f8f8f;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Details = styled.div`
  display: flex;
  margin: 20px 0;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  width: 20%;
`;

const Content = styled.p`
  font-size: 18px;
  width: 80%;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
`;
