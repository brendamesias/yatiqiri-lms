import React, { useState } from 'react';
import {
  RouterProvider
} from "react-router-dom";
import './App.css';
import router from './modules/router';
import UserContext from './modules/UsersConfig/Login/UserContext';

// import CourseList from './modules/CoursesConfig/pages/CourseList';

function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{user, setUser}}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
