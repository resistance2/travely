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
    price: null,
    includedItems: null,
    excludedItems: null,
    meetingTime: null,
    FAQ: null,
    meetingLocation: null,
  },
  setData: (updates) => set((state) => ({ data: { ...state.data, ...updates } })),
}));

export default useAddTravelStore;
