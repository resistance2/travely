import AlarmBadge from '@/components/AlarmBadge';
import FiledBtn from '@/components/FiledBtn';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { User as FirebaseUser, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/firebase';
import * as Dialog from '@radix-ui/react-dialog';
import useModalStore from '@/stores/useModalStore';
import { X } from 'lucide-react';
import logo from '@/assets/logo-black.png';
import googleLogo from '@/assets/google-icon.svg';
import kakaoLogo from '@/assets/kakao-icon.svg';
import basicProfile from '@/assets/basicProfile.png';
import axios from 'axios';
import useUserStore from '@/stores/useUserStore';
import { modalId } from '@/constants/modalId';
import { SERVER } from '@/constants/url';
import { useState } from 'react';
import useTravelersWaitingCount from '@/hooks/query/useTravelersWaitingCount';

const Auth: React.FC<{ light?: boolean }> = ({ light = false }) => {
  const { user, setUser } = useUserStore((state) => state);
  const { modalName, setModalName } = useModalStore((state) => state);
  const isOpen = modalId.main.login === modalName;

  const [userProfileImage, setUserProfileImage] = useState(user?.userProfileImage || basicProfile);

  const { data: waitingCount } = useTravelersWaitingCount(user?.userId || '');

  const postLogin = async (userInfo: FirebaseUser) => {
    const user = {
      socialName: userInfo.displayName,
      userEmail: userInfo.email,
      userProfileImage: userInfo.photoURL,
    };
    try {
      const result = await axios.post(`${SERVER}/api/v1/users/login`, {
        ...user,
      });
      const {
        userProfileImage,
        socialName,
        userEmail,
        isVerifiedUser,
        _id: userId,
        userScore,
      } = result.data.data;
      setUser({ userProfileImage, socialName, userEmail, isVerifiedUser, userId, userScore });
    } catch (error) {
      console.error('로그인 처리에 오류가 발생했습니다.:', error);
    }
  };

  const handleLogin = (Oauth: 'google' | 'kakao') => {
    if (Oauth === 'google') {
      loginGoogle();
    } else {
      alert('개발중입니다. 조금만 기다려주세요!');
      return;
    }
  };

  const loginGoogle = async () => {
    try {
      const userDataFromGoogle = await signInWithPopup(auth, provider);
      postLogin(userDataFromGoogle.user);
    } catch (error) {
      console.error('구글 계정 로그인에 실패했습니다.', error);
    }
  };

  if (user) {
    return (
      <div css={logined(light)}>
        <ul>
          <li>
            <Link to="/my-page/my-travel-list">내 여행</Link>
            <AlarmBadge cnt={waitingCount || 0} top={-11} right={-17} />
          </li>
          <li>
            <Link to="/bookmark">북마크</Link>
          </li>
        </ul>
        <div className="user-profile">
          <Link to="/my-page/my-account">
            <img src={userProfileImage} onError={() => setUserProfileImage(basicProfile)} alt="" />
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <Dialog.Root
          open={isOpen}
          onOpenChange={(open) => {
            if (!open) {
              setModalName(null);
            }
          }}
        >
          <Dialog.Trigger asChild>
            <FiledBtn color="#4a95f2" onClick={() => setModalName(modalId.main.login)}>
              로그인
            </FiledBtn>
          </Dialog.Trigger>
          <Dialog.Portal>
            <div css={loginModalWrap}>
              <Dialog.Overlay className="modal-overlay" />
              <Dialog.Content className="modal-content">
                <Dialog.Title className="modal-title">
                  <img src={logo} alt="" />
                  <p>모두가 가이드가 될 수 있는 곳</p>
                </Dialog.Title>
                <div className="btn-wrap">
                  <FiledBtn color="#f3f3f3" onClick={() => handleLogin('google')}>
                    <img src={googleLogo} alt="" />
                    구글로 계속하기
                  </FiledBtn>

                  <FiledBtn color="#FFE600" onClick={() => handleLogin('kakao')}>
                    <img src={kakaoLogo} alt="" />
                    카카오로 계속하기
                  </FiledBtn>
                </div>
                <Dialog.Close className="modal-close">
                  <X size="25px" />
                </Dialog.Close>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        </Dialog.Root>
      </>
    );
  }
};

export default Auth;

const logined = (light: boolean) => css`
  display: flex;
  gap: 25px;
  align-items: center;
  ul {
    display: flex;
    gap: 20px;
    li {
      position: relative;
      font-size: 16px;
      color: ${light ? '#fff' : '#666'};
      transition: 0.2s ease-in-out;
      &:hover {
        font-weight: bold;
      }
    }
  }

  .user-profile {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    overflow: hidden;
  }
`;

const loginModalWrap = css`
  position: fixed;
  inset: 0;
  z-index: 1;

  .modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .modal-content {
    background-color: white;
    border-radius: 6px;
    box-shadow:
      hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
      hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    max-height: 85vh;
    padding: 25px;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 100px 50px;

    .modal-title {
      text-align: center;
      img {
        width: 150px;
      }
      p {
        margin-top: 5px;
        font-size: 22px;
      }
    }

    .btn-wrap {
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 100%;
      margin-top: 60px;
      button {
        width: 100%;
        height: 55px;
        justify-content: flex-start;
        border-radius: 20px;
        color: #333;
        font-weight: bold;
        font-size: 15px;
        padding-left: 33%;

        img {
          width: 15px;
          height: 15px;
          margin-right: 8px;
        }
      }
    }

    .modal-close {
      position: fixed;
      top: 15px;
      right: 15px;
    }
  }

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
