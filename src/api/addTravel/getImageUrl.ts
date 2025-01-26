import { SERVER } from '@/constants/url';
import axios from 'axios';

const getImageUrl = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await axios.post(`${SERVER}/api/images/upload/single`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (!data.success) {
    throw new Error('Failed to upload image');
  }

  return data.data.imageUrl;
};

export default getImageUrl;
