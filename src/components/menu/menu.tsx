import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { Button } from 'react-bootstrap';
import { logout } from '../../modules/auth';
import { setStoreEmail, setIsLogin } from '../state/user/user';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCart } from '../../modules/order';

export default function TopMenu() {
  const isLogin = useSelector((state: RootState) => state.user.isLogin)
  const name = useSelector((state: RootState) => state.user.name)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(0)

  const getLogout = async() => {
    try {
      await logout(); 
      dispatch(setStoreEmail("guest"))
      dispatch(setIsLogin(false))
      navigate("/services");
    } catch (error) {
      console.log("Error:", error)
    }
  }

  const cart = async () => {
    const resp = await getCart()
    setOrderId(resp[0].id)
  }

  useEffect(()=>{
    cart()
    console.log(orderId)
  }, [])

  return (
    <>
        <Navbar bg="dark" expand='sm' variant="dark" className='navbar-nav d-flex flex-row'>
            <Container>
                <Navbar.Brand>ЧПУ производство</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me">
                      <Link to="/" style={{color: 'white', textDecoration: 'underline', margin: "10px"}}>О компании</Link>
                      <Link to="/services" style={{color: 'white', textDecoration: 'underline', margin: "10px"}}>Услуги</Link>
                      {/* <Nav.Link href="/contacts">Контакты</Nav.Link> */}
                      {isLogin && <Link to={"/orders/"+orderId} style={{color: 'white', textDecoration: 'underline', margin: "10px"}}>Текущий заказ</Link>}
                      {isLogin && <Link to="/orders" style={{color: 'white', textDecoration: 'underline', margin: "10px"}}>Заказы</Link>}
                      <Link to="/user" style={{color: 'white', textDecoration: 'underline', margin: "10px"}}>{name}</Link>
                      {isLogin &&
                        <Button onClick={getLogout}>Выйти</Button>
                      }
                      {!isLogin && 
                        <Link to="/login" style={{color: 'white', textDecoration: 'underline', margin: "10px"}}><Button>Войти</Button></Link>
                      }
                      {!isLogin && 
                        <Link to="/signup" style={{color: 'white', textDecoration: 'underline', margin: "10px"}}><Button>Регистрация</Button></Link>
                      }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  );
}