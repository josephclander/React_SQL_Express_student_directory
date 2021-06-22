import React, { useState, useEffect } from "react";

const Courses = () => {
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
    document.title = "Courses";
  }, []);

  return (
    <main>
      <div className="wrap main--grid">
        {data.courses.map((course) => (
          <a
            key={course.id}
            className="course--module course--link"
            href="course-detail.html"
          >
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          </a>
        ))}
        <a
          className="course--module course--add--module"
          href="create-course.html"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </a>
      </div>
    </main>
  );
};

export default Courses;