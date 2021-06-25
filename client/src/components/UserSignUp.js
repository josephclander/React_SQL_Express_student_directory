import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmedPassword: "",
    errors: [],
  };

  render() {
    const { firstName, lastName, username, password, confirmedPassword } =
      this.state;

    return (
      <main>
        <div className="form--centered">
          <h2>Sign Up</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={this.handleChange}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={this.handleChange}
            />
            <label htmlFor="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={username}
              onChange={this.handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmedPassword}
              onChange={this.handleChange}
            />
            <button className="button" type="submit">
              Sign Up
            </button>
            <button
              className="button button-secondary"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
          </form>
          <p>
            Already have a user account? Click here to{" "}
            <Link to="signin">sign in</Link>!
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
    const { firstName, lastName, username, password } = this.state;

    // Create user
    const user = {
      firstName,
      lastName,
      username,
      password,
    };

    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          context.actions.signIn(username, password).then(() => {
            this.props.history.push("/authenticated");
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.props.history.push("/");
  };
}

export default UserSignUp;
