import React from "react";
import { signInWithGoogle } from "./Services/auth";
import { Outlet } from "react-router-dom";
import { LoginContainer } from "./styles";
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const userSessionStorage = sessionStorage.getItem('user');
    console.log("userSessionStorage", userSessionStorage)
    const navigate = useNavigate();

    const singnIn = async () => {
        const usersingnIn = await signInWithGoogle();
        if (Object.values(usersingnIn).length > 0){
            navigate("/course-list");
        }
    }

    return(
        <>
        {!userSessionStorage &&
            <LoginContainer>
                <button onClick={singnIn} className="p-3 bg-yellow-200">Login with Google</button>
            </LoginContainer>
        }
        <Outlet />
    </>
    )
}

export default Login;