import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { query } from "../../lib/db";
import { Parser } from "json2csv";

export async function GET() {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userResult = await query(
      `SELECT id, first_name, last_name, email, address, phone, zipcode, city, country,
              email_verified, signup_date, last_login_date
       FROM auth.users
       WHERE id = $1`,
      [userId]
    );

    const savedJobsResult = await query(
      `SELECT id AS saved_job_id, job_title
       FROM savedJobs
       WHERE user_id = $1`,
      [userId]
    );

    const jobApplicationsResult = await query(
      `SELECT ja.id AS job_application_id, ja.job_location, ja.company_name, ja.contact_person,
              ja.application_url, jt.job_type, js.job_status, ja.created_date, ja.last_updated_date
       FROM jobApplications ja
       LEFT JOIN jobTypes jt ON ja.job_type_id = jt.id
       LEFT JOIN jobStatus js ON ja.job_status_id = js.id
       WHERE ja.user_id = $1`,
      [userId]
    );

    const userFields = [
      "id",
      "first_name",
      "last_name",
      "email",
      "address",
      "phone",
      "zipcode",
      "city",
      "country",
      "email_verified",
      "signup_date",
      "last_login_date",
    ];
    const savedJobsFields = ["saved_job_id", "job_title"];
    const jobApplicationsFields = [
      "job_application_id",
      "job_location",
      "company_name",
      "contact_person",
      "application_url",
      "job_type",
      "job_status",
      "created_date",
      "last_updated_date",
    ];

    const userParser = new Parser({ fields: userFields });
    const savedJobsParser = new Parser({ fields: savedJobsFields });
    const jobApplicationsParser = new Parser({ fields: jobApplicationsFields });

    const userCsv = userParser.parse(userResult.rows);
    const savedJobsCsv = savedJobsParser.parse(savedJobsResult.rows);
    const jobApplicationsCsv = jobApplicationsParser.parse(
      jobApplicationsResult.rows
    );

    const csvContent = [
      "User information",
      userCsv,
      "",
      "Saved jobs",
      savedJobsCsv,
      "",
      "Applications for jobs",
      jobApplicationsCsv,
    ].join("\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=user_data_export.csv",
      },
    });
  } catch (error) {
    console.error("Something went wrong:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
