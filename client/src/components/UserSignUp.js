import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorsDisplay from './ErrorsDisplay';

class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    passwordFirst: '',
    password: '',
    errors: [],
  };
  // 'passwordFirst' & 'password' naming created because
  // 'password' is a requirement named parameter

  componentDidMount() {
    document.title = `User Sign Up`;
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      passwordFirst,
      password,
      errors,
    } = this.state;

    return (
      <main>
        <div className='form--centered'>
          <h2>Sign Up</h2>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='firstName'>First Name</label>
            <input
              id='firstName'
              name='firstName'
              type='text'
              value={firstName}
              onChange={this.handleChange}
            />
            <label htmlFor='lastName'>Last Name</label>
            <input
              id='lastName'
              name='lastName'
              type='text'
              value={lastName}
              onChange={this.handleChange}
            />
            <label htmlFor='emailAddress'>Email Address</label>
            <input
              id='emailAddress'
              name='emailAddress'
              type='email'
              value={emailAddress}
              onChange={this.handleChange}
            />
            <label htmlFor='password'>Password</label>
            <input
              id='passwordFirst'
              name='passwordFirst'
              type='password'
              value={passwordFirst}
              onChange={this.handleChange}
            />
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              id='password'
              name='password'
              type='password'
              value={password}
              onChange={this.handleChange}
            />
            <button className='button' type='submit'>
              Sign Up
            </button>
            <button
              className='button button-secondary'
              onClick={this.handleCancel}>
              Cancel
            </button>
          </form>
          <p>
            Already have a user account? Click here to{' '}
            <Link to='signin'>sign in</Link>!
          </p>
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
    const { firstName, lastName, emailAddress, passwordFirst, password } =
      this.state;

    // Create user
    const user = {
      firstName,
      lastName,
      emailAddress,
      passwordFirst,
      password,
    };

    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          this.setState(() => {
            return { errors };
          });
        } else {
          context.actions.signIn(emailAddress, password).then(() => {
            // no acceptance criteria on basic happy path so send to home page as a default
            this.props.history.push('/');
          });
        }
      })
      .catch((err) => {
        console.error(err);
        this.props.history.push('/error');
      });
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.props.history.push('/');
  };
}

export default UserSignUp;
