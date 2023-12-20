import { useNavigate } from 'react-router-dom';

export function Redirecter() {
    const navigate = useNavigate();
    navigate("/services");
    return (<></>);
}

// import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate();
// navigate('/home');