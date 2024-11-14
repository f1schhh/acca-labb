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
    const result = await query(
      `SELECT id, job_title FROM savedJobs WHERE user_id = $1`,
      [userId]
    );

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Database connection error or query error:", error);
  }
}
