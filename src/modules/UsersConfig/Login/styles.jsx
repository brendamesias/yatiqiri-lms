import styled from 'styled-components'

export const LoginContainer = styled.div`
    background-image: url(${(props) => (props.imageDesktop)});
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    >button{
        background-color: #ab5675;
        color: #ffff;
        font-weight: 600;
        border-radius: 10px;
    }

    &:before {
        content:'';
	    position: absolute;
        top: 0;
	    bottom: 0;
	    left: 0;
	    right: 0;
        background-color: rgba(0,0,0,0.45);
    }
`