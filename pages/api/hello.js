// pages/api/student.js
import { db } from '@vercel/postgres';

export default async function handler(request, response) {
  const { id } = request.query; // Extract the ID from query parameters
  const client = await db.connect();

  try {
    // Check if id is provided
    if (!id) {
      return response.status(400).json({ error: 'ID is required' });
    }

    const students = await client.query('SELECT * FROM ict822 WHERE id=$1', [id]);

    if (students.rowCount === 0) {
      return response.status(404).json({ error: 'Student not found' });
    }

    response.status(200).json(students.rows);
  } catch (error) {
    response.status(500).json({ error: 'Something went wrong' });
  } finally {
    client.release();
  }
}
