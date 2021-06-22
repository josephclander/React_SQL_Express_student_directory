import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Courses from "./Courses";
import CreateCourse from "./CreateCourse";
import UpdateCourse from "./UpdateCourse";
import CourseDetail from "./CourseDetail";
import UserSignIn from "./UserSignIn";
import UserSignUp from "./UserSignUp";
import UserSignOut from "./UserSignOut";
import Header from "./Header";

function App() {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route path="/courses/create" component={CreateCourse} />
          <Route path="/courses/:id/update" component={UpdateCourse} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signout" component={UserSignOut} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
