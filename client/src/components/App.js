import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Courses from './Courses';
import CreateCourse from './CreateCourse';
import UpdateCourse from './UpdateCourse';
import CourseDetail from './CourseDetail';
import UserSignIn from './UserSignIn';
import UserSignUp from './UserSignUp';
import UserSignOut from './UserSignOut';
import Header from './Header';

import withContext from '../Context';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

function App() {
  return (
    <Router>
      <>
        <HeaderWithContext />
        <Switch>
          <Route exact path='/' component={Courses} />
          <Route path='/courses/create' component={CreateCourse} />
          <Route path='/courses/:id/update' component={UpdateCourse} />
          <Route path='/courses/:id' component={CourseDetail} />
          <Route path='/signup' component={UserSignUpWithContext} />
          <Route path='/signin' component={UserSignInWithContext} />
          <Route path='/signout' component={UserSignOutWithContext} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
