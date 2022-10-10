import {
    createBrowserRouter
} from "react-router-dom";
import CourseList from './CoursesConfig/pages/CourseList';
import Login from './UsersConfig/Login';

const router = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "course-list",
            element: <CourseList />,
        },
]);

export default router;