import { query } from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "../route";

type Params = Promise<{ userId: string }>;
export async function DELETE(
  request: NextRequest,
  segmentData: { params: Params }
) {
  const params = await segmentData.params;
  const userId = params.userId;

  if (!userId) {
    return NextResponse.json(
      { error: "User ID not provided" },
      { status: 400 }
    );
  }

  try {
    await query("BEGIN");

    const userExist = await getUserById(userId);
    if (!userExist) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    await query("DELETE FROM auth.users WHERE id = $1 RETURNING id", [userId]);

    await query("COMMIT");

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    await query("ROLLBACK");
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
