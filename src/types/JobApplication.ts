
export type JobApplication = {
  id: number;
  company_name: string;
  job_title: string;
  offer_url: string;
  status: "new" | "ongoing" | "rejected" | "accepted";
  application_date: string;
  notes: string;
  offer_salary_from: number;
  offer_salary_to: number;
  expected_salary_from: number;
  expected_salary_to: number;
  last_update_date: string;
}
