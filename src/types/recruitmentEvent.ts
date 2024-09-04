import { RecruitmentEventType } from './recruitmentEventType';
export type RecruitmentEvent = {
  id: number;
  job_application_id: number;
  type: RecruitmentEventType;
  date: string;
  time: string;
  location: string;
  url: string;
  notes: string;
}