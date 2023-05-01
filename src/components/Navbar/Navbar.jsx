import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css'

function BasicExample() {
  return (
    <Navbar id='navbar' bg="light" expand="lg">
      <Container>
        <img width={"50px"} height={"50px"} src="https://static.vecteezy.com/system/resources/previews/009/161/399/non_2x/mxt-letter-logo-design-with-polygon-shape-mxt-polygon-and-cube-shape-logo-design-mxt-hexagon-logo-template-white-and-black-colors-mxt-monogram-business-and-real-estate-logo-vector.jpg" alt="" srcset="" />
        <Navbar.Brand href="/"><i><b>MedicXTrans</b></i></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto" >
            <Nav.Link className='navBtn' href="home">Home</Nav.Link>
            <Nav.Link className='navBtn' href="transcript">Transcript</Nav.Link>
            <Nav.Link className='navBtn' href="aboutUs">About Us</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;