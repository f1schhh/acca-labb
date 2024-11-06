import { NextResponse, NextRequest } from "next/server";
import { pool } from "../../lib/db";
import bcrypt from "bcryptjs";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id) {
      const user = await getUserById(id);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: user });
    }
    const users = await getAllUsers();
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error("Database connection error or query error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        // details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}

export async function getAllUsers() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM auth.users");
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getUserByEmail(email: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM auth.users WHERE email = $1",
      [email]
    );
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

export async function getUserById(id: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT id, first_name, last_name, email, address, phone, zipcode, city, country FROM auth.users WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO auth.users
      (first_name, last_name, email, password, address, phone, zipcode, city, country)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        userData.firstName,
        userData.lastName,
        userData.email,
        hashedPassword,
        userData.address,
        userData.phoneNumber,
        userData.zipcode,
        userData.city,
        userData.country,
      ]
    );
    client.release();
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    // if (error instanceof Error && error.code === "23505") {
    //   // Unique violation PostgreSQL error code
    //   return NextResponse.json(
    //     { error: "Email already exists" },
    //     { status: 409 }
    //   );
    // }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userData = await request.json();
    const client = await pool.connect();

    let query = `UPDATE auth.users SET
      first_name = $1,
      last_name = $2,
      email = $3,
      address = $4,
      phone = $5,
      zipcode = $6,
      city = $7,
      country = $8`;

    const params = [
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.address,
      userData.phoneNumber,
      userData.zipcode,
      userData.city,
      userData.country,
    ];

    // If password is being updated, hash it
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      query += `, password = $${params.length + 1}`;
      params.push(hashedPassword);
    }

    query += ` WHERE id = $${params.length + 1}
      RETURNING id, first_name, last_name, email, address, phone, zipcode, city, country`;
    params.push(userData.id);

    const result = await client.query(query, params);
    client.release();

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

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const client = await pool.connect();
    const result = await client.query(
      "DELETE FROM auth.users WHERE id = $1 RETURNING *",
      [id]
    );
    client.release();
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
