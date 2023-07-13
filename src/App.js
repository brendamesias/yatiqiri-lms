import React, { useState } from 'react';
import {
  RouterProvider
} from "react-router-dom";
import './App.css';
import router from './modules/router';

function App() {

  return (
      <RouterProvider router={router} />
  );
}

export default App;
