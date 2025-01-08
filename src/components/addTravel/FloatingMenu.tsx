import useHandleAddTravel from '@/hooks/custom/useHandleAddTravel';
import useSectionsStore from '@/stores/useSectionsStore';
import styled from '@emotion/styled';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ADD_TRAVEL = 'add-travel';
const ADD_FOR_FIND_GUIDE = 'add-for-find-guide';

const FloatingMenu = () => {
  const sections = useSectionsStore((state) => state.sections);
  const setOpenSection = useSectionsStore((state) => state.setOpenSection);
  const location = useLocation();
  const pathName = location.pathname;
  const menuHeight = pathName === `/${ADD_FOR_FIND_GUIDE}` ? '260px' : '520px';
  const handleAddTravel = useHandleAddTravel().handleAddTravel;

  const submitHandler = () => {
    if (pathName === `/${ADD_TRAVEL}`) {
      handleAddTravel();
    } else if (pathName === `/${ADD_FOR_FIND_GUIDE}`) {
      //가이드 찾아요
    }
  };

  return (
    <MenuContainer menuHeight={menuHeight}>
      {pathName === `/${ADD_FOR_FIND_GUIDE}` ? (
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
        <CompleteButton onClick={submitHandler}>작성완료</CompleteButton>
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
