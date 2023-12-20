import { useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { EnvelopeFill, LockFill } from 'react-bootstrap-icons';
import { login } from '../../modules/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import { setId, setIsLogin, setStoreEmail } from '../state/user/user';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch<AppDispatch>()
  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await login(email, password); 
      dispatch(setStoreEmail(response?.email))
      dispatch(setIsLogin(true))
      dispatch(setId(response?.id))
      navigate("/services");

    } catch (error) {
      // alert('Error:' + error);
      alert("Неверный пароль или логин!")
      setLoginError(true);
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
      <Form onSubmit={handleLogin} style={{ width: "300px", padding: "20px", borderRadius: "8px", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)" }}>
        <Form.Group controlId="formBasicEmail" className="mb-3">
          <InputGroup>
            <InputGroup.Text><EnvelopeFill /></InputGroup.Text>
            <FormControl
              type="email"
              placeholder="Логин"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={loginError}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            Неправильный пароль или логин
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mb-3">
          <InputGroup>
            <InputGroup.Text><LockFill /></InputGroup.Text>
            <FormControl
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={loginError}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            Неправильный пароль или логин
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" style={{ width: "100%" }}>
          Войти
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;