// import { NavbarText } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function TopMenu() {
  return (
    <>
        <Navbar bg="dark" expand='sm' variant="dark" className='navbar-nav d-flex flex-row'>
            <Container>
                <Navbar.Brand>ЧПУ производство</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me">
                      <Nav.Link href="/">О компании</Nav.Link>
                      <Nav.Link href="/services">Услуги</Nav.Link>
                      <Nav.Link href="/contacts">Контакты</Nav.Link>
                      <Nav.Link href="/cart">Корзина</Nav.Link>
                      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                          Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                          Separated link
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  );
}