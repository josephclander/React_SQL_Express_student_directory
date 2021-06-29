import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorsDisplay from './ErrorsDisplay';

class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  };

  componentDidMount() {
    document.title = `User Sign In`;
  }

  render() {
    const { emailAddress, password, errors } = this.state;

    return (
      <main>
        <div className='form--centered'>
          <h2>Sign In</h2>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={this.handleSubmit}>
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
              id='password'
              name='password'
              type='password'
              value={password}
              onChange={this.handleChange}
            />
            <button className='button' type='submit'>
              Sign In
            </button>
            <button
              className='button button-secondary'
              onClick={this.handleCancel}>
              Cancel
            </button>
          </form>
          <p>
            Don't have a user account? Click here to{' '}
            <Link to='signup'>sign up</Link>!
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
    const { from } = this.props.location.state || {
      from: { pathname: '/' },
      // no acceptance criteria for default path so I have chosen the home page
    };
    const { emailAddress, password } = this.state;

    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: ['Sign-in was unsuccessful'] };
          });
        } else {
          this.props.history.push(from);
        }
      })
      .catch((error) => {
        console.error(error);
        this.props.history.push('/error');
      });
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.props.history.push('/');
  };
}

export default UserSignIn;
