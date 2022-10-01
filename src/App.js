import './App.css';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { uploadFileToSesion, createNewSessionInBD } from './modules/SesionsConfig/Services/SesionsServices';
import { useEffect, useState } from 'react';
import {db} from './firebase'
import { collection, getDocs } from "firebase/firestore";
import {ContainerUpload} from "./styles";

function App() {
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    if(coursesList.length === 0){
      getCourses();
    }
  }, []);

  const sendNewSesion = async() => {
    const courseId = coursesList[0].id;
    const payload = {title: 'hooks', description: 'sesion donde revisaremos los hools como useEfect, useState, Cusom hooks, etc' };
    createNewSessionInBD(courseId, payload);
  }

  const getCourses = async() => {
    const getCourses = await getDocs(collection(db, "courses"));
    getCourses.forEach((doc) => {
      const docData = doc.data();
      const newDoc = {...docData, id:doc.id};
      const copyOfCourses = [...coursesList, newDoc];
      setCoursesList([...new Set(copyOfCourses)]);
    });  
  }

  const UploadFileInSesion = async(doc) => {
    const courseDocName = coursesList[0].title;
    uploadFileToSesion(courseDocName, 'hooks', doc);
  };

  return (
    <div className="App flex flex-col">
        <ContainerUpload className='bg-slate-500 p-8 w-80 mx-auto my-8 flex flex-col shadow-xl	'>
          <span className='text-white font-semibold	mb-6'>Subir nuevo archivo para sesión</span>
          <Upload  name= 'file' onChange={UploadFileInSesion} >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </ContainerUpload>
      
        <div>
          <h1>send todo</h1>
            <button onClick={sendNewSesion}>click here to send</button>
        </div>
        
        <div className='mt-12'>
          {coursesList.map(course => (
            <div key={course.id}>{course.title}</div>
          ))}
        </div>
    </div>
  );
}

export default App;
