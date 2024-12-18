export interface ApplicationTypes {
  jobTitle: string
  jobLocation: string
  companyName: string
  contactPerson: string
  applicationUrl: string
  jobType: string
  jobStatus: string
}

// -- Table: jobApplications
// CREATE TABLE jobApplications (
//     id SERIAL PRIMARY KEY,
//     job_title INT REFERENCES savedJobs(id) ON DELETE CASCADE,
//     job_location VARCHAR(150),
//     company_name VARCHAR(100),
//     contact_person VARCHAR(100),
//     application_url VARCHAR(255),
//     job_type_id INT REFERENCES jobTypes(id) ON DELETE SET NULL,
//     job_status_id INT REFERENCES jobStatus(id) ON DELETE SET NULL,
//     created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     last_updated_date TIMESTAMP,
//     user_id INT REFERENCES users(id) ON DELETE CASCADE
// );
