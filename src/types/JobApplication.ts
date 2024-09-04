
export type JobApplication = {
  id: number;
  company_name: string;
  job_title: string;
  offer_url: string;
  status: "applied" | "interview" | "rejected";
  application_date: string;
  notes: string;
}
