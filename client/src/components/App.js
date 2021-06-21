import React, { useEffect } from "react";
import Courses from "./Courses";
import Header from "./Header";

function App() {
  useEffect(() => {
    document.title = "Courses";
  });
  return (
    <>
      <Header />
      <Courses />
    </>
  );
}

export default App;
