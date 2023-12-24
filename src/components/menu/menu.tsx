import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { Button } from 'react-bootstrap';
import { setEmail, setId, setIsLogin, setName, setTag } from '../state/user/user';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api';

export default function TopMenu() {
  const isLogin = useSelector((state: RootState) => state.user.isLogin)
  const name = useSelector((state: RootState) => state.user.name)
  const tag = useSelector((state: RootState) => state.user.tag)
  const orderId = useSelector((state: RootState) => state.user.order)

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();

  const getLogout = async() => {
    await api.logout.logoutCreate({withCredentials: true})
    dispatch(setId(0))
    dispatch(setTag(""))
    dispatch(setName("guest"))
    dispatch(setEmail("guest"))
    dispatch(setIsLogin(false))
    navigate("/services")
  }

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
                      {isLogin && tag != "admin" && <Link to="/orders" style={{color: 'white', textDecoration: 'underline', margin: "10px"}}>Мои заказы</Link>}
                      {isLogin && tag == "admin" && <Link to="/orders" style={{color: 'white', textDecoration: 'underline', margin: "10px"}}>Заказы</Link>}
                      {isLogin && tag == "admin" && <Link to="/services/admin" style={{color: 'white', textDecoration: 'underline', margin: "10px"}}>Редактировать услуги</Link>}
                      {/* {isLogin && tag == "admin" && <Link to="/admin/orders" style={{color: 'white', textDecoration: 'underline', margin: "10px"}}>Редактировать заказы</Link>} */}

                      {isLogin && <div style={{color: 'white', textDecoration: 'underline', margin: "10px"}}>{name}</div>}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse>
                  {isLogin && orderId != 0 && <Link to={"/orders/"+orderId} style={{color: 'white', textDecoration: 'underline', margin: "10px"}}>Текущий заказ</Link>}
                </Navbar.Collapse>
                <Navbar>
                      {isLogin &&
                        <Button variant='outline-success' onClick={getLogout}>Выйти</Button>
                      }
                      {!isLogin && 
                        <Link to="/login" style={{color: 'white', textDecoration: 'underline', margin: "10px"}}><Button variant='success'>Войти</Button></Link>
                      }
                      {!isLogin && 
                        <Link to="/signup" style={{color: 'white', textDecoration: 'underline', margin: "10px"}}><Button variant='outline-success'>Регистрация</Button></Link>
                      }

                </Navbar>
                
            </Container>
        </Navbar>
    </>
  );
}