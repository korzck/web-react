import './HeadingSection.css'; 
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function About() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/services")
  })
  return (
    <></>
  );
}