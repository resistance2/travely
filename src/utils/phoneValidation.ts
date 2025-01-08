// 전화번호 정규화: 숫자만
export const normalizePhoneNumber = (phone: string) => phone.replace(/[^0-9]/g, '');

// 전화번호 포맷팅: 010-1234-5678 형식
export const formatPhoneNumber = (phone: string) => {
  const onlyNumbers = normalizePhoneNumber(phone);
  if (onlyNumbers.length <= 3) {
    return onlyNumbers;
  } else if (onlyNumbers.length <= 7) {
    return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
  } else {
    return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}-${onlyNumbers.slice(7, 11)}`;
  }
};

// 전화번호 유효성 검사: 한국 번호
export const isValidPhoneNumber = (phone: string) => {
  const phoneRegex =
    /^(01[016789]-?\d{3,4}-?\d{4}|02-?\d{3,4}-?\d{4}|0[3-9]{1}[0-9]-?\d{3,4}-?\d{4})$/;
  return phoneRegex.test(phone);
};
