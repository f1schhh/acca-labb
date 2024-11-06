export interface JobApplicationTypes {
  id?: number;
  job_title?: number;
  job_location?: string;
  company_name?: string;
  contact_person?: string;
  application_url: string;
  job_type_id?: number | null;
  job_status_id?: number | null;
  job_type?: string;
  job_status?: string;
  created_date?: Date;
  last_updated_date?: Date | null;
  user_id?: number;
}
