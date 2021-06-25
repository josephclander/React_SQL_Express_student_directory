import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserSignIn extends Component {
  state = {
    username: "",
    password: "",
  };

  render() {
    const { username, password } = this.state;

    return (
      <main>
        <div className="form--centered">
          <h2>Sign In</h2>
          <form onSubmit={this.handleSubmit}>
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
            <button className="button" type="submit">
              Sign In
            </button>
            <button
              className="button button-secondary"
              onClick={this.handleCancel}
            >
              Cancel
            </button>
          </form>
          <p>
            Don't have a user account? Click here to{" "}
            <Link to="signup">sign up</Link>!
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
      from: { pathname: "/authenticated" },
    };
    const { username, password } = this.state;

    context.actions
      .signIn(username, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: ["Sign-in was unsuccessful"] };
          });
        } else {
          this.props.history.push(from);
        }
      })
      .catch((error) => {
        console.error(error);
        this.props.history.push("/error");
      });
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.props.history.push("/");
  };
}

export default UserSignIn;
