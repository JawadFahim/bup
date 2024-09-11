// pages/api/student.ts
"use server"
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@vercel/postgres';

interface Student {
  serial: number;
  session: string;
  id: string;
  name: string;
  course_no: string;
  course_name: string;
  cr: number | null;
  lg: string | null;
  gp: number | null;
  gpa: string;
  total_cr: string;
  cgpa: string;
  status: string;
  remarks: string | null;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id } = request.query as { id?: string }; // Extract the ID from query parameters
  const client = await db.connect();

  try {
    // Check if id is provided
    if (!id) {
      return response.status(400).json({ error: 'ID is required' });
    }

    const studentsResult = await client.query<Student>('SELECT * FROM ict822 WHERE id=$1', [id]);

    if (studentsResult.rowCount === 0) {
      return response.status(404).json({ error: 'Student not found' });
    }

    response.status(200).json(studentsResult.rows);
  } catch (error) {
    response.status(500).json({ error: 'Something went wrong' });
  } finally {
    client.release();
  }
}
