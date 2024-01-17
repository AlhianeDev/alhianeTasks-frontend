import { Navbar, Container, Nav } from "react-bootstrap";

import { NavLink } from "react-router-dom";

const Header = () => {

  return (

    <Navbar bg="dark" data-bs-theme="dark">

        <Container>

            <Navbar.Brand href="#home" style={{ 
                
                fontWeight: "600",
                
                letterSpacing: "1px"
                
            }}> AlhianeTasks </Navbar.Brand>

          <Nav className="me-left">

            <Nav.Link to="/" as={ NavLink }>Home</Nav.Link>

            <Nav.Link to="/about" as={ NavLink }>About</Nav.Link>

            <Nav.Link to="/contact" as={ NavLink }>Contact</Nav.Link>

          </Nav>

        </Container>

    </Navbar>

  );

}

export default Header;
