import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "../../../../auth";
import { query } from "../../lib/db";
import { getUserById } from "../../lib/helpers";

export async function GET() {
  const session = await auth();
  console.log("session get", session);
  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const userId = session.user.id;

    if (userId) {
      const user = await getUserById(userId);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: user });
    }
  } catch (error) {
    console.error("Database connection error or query error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    console.log("userData", userData);
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const result = await query(
      `INSERT INTO auth.users
      (first_name, last_name, email, password, address, phone, zipcode, city, country)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        userData.first_name,
        userData.last_name,
        userData.email,
        hashedPassword,
        userData.address,
        userData.phone,
        userData.zipcode,
        userData.city,
        userData.country,
      ]
    );

    console.log("Query result:", result.rows[0]);

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userData = await request.json();
    let querys: string, params: (string | number | boolean | undefined)[];

    if (userData.status === "password") {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      querys = `UPDATE auth.users SET
      password = $1 WHERE id = $2`;

      params = [hashedPassword, userData.id];
    } else {
      querys = `UPDATE auth.users SET
      first_name = $1,
      last_name = $2,
      email = $3,
      address = $4,
      phone = $5,
      zipcode = $6,
      city = $7,
      country = $8`;

      params = [
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.address,
        userData.phoneNumber,
        userData.zipcode,
        userData.city,
        userData.country,
      ];
    }

    const result = await query(querys, params);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { userId, userData } = await request.json();
    console.log("userData", userData, "userId", userId);

    let updateQuery = `UPDATE auth.users SET `;
    const params = [];

    const updates = [];
    let index = 1; // Start index for parameter placeholders

    if (userData.first_name) {
      updates.push(`first_name = $${index}`);
      params.push(userData.first_name);
      index++;
    }
    if (userData.last_name) {
      updates.push(`last_name = $${index}`);
      params.push(userData.last_name);
      index++;
    }
    if (userData.email) {
      updates.push(`email = $${index}`);
      params.push(userData.email);
      index++;
    }
    if (userData.address) {
      updates.push(`address = $${index}`);
      params.push(userData.address);
      index++;
    }
    if (userData.phone) {
      updates.push(`phone = $${index}`);
      params.push(userData.phone);
      index++;
    }
    if (userData.zipcode) {
      updates.push(`zipcode = $${index}`);
      params.push(userData.zipcode);
      index++;
    }
    if (userData.city) {
      updates.push(`city = $${index}`);
      params.push(userData.city);
      index++;
    }
    if (userData.country) {
      updates.push(`country = $${index}`);
      params.push(userData.country);
      index++;
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: "No fields provided for update" },
        { status: 400 }
      );
    }

    updateQuery +=
      updates.join(", ") + ` WHERE id = $${params.length + 1}  RETURNING *`;
    params.push(userId);

    console.log("Params:" + typeof params, "UpdateQuey:" + updateQuery);
    console.table(updateQuery);
    const result = await query(updateQuery, params);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log(result);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { userId } = await request.json();

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
