import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Data from '../Data';

class CourseDetail extends Component {
  state = {
    course: {
      id: 0,
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      userId: 0,
      User: {
        id: 0,
        firstName: '',
        lastName: '',
        emailAddress: '',
      },
    },
  };

  constructor() {
    super();
    this.data = new Data();
  }

  componentDidMount() {
    const courseId = this.props.match.params.id;
    const fetch = async () => {
      try {
        const response = await this.data.getCourseById(courseId);
        this.setState({ course: response });
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
    document.title = `Course Detail`;
  }

  render() {
    const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
      User,
    } = this.state.course;
    const { firstName, lastName } = User;
    const { authenticatedUser } = this.props.context;
    const isAllowed = authenticatedUser && authenticatedUser.id === userId;

    return (
      <main>
        <div className='actions--bar'>
          <div className='wrap'>
            {isAllowed ? (
              <Link className='button' to={`/courses/${id}/update`}>
                Update Course
              </Link>
            ) : null}
            {isAllowed ? (
              <Link className='button' to='delete.html'>
                Delete Course
              </Link>
            ) : null}
            <Link className='button button-secondary' to='/'>
              Return to List
            </Link>
          </div>
        </div>

        <div className='wrap'>
          <h2>Course Detail</h2>
          <form>
            <div className='main--flex'>
              <div>
                <h3 className='course--detail--title'>Course</h3>
                <h4 className='course--name'>{title}</h4>
                <p>
                  By {firstName} {lastName}
                </p>
                {description
                  ? description
                      .split('\n\n')
                      .map((item, index) => <p key={index}>{item}</p>)
                  : null}
              </div>
              <div>
                <h3 className='course--detail--title'>Estimated Time</h3>
                <p>{estimatedTime}</p>

                <h3 className='course--detail--title'>Materials Needed</h3>
                <ul className='course--detail--list'>
                  {materialsNeeded
                    ? materialsNeeded
                        .replace('\n', '')
                        .split(/\*\s/g)
                        .slice(1)
                        .map((item, index) => <li key={index}>{item}</li>)
                    : null}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

export default CourseDetail;
