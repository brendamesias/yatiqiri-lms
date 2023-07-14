import React from "react";
import { signInWithGoogle } from "./Services/auth";
import { Outlet } from "react-router-dom";
import { LoginContainer } from "./styles";
import {useNavigate} from 'react-router-dom';
import logo from '../../../assets/images/logos/logo-blanco.png'
import fondoDesktop from '../../../assets/images/logos/fondo-yatiqiri-desktop.png'
import fondoMobile from '../../../assets/images/logos/fondo-yatiqiri-mobile.png'
import { GoogleOutlined } from '@ant-design/icons';
import { Button } from "antd";

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
            <LoginContainer className="flex flex-col" imageMobile={fondoMobile} imageDesktop={fondoDesktop}>
                <p className="text-yellow-400 text-xl font-semibold w-80 text-center z-20">Integramos tecnología a tu pasión para transformar tu futuro</p>
                <img className="w-24 brightness-125 absolute top-7 left-8" src={logo} alt="logo-yatiqiri"/>
                <Button ghost onClick={singnIn} className="flex items-center text-base p-6 mt-6">
                    Iniciar sesión con google
                    <GoogleOutlined className="ml-2"/>
                </Button>
            </LoginContainer>
        }
        <Outlet />
    </>
    )
}

export default Login;