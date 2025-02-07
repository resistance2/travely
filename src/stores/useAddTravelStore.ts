import useUserStore from '@/stores/useUserStore';
import { AddTravelData } from '@/types/travelDataType';
import { create } from 'zustand';

interface IUseAddTravelStore {
  data: AddTravelData;
  setData: (updates: Partial<AddTravelData>) => void;
  resetData: () => void;
}

const userId = useUserStore.getState().user?.userId || null;
const initData = {
  userId,
  thumbnail: null,
  travelTitle: null,
  travelContent: null,
  travelCourse: null,
  tag: null,
  team: null,
  travelPrice: null,
  includedItems: null,
  excludedItems: null,
  meetingTime: null,
  FAQ: null,
  meetingPlace: null,
};

const useAddTravelStore = create<IUseAddTravelStore>((set) => ({
  data: initData,
  setData: (updates) => set((state) => ({ data: { ...state.data, ...updates } })),
  resetData: () => set({ data: initData }),
}));

export default useAddTravelStore;
