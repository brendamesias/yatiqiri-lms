import React, { useState, useEffect } from 'react';
import CourseFormModal from '../CourseForm';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../../../../firebase'
import { CourseItem } from './styles';
import {Input, Button} from 'antd';
import { createNewCourseInBD } from '../../services/CourseServices';
import { closeSesion } from '../../../UsersConfig/Login/Services/auth';
import {useNavigate} from 'react-router-dom';

const CourseList = () => {

  const navigate = useNavigate();
  const [courseList, setCoursesList] = useState([]);
  const [newCourseInput, setNewCourseInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOpenedCourse, setCurrentOpenedCourse] = useState({});

  useEffect(() => {
    if(courseList.length === 0){
      getCourses();
    }
  }, []);

  const getCourses = async() => {
    let listOfCourses = [];
    const getCourses = await getDocs(collection(db, "courses"));
    getCourses.forEach((doc) => {
      const docData = doc.data();
      const newDoc = {...docData, id:doc.id};
      listOfCourses = [...listOfCourses, newDoc];
      setCoursesList([...new Set(listOfCourses)]);
    });  
  }

  const openCourseForm = (course) => {
    setCurrentOpenedCourse(course);
    setIsModalOpen(true);
  };

    const createNewCourse = async() => {
    const payload = {title: newCourseInput};
    const responseCreateCourse = await createNewCourseInBD(payload);
    if(responseCreateCourse){
      //pendiente agregar loading
      getCourses();
    }
    setNewCourseInput("");
  }

  const logout = async() => {
    closeSesion().then(()=>{
      navigate("/");
    });
  }

    return (
      <>
        <h2>Lista de cursos</h2>
        <Button onClick={logout}>Cerrar sesion</Button>
        <div className='mt-12 flex flex-col items-center'>
          { courseList.length > 0 ?
            (
              courseList.map(course => (
                <CourseItem 
                  onClick={() => openCourseForm(course)}
                  key={course.id}
                >
                  {course.title}
                </CourseItem>
              ))
            ) : <h3>cargando...</h3>
            }
          <br /><br />
          <div className='block'>
            <Input.Group>
              <Input value={newCourseInput} onChange={(event)=> setNewCourseInput(event.target.value)} style={{ width: '50%' }} />
              <Button onClick={createNewCourse} className="bg-indigo-500 text-white">+ Crear nuevo curso</Button>
            </Input.Group>
          </div>
        </div>
        {
          isModalOpen &&
          <CourseFormModal 
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            currentOpenedCourse={currentOpenedCourse}
            setCurrentOpenedCourse={setCurrentOpenedCourse}
          />
        }
      </>
    );
}

export default CourseList;