import BorderBtn from '@/components/BorderBtn';
import { auth } from '@/firebase';
import useModalStore from '@/stores/useModalStore';
import useUserStore from '@/stores/useUserStore';
import { signOut } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Camera } from 'lucide-react';
import {
  normalizePhoneNumber,
  formatPhoneNumber,
  isValidPhoneNumber,
} from '@/utils/phoneValidation';

import useUpdateProfile from '@/hooks/query/useUpdateProfile';
import Toast, { ShowToast } from '@/components/Toast';

const MyAccount = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore((state) => state);
  const setModalName = useModalStore((state) => state.setModalName);
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user?.PhoneNumber || '');
  const [mbti, setMbti] = useState(user?.MBTI || '');
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    user?.userProfileImage || null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateProfile = useUpdateProfile();

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('로그아웃에 실패했습니다 :', error);
    }
  };

  const handleMbtiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMbti(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedPhone);
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
    const normalizedPhone = normalizePhoneNumber(phoneNumber);
    if (!isValidPhoneNumber(normalizedPhone)) {
      ShowToast('유효한 전화번호 형식이 아닙니다.', 'failed');
      return;
    }
    if (user) {
      updateProfile.mutate({
        profileData: {
          userId: user.userId,
          profileImage: profileImageFile,
          mbti,
          phoneNumber: String(phoneNumber),
        },
      });
      setIsEditing(false);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      setProfileImagePreview(URL.createObjectURL(file) as string);
    }
  };

  return (
    <MyAccountWrap>
      <UserSummary>
        {user && profileImagePreview ? (
          <ProfileImageWrapper>
            <ProfileImage src={profileImagePreview} alt="프로필 이미지" />
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
            <Input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
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
            <Select value={mbti} onChange={handleMbtiChange}>
              <option value="">선택</option>
              <option value="ISTJ">ISTJ</option>
              <option value="ISFJ">ISFJ</option>
              <option value="INFJ">INFJ</option>
              <option value="INTJ">INTJ</option>
              <option value="ISTP">ISTP</option>
              <option value="ISFP">ISFP</option>
              <option value="INFP">INFP</option>
              <option value="INTP">INTP</option>
              <option value="ESTP">ESTP</option>
              <option value="ESFP">ESFP</option>
              <option value="ENFP">ENFP</option>
              <option value="ENTP">ENTP</option>
              <option value="ESTJ">ESTJ</option>
              <option value="ESFJ">ESFJ</option>
              <option value="ENFJ">ENFJ</option>
              <option value="ENTJ">ENTJ</option>
            </Select>
          ) : (
            <Content>{user?.MBTI || '미정'}</Content>
          )}
        </Details>
        <Details>
          <Title>계좌 번호</Title>
          <Content>{user?.PhoneNumber || '미등록'}</Content> {/* 수정 필요 */}
        </Details>
      </UserDetails>
      <EditProfile>
        {isEditing ? (
          <BorderBtn color="#4a95f2" size="sm" onClick={handleSaveClick}>
            저장
          </BorderBtn>
        ) : (
          <BorderBtn color="#4a95f2" size="sm" onClick={handleEditClick}>
            프로필 수정
          </BorderBtn>
        )}
      </EditProfile>
      <Logout>{user && <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>}</Logout>
      <Toast />
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

const Select = styled.select`
  width: 40%;
  padding: 8px 30px 8px 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #fff;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><path fill="gray" d="M0 3l5 5 5-5H0z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center; /* 화살표 위치 조정 */
  background-size: 14px; /* 화살표 크기 조정 */
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #4a95f2;
  }
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

const EditProfile = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
`;

const Logout = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const LogoutBtn = styled.button`
  text-decoration: underline;
  color: #999999;
`;
