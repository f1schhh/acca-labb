import { NextResponse, NextRequest } from "next/server";
import { query } from "../../lib/db";
import { auth } from "../../../../auth";

export async function GET(request: Request) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "5", 10);
  const offset = (page - 1) * limit;

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
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );
    const countResult = await query(
      `SELECT COUNT(*) as total_count
       FROM jobApplications
       WHERE user_id = $1`,
      [userId]
    );

    const totalCount = countResult.rows[0]?.total_count || 0;

    return NextResponse.json({ success: true, data: result.rows, totalCount });
  } catch (error) {
    console.error("Database connection error or query error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
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

    let jobTitleId;
    const checkJobTitleResult = await query(
      `SELECT id FROM savedJobs WHERE job_title = $1 AND user_id = $2`,
      [applicationData.jobTitle, userId]
    );

    if (checkJobTitleResult.rows.length > 0) {
      jobTitleId = checkJobTitleResult.rows[0].id;
    } else {
      const insertJobTitleResult = await query(
        `INSERT INTO savedJobs (job_title, user_id) VALUES ($1, $2) RETURNING id`,
        [applicationData.jobTitle, userId]
      );
      jobTitleId = insertJobTitleResult.rows[0].id;
    }

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
        userId,
      ]
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Database connection error or query error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
