import { SERVER } from '@/constants/url';
import axios from 'axios';

interface PresignedUrlResponse {
  success: boolean;
  data?: {
    uploadUrl: string;
    fileUrl: string;
  };
}

export async function uploadImageWithPresignedUrl(file: File, category: string) {
  try {
    const response = await axios.post<PresignedUrlResponse>(`${SERVER}/api/images/presigned-url`, {
      fileName: file.name,
      fileType: file.type,
      category,
    });

    if (!response.data?.data) {
      throw new Error('Invalid response data structure');
    }

    const data = response.data.data;
    const { uploadUrl, fileUrl } = data;

    if (!uploadUrl || !fileUrl) {
      console.error('Failed to get presigned URL:', response.data);
      throw new Error('Failed to get presigned URL');
    }

    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload image');
    }

    return fileUrl;
  } catch (error) {
    console.error('Error in uploadImageWithPresignedUrl:', error);
    throw error;
  }
}
