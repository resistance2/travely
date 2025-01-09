import axios from 'axios';

interface ResponseData {
  introSrcs: string[];
  meetingSpace: string[];
  thumbnail: string[];
}

const S3_URL = import.meta.env.VITE_SERVER_URL;

const getImageUrls = async (preparedImageData: FormData | null): Promise<ResponseData> => {
  try {
    const response = await axios.post(`${S3_URL}/api/images/upload`, preparedImageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const imageUrls = response.data;
    return imageUrls;
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? `이미지 업로드 실패: ${err.message}`
        : '이미지 업로드 중 알 수 없는 오류가 발생했습니다.',
    );
  }
};

export default getImageUrls;
