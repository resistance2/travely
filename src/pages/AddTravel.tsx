import ChoiceTags from '@/components/addTravel/ChoiceTags';
import Course from '@/components/addTravel/Course';
import ScheduleTeam from '@/components/addTravel/ScheduleTeam';
import ImageUploadField from '@/components/addTravel/Thumbnail';
import GrayBack from '@/components/GrayBack';
import { css } from '@emotion/react';
import Introduction from '@/components/addTravel/Introduction';
import FloatingMenu from '@/components/addTravel/FloatingMenu';
import { useState } from 'react';
import { TagType } from '@/types/tagType';
import useCreateTravel from '@/hooks/query/useCreateTravel';
import { validateAddTravel } from '@/utils/validCheck';
import { AddTravelData } from '@/types/travelDataType';
import MeetingTime from '@/components/addTravel/MeetingTime';
import ExcludeList from '@/components/addTravel/ExcludeList';
import IncludeList from '@/components/addTravel/IncludeList';
import Faq from '@/components/addTravel/Faq';

const AddTravel = () => {
  const [travelTitle, setTravelTitle] = useState<string>('');
  const [travelPrice, setTravelPrice] = useState<number>(0);
  const [sections, setSections] = useState<string[]>([
    '제목',
    '대표 이미지',
    '상품소개',
    '코스',
    '태그',
    '예약 생성',
    '가격',
  ]);
  const [thumbnail, setThumbnail] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [courseList, setCourseList] = useState<string[]>([]);
  const [choseTag, setChoseTag] = useState<TagType[]>([]);
  const [scheduleList, setScheduleList] = useState<
    {
      personLimit: number;
      travelStartDate: string;
      travelEndDate: string;
    }[]
  >([]);
  // !TODO meetingTime, FAQ, meetingPlace useSate가 필요함.

  const { mutate } = useCreateTravel();

  const handleAddTravel = () => {
    const addTravelData: AddTravelData = {
      travelTitle,
      thumbnail,
      travelContent: content,
      travelCourse: courseList,
      tag: choseTag,
      team: scheduleList,
      travelPrice,
    };
    if (validateAddTravel(addTravelData)) mutate(addTravelData);
  };

  const handleAddCourse = (newField: string) => {
    setCourseList([...courseList, newField]);
  };

  const handleRemoveCourse = (index: number) => {
    setCourseList(courseList.filter((_, i) => i !== index));
  };

  const handleAddSchedule = (newField: {
    personLimit: number;
    travelStartDate: string;
    travelEndDate: string;
  }) => {
    setScheduleList([...scheduleList, newField]);
  };

  const handleRemoveSchedule = (index: number) => {
    setScheduleList(scheduleList.filter((_, i) => i !== index));
  };

  const setOpenSection = (section: string) => {
    if (sections.includes(section)) {
      setSections(sections.filter((s) => s !== section));
    } else {
      setSections([...sections, section]);
    }
  };

  const changeHandlers = {
    changeTitle: (travelTitle: string) => {
      setTravelTitle(travelTitle);
    },

    changePrice: (travelPrice: number) => {
      setTravelPrice(travelPrice);
    },
  };

  return (
    <div css={pageLayoutWrapper}>
      <div css={addTravelWrapper}>
        <h1>새로운 여행 계획하기</h1>
        <GrayBack title={'제목'} padding={true}>
          <input
            css={noneStyleInput}
            type="text"
            placeholder="30자 내외로 작성해주세요."
            onChange={(e) => changeHandlers.changeTitle(e.target.value)}
            value={travelTitle}
          />
        </GrayBack>
        <ImageUploadField imageUrl={thumbnail} setImageUrl={setThumbnail} title={'대표 이미지'} />
        <Introduction content={content} setContent={setContent} />
        <Course
          courseList={courseList}
          addCourse={handleAddCourse}
          removeCourse={handleRemoveCourse}
        />
        <ChoiceTags choseTag={choseTag} setChoseTag={setChoseTag} />
        <ScheduleTeam
          scheduleList={scheduleList}
          addField={handleAddSchedule}
          removeField={handleRemoveSchedule}
        />
        <GrayBack title={'가격'} price={true} padding={true}>
          <input
            css={noneStyleInput}
            type="number"
            placeholder="0"
            onChange={(e) => changeHandlers.changePrice(Number(e.target.value))}
            value={travelPrice}
          />
          <span css={{ marginRight: '5px' }}>원</span>
          <span css={{ fontSize: '14px' }}>/ 1인</span>
        </GrayBack>
        {/* {sections.includes('포함내용') && <IncludeList addField={handleAddInclude} />} */}
        {sections.includes('미포함내용') && <ExcludeList />}
        {sections.includes('이용안내') && <MeetingTime />}
        {sections.includes('FAQ') && <Faq />}
      </div>

      <FloatingMenu
        onSubmit={handleAddTravel}
        sections={sections}
        setOpenSection={setOpenSection}
      />
    </div>
  );
};

export default AddTravel;

export const addTravelWrapper = css`
  position: relative;
  width: 680px;
  margin-right: 200px;
  & h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

export const noneStyleInput = css`
  width: 100%;
  background-color: transparent;
  border: none;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    display: none;
  }
`;

export const pageLayoutWrapper = css`
  display: flex;
  position: relative;
`;
