Skapa mig postgree tabeller för
- users det ska vara id, first name, last name, email, password, address, phone, zipcode, city, country, signupDate, lastLoginDate
- job ansökningar(döp de på engelska) - id, jobTitle, jobDescription, jobLocation, companyName,
jobType(ska vara kopplat till en tabell som heter jobTypes),
jobStatus(ska vara kopplat till en tabell som heter jobStatus),
createdDate, lastUpdatedDate
user_id(ska vara kopplat till en tabell som heter users)

- jobTypes - id, jobType
- jobStatus - id, jobStatus

-- Table: users
-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     first_name VARCHAR(100) NOT NULL,
--     last_name VARCHAR(100) NOT NULL,
--     email VARCHAR(150) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     address VARCHAR(255),
--     phone VARCHAR(15),
--     zipcode VARCHAR(10),
--     city VARCHAR(100),
--     country VARCHAR(100),
--     signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     last_login_date TIMESTAMP
-- );

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
    user_id INT REFERENCES users(id) ON DELETE CASCADE
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
    user_id INT REFERENCES users(id) ON DELETE CASCADE
);
