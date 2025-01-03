import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import styled from '@emotion/styled';

export type toastType = 'success' | 'failed';

export function ShowToast(message: string, toastType = 'success') {
  if (toastType === 'success') {
    toast.success(`${message}`, {
      autoClose: 3000,
      theme: 'light',
      draggable: true,
    });
  } else {
    toast.error(`${message}`, {
      autoClose: 3000,
      theme: 'light',
      draggable: true,
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
  /* .toastify-icon-color-success {
    fill: #3498db;
  } */
  /* .Toastify__toast--success {
    fill: #3498db;
  } */
  /* .Toastify__progress-bar {
    background-color: #4a95f2;
    color: #4a95f2;
  } */
`;
