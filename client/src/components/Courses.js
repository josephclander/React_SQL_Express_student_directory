import React, { Component } from "react";
import { Link } from "react-router-dom";
import Data from "../Data";

class Courses extends Component {
  state = {
    courses: [],
  };

  constructor() {
    super();
    this.data = new Data();
  }

  componentDidMount() {
    const fetch = async () => {
      try {
        const response = await this.data.getCourses();
        this.setState({ courses: response });
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
    document.title = "Courses";
  }

  render() {
    return (
      <main>
        <div className="wrap main--grid">
          {this.state.courses.map((course) => (
            <Link
              key={course.id}
              className="course--module course--link"
              to={`/courses/${course.id}`}
            >
              <h2 className="course--label">Course</h2>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          ))}
          <Link
            className="course--module course--add--module"
            to="/courses/create"
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
          </Link>
        </div>
      </main>
    );
  }
}

export default Courses;
