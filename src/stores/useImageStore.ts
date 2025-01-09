import { create } from 'zustand';

export interface ImageStore {
  thumbnail: File | null;
  meetingSpace: File | null;
  introSrcs: File[];
}

interface State {
  images: ImageStore;
}

interface Action {
  actions: {
    setThumbnail: (thumbnail: File) => void;
    setIntroSrcs: (introSrcs: File[]) => void;
    setMeetingSpace: (meetingSpace: File) => void;
    resetImages: () => void;
  };
}

const useImageStore = create<State & Action>((set) => ({
  images: {
    thumbnail: null,
    meetingSpace: null,
    introSrcs: [],
  },
  actions: {
    setThumbnail: (thumbnail: File) =>
      set((state) => {
        return { images: { ...state.images, thumbnail } };
      }),
    setMeetingSpace: (meetingSpace: File) =>
      set((state) => {
        return { images: { ...state.images, meetingSpace } };
      }),
    setIntroSrcs: (introSrcs: File[]) =>
      set((state) => {
        return { images: { ...state.images, introSrcs } };
      }),
    resetImages: () =>
      set({
        images: {
          thumbnail: null,
          meetingSpace: null,
          introSrcs: [],
        },
      }),
  },
}));

export default useImageStore;
