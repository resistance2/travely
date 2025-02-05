import useComposing from '@/hooks/custom/useComposing';
import { css } from '@emotion/react';
import { CirclePlus, MapPin, X } from 'lucide-react';
import { memo, useRef } from 'react';

interface CourseProps {
  courseList: string[];
  addCourse: (newField: string) => void;
  removeCourse: (index: number) => void;
}

const Course = memo(({ courseList, removeCourse, addCourse }: CourseProps) => {
  const { setIsComposing, handleKeyDown } = useComposing();
  const courseRef = useRef<HTMLInputElement>(null);

  const handleAddCourse = () => {
    if (courseRef.current) {
      if (courseRef.current.value.trim() !== '') {
        addCourse(courseRef.current.value);
        courseRef.current.value = '';
      }
    }
  };

  return (
    <div css={courseWrapper}>
      <p>여행 코스</p>
      <ul>
        {courseList?.map((course, index) => (
          <li key={index}>
            <div css={courseItem}>
              <MapPin css={{ marginRight: '10px' }} />
              <span>{course}</span>
              <button onClick={() => removeCourse(index)}>
                <X size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div css={courseAddWrapper}>
        <MapPin css={{ marginRight: '10px' }} />
        <input
          css={textBox}
          ref={courseRef}
          type="text"
          onKeyDown={(e) => handleKeyDown(e, handleAddCourse)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder="40자 내외로 여행 코스를 추가해주세요."
        />
        <button css={plusBtn} onClick={handleAddCourse}>
          <CirclePlus size={24} />
        </button>
      </div>
    </div>
  );
});

export default Course;

const textBox = css`
  border: 1px solid #dedede;
  border-radius: 8px;
  height: 35px;
  padding: 0 10px;
  margin: 10px 0;
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

const courseWrapper = css`
  width: 100%;
  & p {
    margin: 15px 0 5px;
    font-size: 18px;
    font-weight: 600;
  }
`;
const courseItem = css`
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  background-color: #f8f8f8;
  margin-bottom: 10px;
  padding: 10px 20px;
  & button {
    color: #888;
    margin-bottom: -5px;
    margin-left: 10px;
    transition: all 0.2s ease-in-out;
    :hover {
      transform: scale(1.2);
    }
  }
`;
const courseAddWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #f8f8f8;
  padding: 10px 20px;
`;
