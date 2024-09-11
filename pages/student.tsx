import { useState, FormEvent, ChangeEvent } from 'react';

interface StudentData {
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

export default function StudentTable() {
  const [studentData, setStudentData] = useState<StudentData[]>([]);
  const [searchId, setSearchId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Function to handle the search request
  const handleSearch = async () => {
    if (!searchId) {
      setErrorMessage('Please enter a student ID');
      return;
    }

    setErrorMessage('');
    setStudentData([]); // Clear previous data
    try {
      const response = await fetch(`/api/student?id=${searchId}`);
      const data: StudentData[] = await response.json();

      if (response.status === 200) {
        setStudentData(data); // Set the fetched data
      } 
    } catch (error) {
      setErrorMessage('An error occurred while fetching the data');
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };

  return (
    <div>
      <h1>Student Information Search</h1>

      {/* Search Bar */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchId}
          onChange={handleInputChange}
          placeholder="Enter student ID"
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px' }}>Search</button>
      </form>

      {/* Error Message */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Display student data if available */}
      {studentData.length > 0 && (
        <div>
          <h2>Student Information</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Field</th>
                <th style={{ border: '1px solid black', padding: '8px' }}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Session</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{studentData[0].session}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>ID</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{studentData[0].id}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Name</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{studentData[0].name}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>GPA</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{studentData[0].gpa}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Total Credits</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{studentData[0].total_cr}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>CGPA</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{studentData[0].cgpa}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>Status</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{studentData[0].status}</td>
              </tr>
            </tbody>
          </table>

          {/* Course Info */}
          <h2>Course Information</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Course No</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Course Name</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>CR</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>LG</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>GP</th>
              </tr>
            </thead>
            <tbody>
              {studentData
                .filter((course) => course.gp !== null) // Filter out courses with no GP
                .map((course, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{course.course_no}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{course.course_name}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{course.cr || 'N/A'}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{course.lg || 'N/A'}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{course.gp || 'N/A'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
