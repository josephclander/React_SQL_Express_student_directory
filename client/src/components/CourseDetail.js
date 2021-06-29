import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Data from '../Data';

class CourseDetail extends Component {
  state = {
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
    message: '',
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
        this.setState(response);
        if (response === null) {
          this.props.history.push('/notfound');
        }
      } catch (err) {
        console.error(err);
        this.props.history.push('/error');
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
    } = this.state;
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
              <button className='button' onClick={this.handleClick}>
                Delete Course
              </button>
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
                <ReactMarkdown>{description}</ReactMarkdown>
              </div>
              <div>
                <h3 className='course--detail--title'>Estimated Time</h3>
                <p>{estimatedTime}</p>

                <h3 className='course--detail--title'>Materials Needed</h3>
                <ul className='course--detail--list'>
                  <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }

  handleClick = (event) => {
    event.preventDefault();
    const { context } = this.props;
    const { id } = this.state;
    const { emailAddress } = context.authenticatedUser;
    const { password } = context.authenticatedUser;

    context.data
      .deleteCourse(id, emailAddress, password)
      .then((response) => {
        if (response.message) {
          // we shouldn't see these error messages as there isn't the functionality to reach them
          this.setState(() => {
            return { message: response.message };
          });
        } else {
          this.props.history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/error');
      });
  };
}

export default CourseDetail;
