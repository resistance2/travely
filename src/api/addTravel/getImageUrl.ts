import { SERVER } from '@/constants/url';

const getImageUrl = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${SERVER}/api/images/upload/single`, {
    method: 'POST',
    body: formData,
  });

  const { success, data } = await response.json();

  if (!success) {
    throw new Error('Failed to upload image');
  }

  return data.imageUrl;
};

export default getImageUrl;
