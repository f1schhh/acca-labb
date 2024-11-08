import { NextResponse } from "next/server";
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
