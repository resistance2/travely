import BorderBtn from '@/components/BorderBtn';
import { auth } from '@/firebase';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { signOut } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Camera } from 'lucide-react';

const MyAccount = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore((state) => state);
  const setModalName = useModalStore((state) => state.setModalName);
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user?.PhoneNumber || '');
  const [mbti, setMbti] = useState(user?.MBTI || '');
  const [profileImage, setProfileImage] = useState(user?.userProfileImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (user) {
      setUser({
        ...user,
        PhoneNumber: phoneNumber,
        MBTI: mbti,
        userProfileImage: profileImage,
      });
    }
    setIsEditing(false);
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <MyAccountWrap>
      <UserSummary>
        {user && user.userProfileImage ? (
          <ProfileImageWrapper>
            <ProfileImage src={user.userProfileImage} alt="프로필 이미지" />
            {isEditing && (
              <>
                <CameraIcon onClick={handleCameraClick}>
                  <Camera />
                </CameraIcon>
                <HiddenFileInput
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </>
            )}
          </ProfileImageWrapper>
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
          {isEditing ? (
            <Input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          ) : (
            <Content>{user?.PhoneNumber || '미정'}</Content>
          )}
        </Details>
        <Details>
          <Title>이메일</Title>
          <Content>{user?.userEmail}</Content>
        </Details>
        <Details>
          <Title>MBTI</Title>
          {isEditing ? (
            <Input type="text" value={mbti} onChange={(e) => setMbti(e.target.value)} />
          ) : (
            <Content>{user?.MBTI || '미정'}</Content>
          )}
        </Details>
      </UserDetails>
      <Footer>
        {isEditing ? (
          <BorderBtn color="#4a95f2" size="sm" onClick={handleSaveClick}>
            저장
          </BorderBtn>
        ) : (
          <BorderBtn color="#4a95f2" size="sm" onClick={handleEditClick}>
            프로필 수정
          </BorderBtn>
        )}
        {user && (
          <BorderBtn color="#888" size="sm" onClick={logout}>
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

const ProfileImageWrapper = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const CameraIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: white;
  border-radius: 50%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const HiddenFileInput = styled.input`
  display: none;
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

const Input = styled.input`
  width: 40%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
`;
