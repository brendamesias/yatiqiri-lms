import {
    Route,
    createBrowserRouter, createRoutesFromElements
} from "react-router-dom";
import CourseList from './CoursesConfig/pages/CourseList';
import Login from './UsersConfig/Login';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Login />}>
            <Route
                path="course-list"
                element={<CourseList />}
            />
        </Route>
    ) );

export default router;