import React, { Component } from 'react';
import ErrorsDisplay from './ErrorsDisplay';

class UpdateCourse extends Component {
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
    errors: [],
  };

  componentDidMount() {
    const courseId = this.props.match.params.id;
    const { context } = this.props;
    const { authenticatedUser } = context;
    const fetch = async () => {
      try {
        const response = await context.data.getCourseById(courseId);
        this.setState(() => response);
        // redirect if not the owner and accessed via url
        if (authenticatedUser.id !== this.state.userId) {
          this.props.history.push('/forbidden');
        }
        if (response === null) {
          this.props.history.push('/notfound');
        }
      } catch (err) {
        console.error(err);
        this.props.history.push('/error');
      }
    };
    fetch();
    document.title = `Course Update`;
  }

  render() {
    const { title, description, estimatedTime, materialsNeeded, User, errors } =
      this.state;
    const { firstName, lastName } = User;

    return (
      <main>
        <div className='wrap'>
          <h2>Update Course</h2>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={this.handleSubmit}>
            <div className='main--flex'>
              <div>
                <label htmlFor='Title'>Course Title</label>
                <input
                  id='title'
                  name='title'
                  type='text'
                  value={title}
                  onChange={this.handleChange}
                />

                <p>
                  By {firstName} {lastName}
                </p>

                <label htmlFor='description'>Course Description</label>
                <textarea
                  id='description'
                  name='description'
                  value={description}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label htmlFor='estimatedTime'>Estimated Time</label>
                <input
                  id='estimatedTime'
                  name='estimatedTime'
                  type='text'
                  value={estimatedTime}
                  onChange={this.handleChange}
                />

                <label htmlFor='materialsNeeded'>Materials Needed</label>
                <textarea
                  id='materialsNeeded'
                  name='materialsNeeded'
                  value={materialsNeeded}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <button className='button' type='submit'>
              Update Course
            </button>
            <button
              className='button button-secondary'
              onClick={this.handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      </main>
    );
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { context } = this.props;
    const { id, title, description, estimatedTime, materialsNeeded } =
      this.state;
    const userId = context.authenticatedUser.id;
    const { emailAddress } = context.authenticatedUser;
    const { password } = context.authenticatedUser;

    // Create course to update
    const course = {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    context.data
      .updateCourse(course, emailAddress, password)
      .then((errors) => {
        if (errors.length) {
          this.setState(() => {
            return { errors };
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

  handleCancel = (event) => {
    event.preventDefault();
    this.props.history.push('/');
  };
}

export default UpdateCourse;
