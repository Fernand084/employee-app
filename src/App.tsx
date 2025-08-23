// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
        <Navbar className="bg-body-tertiary">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link> 
            <Nav.Link href="/about">About</Nav.Link> 
            <Nav.Link href="/users">Users</Nav.Link> 
            <Nav.Link href="/employees">Employees</Nav.Link> 
            <Nav.Link href="/departments">Departments</Nav.Link>
          </Nav>
        </Navbar>

        <Routes>
          <Route path = "/" element={<Home />} />
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
