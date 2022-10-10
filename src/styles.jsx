import styled from 'styled-components'

export const ContainerUpload = styled.div`
    background-color: ${props => (props.theme === "dark" ? `black` : `white`)};
    text-color: ${props => (props.theme !== "dark" ? `black` : `white`)};
    border-radius: 10px;
    border: 2px solid rgb(100 116 139 / var(--tw-bg-opacity));
`;

