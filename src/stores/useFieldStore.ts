import { TravelTeamData } from '@/types/travelDataType';
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

export type Schedule = Pick<TravelTeamData, 'travelStartDate' | 'travelEndDate' | 'personLimit'>;

interface Fields {
  includeList: string[] | null;
  excludeList: string[] | null;
  faqs: Faqs[] | null;
  meetingTime: string[] | null;
  courseList: string[] | null;
  scheduleList: Schedule[] | null;
}

interface State {
  fields: Fields;
}
interface Action {
  actions: {
    addField: (option: FieldsOptions, newField: string | Schedule, answer?: string) => void;
    removeField: (option: FieldsOptions, index: number) => void;
    resetField: () => void;
  };
}

const initialState: State = {
  fields: {
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
    addField: (option: FieldsOptions, newField: string | Schedule, answer?: string) =>
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
            [option]: updatedField,
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
