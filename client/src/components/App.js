import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState({
    courses: [],
  });
  useEffect(() => {
    async function fetchData() {
      const results = await fetch("http://localhost:5000/api/courses").then(
        (response) => response.json()
      );
      setData({ courses: results });
    }
    fetchData();
  }, []);
  return (
    <div className="App">
      <ul>
        {data.courses.map((course) => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
