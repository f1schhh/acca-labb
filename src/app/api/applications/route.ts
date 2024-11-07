import { NextResponse } from 'next/server'
import { pool } from '../../lib/db'

export async function GET() {
  const applications = await getAllArchivedApplications()

  return NextResponse.json({ success: true, data: applications })
}

export async function getAllArchivedApplications() {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM jobApplications')
    return result.rows
  } finally {
    client.release()
  }
}
