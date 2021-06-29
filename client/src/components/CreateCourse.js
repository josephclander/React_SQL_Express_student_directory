import React, { Component } from 'react';
import ErrorsDisplay from './ErrorsDisplay';

class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  };

  componentDidMount() {
    document.title = `Create Course`;
  }

  render() {
    const { title, description, estimatedTime, materialsNeeded, errors } =
      this.state;
    const { context } = this.props;
    const user = context.authenticatedUser;

    return (
      <main>
        <div className='wrap'>
          <h2>Create Course</h2>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={this.handleSubmit}>
            <div className='main--flex'>
              <div>
                <label htmlFor='title'>Course Title</label>
                <input
                  id='title'
                  name='title'
                  type='text'
                  value={title}
                  onChange={this.handleChange}
                />

                <p>
                  By {user.firstName} {user.lastName}
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
              Create Course
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
    const { title, description, estimatedTime, materialsNeeded } = this.state;
    const userId = context.authenticatedUser.id;
    const { emailAddress } = context.authenticatedUser;
    const { password } = context.authenticatedUser;

    // Create course
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    context.data
      .createCourse(course, emailAddress, password)
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

export default CreateCourse;
