import { TeamData } from '@/types/guideFindDataType';
import { create } from 'zustand';

export type FieldsOptions =
  | 'includeList'
  | 'excludeList'
  | 'faqs'
  | 'meetingTime'
  | 'courseList'
  | 'scheduleList';

interface Faqs {
  question: string;
  answer: string;
}

interface Fields {
  content: string;
  includeList: string[] | null;
  excludeList: string[] | null;
  faqs: Faqs[] | null;
  meetingTime: string[] | null;
  courseList: string[] | null;
  scheduleList: TeamData[] | null;
}

interface State {
  fields: Fields;
}

interface Action {
  actions: {
    setContent: (newDescription: string) => void;
    addField: (option: FieldsOptions, newField: string | TeamData, answer?: string) => void;
    removeField: (option: FieldsOptions, index: number) => void;
    resetField: () => void;
  };
}

const initialState: State = {
  fields: {
    content: '',
    includeList: null,
    excludeList: null,
    faqs: null,
    meetingTime: null,
    courseList: null,
    scheduleList: null,
  },
};

const useFieldStore = create<State & Action>((set) => ({
  fields: {
    ...initialState.fields,
  },

  actions: {
    setContent: (newDescription: string) =>
      set((state) => {
        return {
          fields: {
            ...state.fields,
            content: newDescription,
          },
        };
      }),

    addField: (option: FieldsOptions, newField: string | TeamData, answer?: string) =>
      set((state) => {
        const updatedField =
          option === 'faqs'
            ? [...(state.fields.faqs || []), { question: newField as string, answer: answer || '' }]
            : [...(state.fields[option] || []), newField];
        return {
          fields: {
            ...state.fields,
            [option]: updatedField,
          },
        };
      }),

    removeField: (option: FieldsOptions, index: number) =>
      set((state) => {
        const updatedField = (state.fields[option] || []).filter((_, i) => i !== index);
        return {
          fields: {
            ...state.fields,
            [option]: updatedField?.length !== 0 ? updatedField : null,
          },
        };
      }),

    resetField: () =>
      set({
        fields: {
          ...initialState.fields,
        },
      }),
  },
}));

export default useFieldStore;
