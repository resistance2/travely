import { create } from 'zustand';

interface State {
  sections: string[];
}

interface Action {
  setOpenSection: (section: string) => void;
  resetSections: () => void;
}

const useSectionsStore = create<State & Action>((set) => ({
  sections: [],
  setOpenSection: (section: string) =>
    set((state: State) => {
      if (state.sections.includes(section)) {
        const filterSections = state.sections.filter((item) => item !== section);
        return { sections: filterSections };
      } else {
        return { sections: [...state.sections, section] };
      }
    }),
  resetSections: () => set({ sections: [] }),
}));

export default useSectionsStore;
