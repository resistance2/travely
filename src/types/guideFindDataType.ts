import { TravelTeamData } from './travelDataType';

export type TeamData = Pick<TravelTeamData, 'travelStartDate' | 'travelEndDate' | 'personLimit'>;

export interface AddForFindGuideData {
  userId: string | null;
  travelTitle: string | null;
  travelContent: string;
  thumbnail: string | null;
  team: TeamData[] | null;
}
