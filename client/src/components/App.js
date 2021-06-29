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
import PrivateRoute from '../PrivateRoute';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);

function App() {
  return (
    <Router>
      <>
        <HeaderWithContext />
        <Switch>
          <Route exact path='/' component={Courses} />
          <PrivateRoute
            path='/courses/create'
            component={CreateCourseWithContext}
          />
          <PrivateRoute
            path='/courses/:id/update'
            component={UpdateCourseWithContext}
          />
          <Route path='/courses/:id' component={CourseDetailWithContext} />
          <Route path='/signup' component={UserSignUpWithContext} />
          <Route path='/signin' component={UserSignInWithContext} />
          <Route path='/signout' component={UserSignOutWithContext} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
