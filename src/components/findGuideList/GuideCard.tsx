import Team from '@/components/Team';
import { IGuideCard } from '@/types/guideCardType';
import { css } from '@emotion/react';
import { MessageCircleMore } from 'lucide-react';
import { Link } from 'react-router-dom';
import defaultThumb from '../../assets/guide-card-thumb.png';

interface IGuideCardDataProps {
  cardData: IGuideCard;
}

const GuideCard: React.FC<IGuideCardDataProps> = ({ cardData }) => {
  const { thumbnail = defaultThumb, travelTitle, createdBy, team, commentCnt } = cardData;

  return (
    <Link to="/travel-detail">
      <div css={card}>
        <div className="card-img">
          <img src={thumbnail} alt="" />
        </div>
        <div className="card-content">
          <p className="title">{travelTitle}</p>
          <div className="team">
            <Team
              max={team.personLimit === null ? 1 : team.personLimit}
              size="sm"
              mbtiList={team.mbti === null ? [] : team.mbti}
            />
          </div>
          <div className="name-comment-wrap">
            <p className="user-name">{createdBy.userName}</p>
            <div className="comment">
              <MessageCircleMore size={19} />
              <span>{commentCnt}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GuideCard;

const card = () => css`
  width: 250px;
  height: 320px;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  transition:
    box-shadow 0.3s ease,
    transform 0.1s ease;

  &:hover {
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }

  .card-img {
    width: 100%;
    height: 180px;
    overflow: hidden;
    border-radius: 4px 4px 0 0;
  }

  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 0 0 4px 4px;
    border-top: 0;
    box-sizing: border-box;

    .title {
      font-size: 15px;
      font-weight: bold;
    }

    .team {
      margin: 15px 0;
    }

    .name-comment-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      color: #666;

      .comment {
        display: flex;
        align-items: center;
        gap: 3px;
        span {
          font-size: 11px;
        }
      }
    }
  }
`;
