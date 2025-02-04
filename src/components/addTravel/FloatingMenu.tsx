import styled from '@emotion/styled';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ADD_FOR_FIND_GUIDE = 'add-for-find-guide';

interface FloatingMenuProps {
  onSubmit?: () => void;
  sections: string[];
  setOpenSection: (section: string) => void;
}

const FloatingMenu = ({ onSubmit, sections, setOpenSection }: FloatingMenuProps) => {
  const location = useLocation();
  const pathName = location.pathname === `/${ADD_FOR_FIND_GUIDE}` ? ADD_FOR_FIND_GUIDE : 'default';

  const pathConfig = {
    [ADD_FOR_FIND_GUIDE]: {
      menuHeight: '260px',
      basicSections: ['제목', '글 내용', '일정 및 팀 추가'],
      toggleSections: ['대표이미지'],
    },
    default: {
      menuHeight: '520px',
      basicSections: ['제목', '대표 이미지', '상품소개', '코스', '태그', '예약 생성', '가격'],
      toggleSections: ['포함내용', '미포함내용', '이용안내', 'FAQ'],
    },
  };

  const { menuHeight, basicSections, toggleSections } = pathConfig[pathName] || pathConfig.default;

  return (
    <MenuContainer menuHeight={menuHeight}>
      {basicSections.map((section) => (
        <MenuItem key={section}>
          <span>{section}</span>
        </MenuItem>
      ))}

      {toggleSections.map((section) => (
        <MenuItem key={section} isOpen={sections.includes(section)}>
          <span>{section}</span>
          <ToggleIcon onClick={() => setOpenSection(section)} isOpen={sections.includes(section)}>
            {sections.includes(section) ? <CircleMinus size={22} /> : <CirclePlus size={22} />}
          </ToggleIcon>
        </MenuItem>
      ))}

      <BottomButtons>
        <TempSaveButton>임시저장</TempSaveButton>
        <CompleteButton onClick={onSubmit}>작성완료</CompleteButton>
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
