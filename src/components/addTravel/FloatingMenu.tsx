import useSectionsStore from '@/stores/useSectionsStore';
import styled from '@emotion/styled';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import useImageStore from '@/stores/useImageStore';
import useHandleImageUpload from '@/hooks/custom/useHandleImageUpload';
import useCreateTravel from '@/hooks/query/useCreateTravel';
import useAddTravelStore from '@/stores/useAddTravelStore';
import useFieldStore from '@/stores/useFieldStore';
import useUserStore from '@/stores/useUserStore';
import { AddTravelData } from '@/types/travelDataType';

const FloatingMenu = () => {
  const sections = useSectionsStore((state) => state.sections);
  const setOpenSection = useSectionsStore((state) => state.setOpenSection);
  const location = useLocation();
  const setData = useAddTravelStore((state) => state.setData);

  const menuHeight = location.pathname === '/add-for-find-guide' ? '260px' : '520px';

  const images = useImageStore((state) => state.images);
  const { uploadImages } = useHandleImageUpload(images);
  const { mutate } = useCreateTravel();

  const validateAddTravel = (data: AddTravelData): boolean => {
    const { userId, travelTitle, travelContent, travelCourse, tag, team, travelPrice } = data;

    if (!userId || userId.trim().length === 0) {
      alert('유저 ID는 필수입니다.');
      return false;
    }

    if (!travelTitle || travelTitle.trim().length === 0 || travelTitle.length > 30) {
      alert('여행 제목은 필수이며 30자 이내여야 합니다.');
      return false;
    }

    if (!travelContent || travelContent.trim().length === 0) {
      alert('상품 소개는 필수입니다.');
      return false;
    }

    if (!Array.isArray(travelCourse) || travelCourse.length === 0) {
      alert('여행 코스는 필수입니다.');
      return false;
    }

    if (!Array.isArray(tag) || tag.length === 0) {
      alert('태그는 최소 1개 이상 선택해주세요.');
      return false;
    }

    if (!Array.isArray(team) || team.length === 0) {
      alert('팀 정보는 필수입니다.');
      return false;
    }

    if (travelPrice === 0) {
      const userConfirmed = window.confirm('여행 가격이 0원입니다. 계속 하시겠습니까?');
      if (!userConfirmed) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    const data = useAddTravelStore.getState().data;

    if (validateAddTravel(data)) {
      try {
        const { thumbnail, meetingSpace } = await uploadImages();
        setData({ thumbnail: thumbnail[0], meetingPlace: meetingSpace[0] });
      } catch (error) {
        console.error(error);
        return false;
      }

      if (!data.thumbnail || data.thumbnail.trim().length === 0) {
        console.log(data);
        console.error('썸네일 등록에 오류가 있습니다.');
        return false;
      }
      console.log(data);
      mutate(data);
    } else {
      return false;
    }
  };

  const submitAddTravel = () => {
    const fields = useFieldStore.getState().fields;
    const includedItems = fields.includeList;
    const excludedItems = fields.excludeList;
    const FAQ = fields.faqs;
    const travelCourse = fields.courseList;
    const meetingTime = fields.meetingTime;
    const userId = useUserStore.getState().user?.userId;
    const team = fields.scheduleList;

    setData({
      includedItems,
      excludedItems,
      FAQ,
      travelCourse,
      meetingTime,
      userId,
      team,
    });

    handleSubmit();
  };

  return (
    <MenuContainer menuHeight={menuHeight}>
      {location.pathname === '/add-for-find-guide' ? (
        <>
          <MenuItem>
            <span>제목</span>
          </MenuItem>
          <MenuItem isOpen={sections.includes('대표이미지')}>
            <span>대표 이미지</span>
            <ToggleIcon
              onClick={() => setOpenSection('대표이미지')}
              isOpen={sections.includes('대표이미지')}
            >
              {sections.includes('대표이미지') ? (
                <CircleMinus size={22} />
              ) : (
                <CirclePlus size={22} />
              )}
            </ToggleIcon>
          </MenuItem>
          <MenuItem>
            <span>상품 소개</span>
          </MenuItem>
          <MenuItem>
            <span>일정 및 팀 추가</span>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem>
            <span>제목</span>
          </MenuItem>
          <MenuItem>
            <span>대표 이미지</span>
          </MenuItem>
          <MenuItem>
            <span>상품소개</span>
          </MenuItem>
          <MenuItem>
            <span>코스</span>
          </MenuItem>
          <MenuItem>
            <span>태그</span>
          </MenuItem>
          <MenuItem>
            <span>예약 생성</span>
          </MenuItem>
          <MenuItem>
            <span>가격</span>
          </MenuItem>

          <MenuItem isOpen={sections.includes('포함내용')}>
            <span>포함내용</span>
            <ToggleIcon
              onClick={() => setOpenSection('포함내용')}
              isOpen={sections.includes('포함내용')}
            >
              {sections.includes('포함내용') ? <CircleMinus size={22} /> : <CirclePlus size={22} />}
            </ToggleIcon>
          </MenuItem>
          <MenuItem isOpen={sections.includes('미포함내용')}>
            <span>미포함내용</span>
            <ToggleIcon
              onClick={() => setOpenSection('미포함내용')}
              isOpen={sections.includes('미포함내용')}
            >
              {sections.includes('미포함내용') ? (
                <CircleMinus size={22} />
              ) : (
                <CirclePlus size={22} />
              )}
            </ToggleIcon>
          </MenuItem>
          <MenuItem isOpen={sections.includes('이용안내')}>
            <span>이용안내</span>
            <ToggleIcon
              onClick={() => setOpenSection('이용안내')}
              isOpen={sections.includes('이용안내')}
            >
              {sections.includes('이용안내') ? <CircleMinus size={22} /> : <CirclePlus size={22} />}
            </ToggleIcon>
          </MenuItem>
          <MenuItem isOpen={sections.includes('FAQ')}>
            <span>FAQ</span>
            <ToggleIcon onClick={() => setOpenSection('FAQ')} isOpen={sections.includes('FAQ')}>
              {sections.includes('FAQ') ? <CircleMinus size={22} /> : <CirclePlus size={22} />}
            </ToggleIcon>
          </MenuItem>
        </>
      )}

      <BottomButtons>
        <TempSaveButton>임시저장</TempSaveButton>
        <CompleteButton onClick={submitAddTravel}>작성완료</CompleteButton>
      </BottomButtons>
    </MenuContainer>
  );
};

export default FloatingMenu;

const MenuContainer = styled.div<{ menuHeight: string }>`
  position: sticky;
  top: 20px;
  min-width: 240px;
  height: ${({ menuHeight }) => menuHeight};
  padding: 16px;
  border: 1px solid #d2d2d2;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
  z-index: 1000;
  overflow-y: auto;
`;

const MenuItem = styled.div<{ isOpen?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
  color: ${(props) => (props.isOpen ? '#000' : props.isOpen === undefined ? '#000' : '#898989')};
`;

const ToggleIcon = styled.div<{ isOpen?: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${(props) => (props.isOpen ? '#000' : '#898989')};
`;

const BottomButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 10px;
`;

const TempSaveButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  color: #4a95f2;
`;

const CompleteButton = styled.button`
  padding: 8px 16px;
  background-color: #4a95f2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
