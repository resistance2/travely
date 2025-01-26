import { ImageStore } from '@/stores/useImageStore';

const prepareImageUpload = (images: ImageStore) => {
  const formData = new FormData();
  if (images.thumbnail) {
    formData.append('thumbnail', images.thumbnail);
  }
  if (images.meetingSpace) {
    formData.append('meetingSpace', images.meetingSpace);
  }
  if (images.introSrcs.length > 0) {
    images.introSrcs.forEach((src) => {
      formData.append('introSrcs', src);
    });
  }
  return formData;
};

export default prepareImageUpload;
