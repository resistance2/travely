import { toast, ToastContainer } from 'react-toastify';
import styled from '@emotion/styled';

export type toastType = 'success' | 'failed';

const CustomIconBlue = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#4a95f2">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);
const CustomIconRed = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#f44336">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

export function ShowToast(message: string, toastType = 'success') {
  if (toastType === 'success') {
    toast.success(`${message}`, {
      autoClose: 3000,
      theme: 'light',
      draggable: true,
      icon: <CustomIconBlue />,
    });
  } else {
    toast.error(`${message}`, {
      autoClose: 3000,
      theme: 'light',
      draggable: true,
      icon: <CustomIconRed />,
    });
  }
}

export default function Toast() {
  return <StyledToastContainer />;
}

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    background-color: white;
    color: black;
  }
  .toastify-icon-color-success {
    fill: #3498db;
  }
  .Toastify__toast--success {
    fill: #3498db;
  }
  .Toastify__progress-bar--success {
    background-color: #4a95f2;
  }
`;
