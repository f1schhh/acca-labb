import { query } from "./db";
export async function getAllUsers() {
  try {
    const result = await query(`
      SELECT
        id,
        first_name,
        last_name,
        email,
        address,
        phone,
        zipcode,
        city,
        country
      FROM auth.users
    `);
    return { success: true, data: result.rows };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, data: [] };
  }
}

export async function getUserByEmail(email: string) {
  try {
    const result = await query("SELECT * FROM auth.users WHERE email = $1", [
      email,
    ]);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const result = await query(
      "SELECT id, first_name, last_name, email, password, address, phone, zipcode, city, country FROM auth.users WHERE id = $1",

      [id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return null;
  }
}
