// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Users from './pages/Users';
import Employees_page from './pages/Employees_page';
import EmployeeDetails_page from './pages/EmployeeDetails_page';
import Departments_page from './pages/Departments_page';
import DepartmentEmployees_page from './pages/DepartmentEmployees_page';
import { Container, Nav, Navbar } from 'react-bootstrap';



const App = () => {

  return (
    <Container>
      <Router>

        <Navbar expand="lg" className="navbar-dark bg-primary shadow-sm sticky-top">
          <Container>
              <Navbar.Brand href="/departments" className="fw-bold fs-3">
                  <i className="bi bi-people-fill me-2"></i>
                  EmployeeHub
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse>
                  <Nav className="ms-auto">
                      <Nav.Link href="/" className="fw-semibold px-3 rounded-pill mx-1 hover-bg-light">
                          <i className="bi bi-house-door me-1"></i>Home
                      </Nav.Link>
                      <Nav.Link href="/departments" className="fw-semibold px-3 rounded-pill mx-1">
                          <i className="bi bi-building me-1"></i>Departments
                      </Nav.Link>
                      <Nav.Link href="/about" className="fw-semibold px-3 rounded-pill mx-1">
                          <i className="bi bi-people me-1"></i>About
                      </Nav.Link>
                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>

        <Routes>
          <Route path = "/" element={<Home/>} />
          <Route path = "/about" element={<About />} />
          <Route path = "/users" element={<Users />} />
          <Route path = "/employees" element={<Employees_page />} />
          <Route path = "/departments" element = {<Departments_page/>}/>
          <Route path = "/employees/:id" element = {<EmployeeDetails_page/>}/>
          <Route path = "/employees/:id/salaries" element = {<DepartmentEmployees_page/>}/>
          <Route path = "/departments/:id/employees" element = {<DepartmentEmployees_page/>}/>
          <Route path = "/salary/:id/top-salaries" element = {<DepartmentEmployees_page/>}/>
        </Routes>
      </Router>
    </Container>
    
  );
};

export default App;
