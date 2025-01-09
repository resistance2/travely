import { ImageStore } from '@/stores/useImageStore';

const formData = new FormData();

const addImageToFormData = (type: string, file: File) => {
  if (!file) return;
  formData.append(type, file);
};

const prepareImageUpload = (images: ImageStore) => {
  if (images.thumbnail) {
    addImageToFormData('thumbnail', images.thumbnail);
  }
  if (images.meetingSpace) {
    addImageToFormData('meetingSpace', images.meetingSpace);
  }
  if (images.introSrcs.length > 0) {
    images.introSrcs.forEach((src) => {
      addImageToFormData('introSrcs', src);
    });
  }

  return formData;
};

export default prepareImageUpload;
