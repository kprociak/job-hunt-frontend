
export type JobApplicationType = {
  id: number;
  companyName: string;
  position: string;
  offerUrl: string;
  status: "applied" | "interview" | "rejected";
  applicationDate: string;
  notes: string;
}
