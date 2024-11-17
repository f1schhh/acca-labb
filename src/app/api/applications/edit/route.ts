import { query } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function PUT(request: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const applicationData = await request.json();

    if (!applicationData) {
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 }
      );
    }
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
      `UPDATE jobApplications
       SET
         job_title = $1,
         job_location = $2,
         company_name = $3,
         contact_person = $4,
         application_url = $5,
         job_type_id = $6,
         job_status_id = $7,
         last_updated_date = NOW()
       WHERE user_id = $8 AND id = $9
       RETURNING *`,
      [
        jobTitleId,
        applicationData.location,
        applicationData.companyName,
        applicationData.contactPerson,
        applicationData.applicationUrl,
        applicationData.jobType,
        applicationData.jobStatus,
        userId,
        applicationData.id,
      ]
    );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Database connection error or query error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
