import BorderBtn from '@/components/BorderBtn';
import useUpdateAccountNumber from '@/hooks/query/useUpdateAccountNumber';
import useUserStore from '@/stores/useUserStore';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyBankAccount = () => {
  const navigate = useNavigate();
  const { user } = useUserStore((state) => state);
  const [bankCode, setBankCode] = useState(user?.bankCode || '입금 은행을 선택해주세요');
  const [accountNumber, setAccountNumber] = useState(user?.accountNumber || '');
  const updateAccountNumber = useUpdateAccountNumber();

  const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBankCode(e.target.value);
  };

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 허용
    const onlyNumbers = value.replace(/\D/g, '');
    setAccountNumber(onlyNumbers);
  };

  const handleSaveClick = () => {
    updateAccountNumber.mutate({
      userId: user?.userId as string,
      accountNumber,
      bankCode,
    });
  };

  //저장 활성화 조건
  const isButtonEnabled = bankCode !== '' && accountNumber.trim() !== '';

  return (
    <MyBankAccountWrap>
      <Header>
        <ChevronLeftIcon size={28} onClick={() => navigate(-1)} /> 계좌 정보
      </Header>

      <Details>
        <Title>예금주</Title>
        <Content>{user?.socialName}</Content>
      </Details>
      <Details>
        <Title>입금 은행</Title>
        <Select value={bankCode} onChange={handleBankChange}>
          <option value="004">국민은행</option>
          <option value="003">기업은행</option>
          <option value="090">카카오뱅크</option>
          <option value="002">우리은행</option>
          <option value="088">신한은행</option>
          <option value="089">K뱅크</option>
          <option value="011">농협은행</option>
          <option value="081">하나은행</option>
        </Select>
      </Details>
      <Details>
        <Title>계좌 번호</Title>
        <Input
          type="text"
          placeholder="계좌번호를 입력해주세요"
          value={accountNumber}
          onChange={handleAccountChange}
        />
      </Details>
      <BorderBtn
        color={isButtonEnabled ? '#4a95f2' : '#ccc'}
        size="sm"
        onClick={isButtonEnabled ? handleSaveClick : undefined}
        customStyle={css`
          background-color: ${isButtonEnabled ? 'initial' : '#f5f5f5'};
          cursor: ${isButtonEnabled ? 'pointer' : 'not-allowed'};
          opacity: ${isButtonEnabled ? '1' : '0.6'};
        `}
      >
        저장
      </BorderBtn>
    </MyBankAccountWrap>
  );
};

export default MyBankAccount;

const MyBankAccountWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.div`
  width: 70%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 40px;
  font-size: 22px;
  font-weight: bold;
`;

const ChevronLeftIcon = styled(ChevronLeft)`
  &:hover {
    cursor: pointer;
  }
`;

const Details = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 20px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border: 1px solid #ccc;
  padding: 8px;
  width: 100%;
  /* 비활성화처리 */
  background-color: #f5f5f5;
  color: #777;
  font-size: 14px;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: not-allowed;
  pointer-events: none;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 30px 8px 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #fff;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><path fill="gray" d="M0 3l5 5 5-5H0z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #4a95f2;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;
