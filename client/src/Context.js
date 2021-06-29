import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {
  // if an authenticated user exists, persist via a cookie
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
  };

  // import the helper functions for interacting with user and courses routes
  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;
    // provide this information to all components that receive context
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
  // note emailAddress is the 'username'
  // the acceptance criteria states to use 'emailAddress' as the parameter
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      // add the user password to the auth user object on sign in
      user.password = password;
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      // create a cookie for the user to remain signed in for 1 day
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  };

  signOut = () => {
    this.setState(() => {
      return { authenticatedUser: null };
    });
    Cookies.remove('authenticatedUser');
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
