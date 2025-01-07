import { AddTravelData } from '@/types/travelDataType';
import { create } from 'zustand';

interface IUseAddTravelStore {
  data: AddTravelData;
  setData: (updates: Partial<AddTravelData>) => void;
}

const useAddTravelStore = create<IUseAddTravelStore>((set) => ({
  data: {
    userId: null,
    thumbnail: null,
    travelTitle: null,
    travelContent: null,
    travelCourse: null,
    tag: null,
    team: null,
    travelPrice: 0,
    includedItems: null,
    excludedItems: null,
    meetingTime: null,
    FAQ: null,
    meetingPlace: null,
  },
  setData: (updates) => set((state) => ({ data: { ...state.data, ...updates } })),
}));

export default useAddTravelStore;
