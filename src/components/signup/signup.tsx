import { useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { EnvelopeFill, LockFill, PersonFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { signup } from "../../modules/auth";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const handleSignup = async (e) => {
      e.preventDefault(); 
      try {
        const response = await signup(email, name, password); 
        // dispatch(setStoreEmail(response?.email))
        console.log("got signup", response)
        // await createNewOrder(response?.id)
        alert("Вы успешно зарегистрировались, вы можете теперь зайти в аккаунт с заданной почтой и паролем")
        navigate("/login");
        
      } catch (error) {
        // alert('Error:' + error);
        if (String(error).includes('400')) {
            alert("Пользователь с такой почтой уже существует!")
        } else {
            alert("Ошибка на стороне сервера, повторите попытку позже")
        }
        setLoginError(true);
      }
    };
  
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <Form onSubmit={handleSignup} style={{ width: "300px", padding: "20px", borderRadius: "8px", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)" }}>
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
          </Form.Group>

          <Form.Group controlId="formBasicName" className="mb-3">
            <InputGroup>
              <InputGroup.Text><PersonFill /></InputGroup.Text>
              <FormControl
                // type="password"
                placeholder="ФИО"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={loginError}
              />
            </InputGroup>
          </Form.Group>
  
          <Form.Group controlId="formBasicPassword" className="mb-3">
            <InputGroup>
              <InputGroup.Text><LockFill /></InputGroup.Text>
              <FormControl
                // type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={loginError}
              />
            </InputGroup>
          </Form.Group>
          
  
          <Button variant="primary" type="submit" style={{ width: "100%" }}>
            Зарегистрироваться
          </Button>
        </Form>
      </div>
    );
  };
  
  export default SignupForm;