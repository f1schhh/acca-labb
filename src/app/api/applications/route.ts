import { NextResponse, NextRequest } from "next/server";
import { query } from "../../lib/db";
import { auth } from "../../../../auth";

export async function GET() {
  const session = await auth();

  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await query(
      `SELECT ja.*,
                  sj.job_title,
                  jt.job_type,
                  jt.id AS job_type_id,
                  js.job_status,
                  js.id AS job_status_id
           FROM jobApplications ja
           JOIN savedJobs sj ON ja.job_title = sj.id
           LEFT JOIN jobTypes jt ON ja.job_type_id = jt.id
           LEFT JOIN jobStatus js ON ja.job_status_id = js.id
           WHERE ja.user_id = $1
           ORDER BY ja.created_date DESC
           LIMIT 5`,
      [userId]
    );

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Database connection error or query error:", error);
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const applicationData = await request.json();
    console.log(`VAD ÄR FEL`, applicationData);

    // Step 1: Check if job_title already exists in savedJobs
    let jobTitleId;
    const checkJobTitleResult = await query(
      `SELECT id FROM savedJobs WHERE job_title = $1 AND user_id = $2`,
      [applicationData.jobTitle, userId]
    );

    if (checkJobTitleResult.rows.length > 0) {
      // Job title exists, use the existing id
      jobTitleId = checkJobTitleResult.rows[0].id;
    } else {
      // Step 2: Insert job title into savedJobs if it doesn't exist
      const insertJobTitleResult = await query(
        `INSERT INTO savedJobs (job_title, user_id) VALUES ($1, $2) RETURNING id`,
        [applicationData.jobTitle, userId]
      );
      jobTitleId = insertJobTitleResult.rows[0].id;
    }

    // Step 3: Insert into jobApplications using the jobTitleId
    const result = await query(
      `INSERT INTO jobApplications (
        job_title, job_location, company_name, contact_person, application_url, job_type_id, job_status_id, user_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        jobTitleId,
        applicationData.location,
        applicationData.companyName,
        applicationData.contactPerson,
        applicationData.applicationUrl,
        applicationData.jobType,
        applicationData.jobStatus,
        userId, // Use authenticated user's ID
      ]
    );

    // Return a success response with the inserted data
    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Database connection error or query error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
