import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../src/app/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = req.query;

  if (req.method === "GET") {
    if (typeof uid === "string") {
      try {
        const { rows } = await query(
          `SELECT ja.*, sj.job_title, jt.job_type, js.job_status
           FROM jobApplications ja
           JOIN savedJobs sj ON ja.job_title = sj.id
           LEFT JOIN jobTypes jt ON ja.job_type_id = jt.id
           LEFT JOIN jobStatus js ON ja.job_status_id = js.id
           WHERE ja.user_id = $1
           ORDER BY ja.created_date DESC
           LIMIT 5`,
          [uid]
        );

        res.status(200).json(rows);
      } catch (error) {
        res.status(500).json({ error: `${error}` });
      }
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
