import { useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { EnvelopeFill, LockFill } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { setIsLogin, setEmail, setId, setTag, setName } from '../state/user/user';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch<AppDispatch>()
  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); 
    try {
      // const response = await login(email, password); 
      const { data } = await api.login.loginCreate({ email: formEmail, password: formPassword },
         {
          withCredentials: true,
         })
      dispatch(setId(Number(data.id)))
      dispatch(setTag(String(data.tags)))
      dispatch(setName(String(data.name)))
      dispatch(setEmail(String(data.email)))
      dispatch(setIsLogin(true))
      navigate("/services")
    } catch (error) {
      if (String(error).includes('40')) {
        alert("Неверный пароль или логин!")
      } else {
        alert("Ошибка на стороне сервера, повторите попытку позже")
      }
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
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
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
              value={formPassword}
              onChange={(e) => setFormPassword(e.target.value)}
              isInvalid={loginError}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            Неправильный пароль или логин
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="success" type="submit" style={{ width: "100%" }}>
          Войти
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;