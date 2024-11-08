
import { NextResponse } from "next/server";
import { pool } from "../../lib/db";
import { auth } from "../../../../auth";

// export async function GET() {
//   const applications = await getAllApplications();

//   return NextResponse.json({ success: true, data: applications });
// }

// export async function getAllApplications() {
//   const client = await pool.connect();
//   try {
//     const result = await client.query("SELECT * FROM jobApplications");
//     return result.rows;
//   } finally {
//     client.release();
//   }
// }

export async function GET() {
  const client = await pool.connect();
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await client.query(
      "SELECT * FROM jobApplications WHERE user_id = $1",
      [session.user.id]
    );
    return NextResponse.json({ success: true, data: result.rows });
  } finally {
    client.release()
  }
}
