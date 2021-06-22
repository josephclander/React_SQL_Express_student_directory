import React from "react";
import { Link } from "react-router-dom";

const UserSignIn = () => {
  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <form>
          <label for="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" value="" />
          <input id="password" name="password" type="password" value="" />
          <button className="button" type="submit">
            Sign In
          </button>
          <button
            className="button button-secondary"
            onclick="event.preventDefault(); location.href='index.html';"
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
};

export default UserSignIn;
