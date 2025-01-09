import { css } from '@emotion/react';
import useFieldStore from '@/stores/useFieldStore';
import { CirclePlus, X } from 'lucide-react';
import { useRef } from 'react';
import Team from '@/components/Team';
import { useLocation } from 'react-router-dom';
import { formatDate } from '@/utils/format';
import useComposing from '@/hooks/custom/useComposing';

const ScheduleTeam = () => {
  const { setIsComposing, handleKeyDown } = useComposing();
  const scheduleList = useFieldStore((state) => state.fields.scheduleList);
  const { addField, removeField } = useFieldStore((state) => state.actions);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const membersRef = useRef<HTMLSelectElement>(null);
  const location = useLocation();

  const handleAddSchedule = () => {
    if (scheduleList && scheduleList.length >= 4) {
      alert('일정은 최대 4개까지 추가할 수 있습니다.');
      return;
    }
    if (startDateRef.current && endDateRef.current && membersRef.current) {
      if (
        startDateRef.current.value.trim() !== '' &&
        endDateRef.current.value.trim() !== '' &&
        membersRef.current.value.trim() !== ''
      ) {
        const newSchedule = {
          personLimit: Number(membersRef.current.value.slice(0, 1)),
          travelStartDate: startDateRef.current.value,
          travelEndDate: endDateRef.current.value,
        };
        addField('scheduleList', newSchedule);
        startDateRef.current.value = '';
        endDateRef.current.value = '';
        membersRef.current.value = '';
      }
    }
  };

  const isAddFindGuidePage = location.pathname === '/add-for-find-guide' && !scheduleList;
  const isAddTravelPage = location.pathname === '/add-travel';

  return (
    <div css={scheduleWrapper}>
      <p>일정 및 팀 추가</p>
      <ul>
        {scheduleList?.map((schedule, index) => (
          <li key={index}>
            <div css={scheduleItem}>
              <div>
                <span>
                  {`${formatDate(schedule.travelStartDate)} ~ ${formatDate(schedule.travelEndDate)} / ${schedule.personLimit}인`}
                </span>
                <button onClick={() => removeField('scheduleList', index)}>
                  <X size={20} />
                </button>
              </div>
              <Team max={Number(schedule.personLimit)} />
            </div>
          </li>
        ))}
      </ul>
      {(isAddFindGuidePage || isAddTravelPage) && (
        <div css={scheduleAddWrapper}>
          <div css={inputRowWrapper}>
            <label css={labelStyle}>일정</label>
            <input
              css={smallTextBox}
              ref={startDateRef}
              type="date"
              placeholder="시작 날짜"
              onKeyDown={(e) => handleKeyDown(e, handleAddSchedule)}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
            />
            <span css={tilde}>~</span>
            <input
              css={smallTextBox}
              ref={endDateRef}
              type="date"
              placeholder="종료 날짜"
              onKeyDown={(e) => handleKeyDown(e, handleAddSchedule)}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
            />
          </div>
          <div css={inputRowWithButtonWrapper}>
            <div css={inputRowWrapper}>
              <label css={labelStyle}>모집인원</label>
              <select
                css={smallTextBox}
                ref={membersRef}
                defaultValue=""
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
              >
                <option value="" disabled>
                  본인제외
                </option>
                {Array.from(
                  { length: 8 },
                  (_, idx) =>
                    idx !== 0 && (
                      <option key={idx} value={idx}>
                        {idx}명
                      </option>
                    ),
                )}
              </select>
            </div>
            <button css={plusBtn} onClick={handleAddSchedule}>
              <CirclePlus size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTeam;

const scheduleWrapper = css`
  width: 100%;
  & p {
    margin: 15px 0 5px;
    font-size: 18px;
  }
`;

const scheduleItem = css`
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  border-radius: 8px;
  background-color: #f8f8f8;
  margin-bottom: 10px;
  padding: 20px;
  & button {
    color: #888;
    margin-left: 10px;
    transition: all 0.2s ease-in-out;
    :hover {
      transform: scale(1.2);
    }
    * {
      display: block;
    }
  }
  & div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const scheduleAddWrapper = css`
  border-radius: 8px;
  background-color: #f8f8f8;
  padding: 10px 20px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const inputRowWrapper = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
`;

const inputRowWithButtonWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const smallTextBox = css`
  width: 140px;
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &:last-of-type {
    margin-right: 0;
  }
`;

const tilde = css`
  margin: 0 10px;
  font-size: 18px;
`;

const plusBtn = css`
  margin-left: 10px;
  display: flex;
  align-items: center;
  color: #2467e3;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.2);
  }
`;

const labelStyle = css`
  font-size: 16px;
  margin-right: 14px;
`;
