import React from "react";
import { signInWithGoogle } from "./Services/auth";
import { Navigate } from "react-router-dom";
import UserContext from "./UserContext";
import { LoginContainer } from "./styles";

const Login = () => {

    const {user, setUser} = React.useContext(UserContext); 

    if(Object.values(user).length > 0){
        return (<Navigate to="/course-list" replace={true} />)
    }

    return(
        <LoginContainer>
            <button onClick={() => signInWithGoogle(setUser)} className="p-3 bg-yellow-200">Login with Google</button>
        </LoginContainer>
    )
}

export default Login;