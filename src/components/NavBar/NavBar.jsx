import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap';


const NavBar = (props) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
      <Container fluid>
        <div className="d-flex align-items-center w-100">
          <div className="d-flex align-items-center flex-grow-1">
            <Navbar.Brand as={Link} to="/">Souqify</Navbar.Brand>
            {props.user && (
              <Navbar.Text className="ms-3">Welcome {props.user.username}</Navbar.Text>
            )}
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/stores">Stores</Nav.Link>
              {props.user ? (
                <>
                  <Nav.Link as={Link} to="/stores/new">Add Store</Nav.Link>
                  <Nav.Link onClick={props.handleSignOut} as={Link} to="/">Sign Out</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/sign-up">Sign Up</Nav.Link>
                  <Nav.Link as={Link} to="/sign-in">Sign In</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;