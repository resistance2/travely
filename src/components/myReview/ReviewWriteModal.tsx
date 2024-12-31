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

export interface ReviewWriteModalProps {
  reviewTitle: string;
  userName: string;
  guideName: string;
  imgURL?: string;
}

const isValidFile = (file: File) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4'];
  return validTypes.includes(file.type);
};

const ReviewWriteModal = ({ reviewTitle, userName, guideName, imgURL }: ReviewWriteModalProps) => {
  const [open, setOpen] = useState(false);
  const [travelRating, setTravelRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  console.log(userName);

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

  const onSubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFiles([]);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setFiles([]);
      setTravelRating(0);
      setUserRating(0);
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
              width: 240px;
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
                <textarea placeholder="리뷰를 작성해주세요" />
              </div>
              <FileUploadBtn
                files={files}
                handleFileUpload={handleFileUpload}
                setFiles={setFiles}
              />
              <div css={guideReviewContainer}>
                <div className="advice">함께한 가이드가 훌륭했다면 별점을 남겨주세요</div>
                <div className="guideInfo">
                  <GuideProfile name={guideName} userEmailId="sonjeongwo" />
                  <div
                    css={css`
                      transform: translateY(2px);
                    `}
                  >
                    <StarRating rating={userRating} setRating={setUserRating} />
                  </div>
                </div>
              </div>
              <div css={buttonContainer}>
                <FiledBtn
                  children="작성"
                  color={theme.colors.primary}
                  customStyle={css`
                    width: 120px;
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
