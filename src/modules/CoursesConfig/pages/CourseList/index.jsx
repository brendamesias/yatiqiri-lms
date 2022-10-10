import React, { useState, useEffect } from 'react';
import CourseFormModal from '../CourseForm';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../../../../firebase'

const CourseList = () => {
  const [courseList, setCoursesList] = useState([]);
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


    return (
      <>
        <div className='mt-12'>
            { courseList.map(course => (
              <div 
                onClick={() => openCourseForm(course)}
                key={course.id}
              >
                {course.title}
              </div>
            ))}
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