import reviewImage from '@/assets/reviewImg.png';

import FiledBtn from '@/components/FiledBtn';
import Modal from '@/components/Modal';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import { useState, ChangeEvent, useEffect } from 'react';
import BorderBtn from '@/components/BorderBtn';

import GuideProfile from '@/components/GuideProfile';
import StarRating from '@/components/StarRating';
import FileUploadBtn from '@/components/FileUploadBtn';

import useCreateReview from '@/hooks/query/useCreateReview';
import { ShowToast } from '@/components/Toast';

export interface ReviewWriteModalProps {
  reviewTitle: string;
  userName: string;
  guideInfo: {
    socialName: string;
    userProfileImg: string;
    userId: string;
    userEmail: string; // 추가
    userRating: number; // 추가
  };
  travelThumbnail?: string;
  travelId: string;
  userId: string;
}

const isValidFile = (file: File) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4'];
  return validTypes.includes(file.type);
};

const ReviewWriteModal = ({
  reviewTitle,
  guideInfo,
  travelThumbnail: imgURL,
  travelId,
  userId,
}: ReviewWriteModalProps) => {
  const [open, setOpen] = useState(false);
  const [travelRating, setTravelRating] = useState<number>(0);
  const [userRating, setUserRating] = useState<number>(0);
  const [files, setFiles] = useState<File[]>([]);
  const [reviewContent, setReviewContent] = useState('');
  const { mutate, isPending: isLoading } = useCreateReview();
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (!isValidFile(event.target.files[0])) {
        alert('지원하지 않는 파일 형식입니다.');
        return;
      }
      if (files.length + event.target.files.length > 4) {
        alert('파일은 최대 4개까지 업로드 가능합니다.');
        return;
      }
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const onCloseModal = () => {
    setFiles([]);
    setOpen(false);
  };

  const resetForm = () => {
    setFiles([]);
    setTravelRating(0);
    setUserRating(0);
    setReviewContent('');
  };

  const onSubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (travelRating === 0) {
      ShowToast('여행 평점을 입력해주세요.', 'failed');
      return;
    }

    if (reviewContent.trim().length === 0) {
      ShowToast('리뷰 내용을 입력해주세요.', 'failed');
      return;
    }

    if (!travelRating || travelRating === 0) {
      ShowToast('여행 평점을 입력해주세요.', 'failed');
      return;
    }
    mutate(
      {
        userId,
        travelId,
        reviewImgs: files,
        travelScore: travelRating,
        content: reviewContent,
        title: reviewTitle,
        ...(userRating > 0 && { guideScore: userRating }),
      },
      {
        onSuccess: () => {
          setOpen(false);
          resetForm();
        },
      },
    );
  };

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  return (
    <>
      <Modal
        title="후기 작성"
        trigger={
          <FiledBtn
            color={theme.colors.primary}
            customStyle={css`
              width: 100%;
              margin: -5px auto;
            `}
          >
            후기 작성
          </FiledBtn>
        }
        open={open}
        setOpen={setOpen}
        children={
          <div css={ReviewWriteModalStyle}>
            <div>
              <h2>후기 작성</h2>
            </div>
            <div className="imgSection">
              <div className="imgContainer">
                <img src={imgURL || reviewImage} alt="" />
              </div>
              <div className="reviewTitleContainer">
                <h3 className="reviewTitle">{reviewTitle}</h3>
                <StarRating rating={travelRating} setRating={setTravelRating} />
              </div>
            </div>

            <form onSubmit={(e) => onSubmitReview(e)}>
              <div css={textAreaContainer}>
                <textarea
                  placeholder="리뷰를 작성해주세요"
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                />
              </div>

              <FileUploadBtn
                files={files}
                handleFileUpload={handleFileUpload}
                setFiles={setFiles}
              />

              <div css={guideReviewContainer}>
                <div className="advice">함께한 가이드가 훌륭했다면 별점을 남겨주세요</div>
                <div className="guideInfo">
                  <GuideProfile
                    name={guideInfo.socialName}
                    userEmailId={guideInfo.userEmail}
                    imgURL={guideInfo.userProfileImg}
                  />
                  <div
                    css={css`
                      transform: translateY(2px);
                    `}
                  >
                    <div
                      css={css`
                        margin-left: 10px;
                      `}
                    >
                      <StarRating rating={userRating} setRating={setUserRating} />
                    </div>
                  </div>
                </div>
              </div>
              <div css={buttonContainer}>
                <FiledBtn
                  children={isLoading ? '등록 중...' : '작성'}
                  color={theme.colors.primary}
                  customStyle={css`
                    width: 120px;
                    ${isLoading &&
                    `cursor: not-allowed;
                    opacity: 0.5;
                    `}
                  `}
                  type="submit"
                />
                <BorderBtn
                  children="닫기"
                  color="#b8bbbe"
                  customStyle={css`
                    width: 120px;
                  `}
                  onClick={() => onCloseModal()}
                  type="button"
                />
              </div>
            </form>
          </div>
        }
      />
    </>
  );
};

const ReviewWriteModalStyle = css`
  h2 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .imgSection {
    display: flex;

    .imgContainer {
      border-radius: 10px;
      margin-bottom: 10px;
      overflow: hidden;
      width: 130px;
      height: 144px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .reviewTitle {
      font-size: 18px;
      font-weight: 700;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .reviewTitleContainer {
      margin-left: 20px;
    }
  }
`;

const textAreaContainer = css`
  border: 1px solid #e4e4e4;
  border-radius: 4px;
  height: 170px;
  overflow: hidden;

  .userName {
    font-size: 16px;
    font-weight: 500;
    color: #4b5568;
    margin-bottom: 0.5rem;
  }

  textarea {
    width: 100%;
    height: 100%;
    padding: 15px 10px;
    font-size: 14px;
    color: #333;

    &::placeholder {
      color: #b7bcc2;
    }
  }
`;

const guideReviewContainer = css`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  .advice {
    font-size: 15px;
    font-weight: 700;
    color: #4b5568;
    margin-bottom: 0.5rem;
  }

  .guideInfo {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

const buttonContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
`;

export default ReviewWriteModal;
