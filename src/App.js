import React, { useState, useEffect } from 'react';
import './App.css';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { uploadFileToSesion, createNewSessionInBD } from './modules/SesionsConfig/Services/SesionsServices';
import {db} from './firebase'
import { collection, getDocs } from "firebase/firestore";
import {ContainerUpload} from "./styles";
import Router from './modules/router';
import UserContext from './modules/UsersConfig/Login/UserContext';
import {
  RouterProvider
} from "react-router-dom";
import router from './modules/router';

// import CourseList from './modules/CoursesConfig/pages/CourseList';

function App() {
  const [courseList, setCoursesList] = useState([]);
  const [user, setUser] = useState({});


  // const sendNewSesion = async() => {
  //   const courseId = courseList[0].id;
  //   const payload = {title: 'router', description: 'sesion donde revisaremos las rutas privadas y publicas' };
  //   createNewSessionInBD(courseId, payload);
  // }

  // const UploadFileInSesion = async(doc) => {
  //   const courseDocName = courseList[0].title;
  //   uploadFileToSesion(courseDocName, 'jest', doc);
  // };

  return (
    <UserContext.Provider value={{user, setUser}}>
      <RouterProvider router={router} />
    </UserContext.Provider>
    // <div className="App flex flex-col">
    //     <ContainerUpload theme={'asdfg'} name={"brenda"} className='p-8 w-80 mx-auto my-8 flex flex-col shadow-xl	'>
    //       <span className='font-semibold	mb-6'>Subir nuevo archivo para sesión</span>
    //       <Upload  name= 'file' onChange={UploadFileInSesion} >
    //         <Button icon={<UploadOutlined />}>Click to Upload</Button>
    //       </Upload>
    //     </ContainerUpload>
      
    //     <div>
    //       <h1>send todo</h1>
    //         <button onClick={sendNewSesion}>click here to send</button>
    //     </div>
        
    //     <br></br>
    //     <br></br>
    //     <span>Lista de cursos</span>
    //     /* { courseList.map(course => (
    //       <div 
    //         onClick={() => openCourseForm(course)}
    //         key={course.id}
    //       > 
    //         {course.title}
    //       </div>
    //     ))}
    //     {
    //       courseList.length > 0 && 
    //       <CourseList courseList={courseList}/>
    //     }
    // </div> */
  );
}

export default App;
