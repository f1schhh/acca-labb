import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { query } from "../../../lib/db";
export async function GET() {
  const session = await auth();

  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await query(`SELECT
    jobApplications.*,
    jobStatus.job_status
    FROM
    jobApplications
    JOIN
    jobStatus ON jobApplications.job_status_id = jobStatus.id
    WHERE
    jobStatus.job_status = 'Archived';`);

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Database connection error or query error:", error);
  }
}
