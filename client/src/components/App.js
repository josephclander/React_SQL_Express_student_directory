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
import NotFound from './NotFound';
import Forbidden from './Forbidden';
import UnhandledError from './UnhandledError';

import withContext from '../Context';
// these paths will require authentication
import PrivateRoute from '../PrivateRoute';

// Add access to context to the following routes
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);

function App() {
  return (
    <Router>
      <>
        <HeaderWithContext />
        <Switch>
          <Route exact path='/' component={CoursesWithContext} />
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
          <Route path='/forbidden' component={Forbidden} />
          <Route path='/error' component={UnhandledError} />
          <Route path='/notfound' component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
