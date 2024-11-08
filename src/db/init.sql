Skapa mig postgree tabeller för
- users det ska vara id, first name, last name, email, password, address, phone, zipcode, city, country, signupDate, lastLoginDate
- job ansökningar(döp de på engelska) - id, jobTitle, jobDescription, jobLocation, companyName,
jobType(ska vara kopplat till en tabell som heter jobTypes),
jobStatus(ska vara kopplat till en tabell som heter jobStatus),
createdDate, lastUpdatedDate
user_id(ska vara kopplat till en tabell som heter users)

- jobTypes - id, jobType
- jobStatus - id, jobStatus


CREATE SCHEMA IF NOT EXISTS auth;

CREATE TABLE IF NOT EXISTS auth.users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  address VARCHAR(255),
  phone VARCHAR(15),
  zipcode VARCHAR(10),
  city VARCHAR(100),
  country VARCHAR(100),
  email_verified TIMESTAMP WITH TIME ZONE,
  signup_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_login_date TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS auth.sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES auth.users(id),
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  session_token VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO auth.users (
  first_name,
  last_name,
  email,
  password,
  address,
  phone,
  zipcode,
  city,
  country,
  email_verified,
  signup_date,
  last_login_date
) VALUES (
  'Test',
  'User',
  'testuser@example.com',
  'mypassword',   -- Replace with an actual hashed password if needed
  '123 Example St',
  '1234567890',
  '12345',
  'Test City',
  'Test Country',
  NULL,                -- Email not verified, so set to NULL
  CURRENT_TIMESTAMP,   -- Automatically sets to the current time
  NULL                 -- No last login date, so set to NULL
);


-- Table: jobTypes
CREATE TABLE jobTypes (
    id SERIAL PRIMARY KEY,
    job_type VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE jobStatus (
    id SERIAL PRIMARY KEY,
    job_status VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE savedJobs (
    id SERIAL PRIMARY KEY,
    job_title VARCHAR(150) UNIQUE NOT NULL,
    user_id INT REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE TABLE jobApplications (
    id SERIAL PRIMARY KEY,
    job_title INT REFERENCES savedJobs(id) ON DELETE CASCADE,
    job_location VARCHAR(150),
    company_name VARCHAR(100),
    contact_person VARCHAR(100),
    application_url VARCHAR(255),
    job_type_id INT REFERENCES jobTypes(id) ON DELETE SET NULL,
    job_status_id INT REFERENCES jobStatus(id) ON DELETE SET NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_date TIMESTAMP,
    user_id INT REFERENCES auth.users(id) ON DELETE CASCADE
);


-- 1. Lägg till dummydata i jobTypes
INSERT INTO jobTypes (job_type) VALUES
('Full-Time'),
('Part-Time'),
('Contract'),
('Internship');

-- 2. Lägg till dummydata i jobStatus
INSERT INTO jobStatus (job_status) VALUES
('Open'),
('Closed'),
('In Progress'),
('Offered');

-- 3. Lägg till dummydata i savedJobs
-- Använd ett befintligt user_id från auth.users-tabellen
INSERT INTO savedJobs (job_title, user_id) VALUES
('Software Engineer', 1),
('Data Analyst', 1),
('Project Manager', 2),
('Frontend Developer', 3);

-- 4. Lägg till dummydata i jobApplications
-- Använd befintliga id-värden från savedJobs, jobTypes och jobStatus
INSERT INTO jobApplications (
    job_title, job_location, company_name, contact_person, application_url,
    job_type_id, job_status_id, created_date, last_updated_date, user_id
) VALUES
(1, 'Stockholm', 'Tech AB', 'Anna Svensson', 'https://example.com/apply/1', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1),
(2, 'Göteborg', 'DataCorp', 'Erik Johansson', 'https://example.com/apply/2', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1),
(3, 'Malmö', 'Innovatech', 'Sara Karlsson', 'https://example.com/apply/3', 3, 3, CURRENT_TIMESTAMP, NULL, 2),
(4, 'Uppsala', 'Frontendify', 'Johan Berg', 'https://example.com/apply/4', 4, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 3);


-- För att testa all data

SELECT
    u.id AS user_id,
    u.first_name || ' ' || u.last_name AS user_name,
    sj.job_title AS saved_job_title,
    ja.job_location,
    ja.company_name,
    ja.contact_person,
    ja.application_url,
    jt.job_type AS job_type,
    js.job_status AS application_status,
    ja.created_date AS application_created,
    ja.last_updated_date AS application_last_updated
FROM
    auth.users u
LEFT JOIN
    savedJobs sj ON u.id = sj.user_id
LEFT JOIN
    jobApplications ja ON sj.id = ja.job_title
LEFT JOIN
    jobTypes jt ON ja.job_type_id = jt.id
LEFT JOIN
    jobStatus js ON ja.job_status_id = js.id
ORDER BY
    u.id, sj.job_title;
