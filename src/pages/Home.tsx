// src/pages/Home.tsx
import React from 'react';
import Message from '../components/Message';
import { homeContent } from '../content/HomeContent';
import { Link } from 'react-router-dom';
import { Container, ListGroup, Table } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <div>
      <br />
      <Container className='auto'>
        <h1>{homeContent.title}</h1>
        <Message msg={homeContent.text} />

        <p>For this project I've used the following technologies:</p>
        <ListGroup >
          <ListGroup.Item>Spring Boot 3.2 with basic dependencies, jpa, psql driver and lombok</ListGroup.Item>
          <ListGroup.Item>Maven</ListGroup.Item>
          <ListGroup.Item>Java 21</ListGroup.Item>
          <ListGroup.Item>Postgres 16</ListGroup.Item>
          <ListGroup.Item>Docker</ListGroup.Item>
          <ListGroup.Item>React + vite</ListGroup.Item>
          <ListGroup.Item>AWS</ListGroup.Item>
        </ListGroup>
      </Container>
      <br />
      <Container className='auto'>
        <h3>Dev environment</h3>
        <p>
          I’m working on a Windows computer, but I find Windows a bit tedious because of all the configurations you’ve to setup and some potential compatibility problems, 
          so I’ve opted for WSL Linux (Ubuntu) as my development environment which by the way is closer to production.
        </p>
      </Container>

      <Container className='auto'>
        <h3>Docker</h3>
        <p>
          I use Docker because is greatly convenient since I do not have to install software locally, like postgresql, so this app runs locally on a couple of containers, 
          one for the database and one for the java application. Both containers are created through the use of docker-compose and each time I’m working on this project I’d just have to type a single command for it to run. Simply beautiful!
        </p>
      </Container>

      <Container className='auto'>
        <h3>Database</h3>
        <p>
          I started by looking for a testing database I could use with some data already on it so I could try and create some queries that will require more than a few “select” statements on sql. 
          I found this amazing “employees” database with enough records that was perfect for what I’m trying to do:
        </p>
        <Link to="https://github.com/neondatabase-labs/postgres-sample-dbs#employees-database">neondatabase-labs/employee-database</Link>
      </Container>
      <br />
      <Container className='auto'>
        <p>Here are the table names and fields it contains:</p>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>table_name</th>
              <th>column_name</th>
              <th>data_type</th>
              <th>is_nullable</th>
            </tr>
          </thead>
          
          <tbody>
            <tr>
              <td>department</td>
              <td>id</td>
              <td>character</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>department</td>
              <td>dept_name</td>
              <td>character varying</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>department_employee</td>
              <td>employee_id</td>
              <td>bigint</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>department_employee</td>
              <td>department_id</td>
              <td>characther</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>department_employee</td>
              <td>from_date</td>
              <td>date</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>department_employee</td>
              <td>to_date</td>
              <td>date</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>department_manager</td>
              <td>employee_id</td>
              <td>bigint</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>department_manager</td>
              <td>department_id</td>
              <td>character</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>department_manager</td>
              <td>from_date</td>
              <td>date</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>department_manager</td>
              <td>to_date</td>
              <td>date</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>employee</td>
              <td>id</td>
              <td>bigint</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>employee</td>
              <td>birth_date</td>
              <td>date</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>employee</td>
              <td>first_name</td>
              <td>character varying</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>employee</td>
              <td>last_name</td>
              <td>character varying</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>employee</td>
              <td>gender</td>
              <td>USER-DEFINED</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>employee</td>
              <td>hire_date</td>
              <td>date</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>salary</td>
              <td>employee_id</td>
              <td>bigint</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>salary</td>
              <td>amount</td>
              <td>bigint</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>salary</td>
              <td>from_date</td>
              <td>date</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>salary</td>
              <td>to_date</td>
              <td>date</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>title</td>
              <td>employee_id</td>
              <td>bigint</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>title</td>
              <td>title</td>
              <td>character varying</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>title</td>
              <td>from_date</td>
              <td>date</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>title</td>
              <td>to_date</td>
              <td>date</td>
              <td>NO</td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <Container className='auto'>
        <h3>Endpoints</h3>
        <p>
          Since I’m going to host this on AWS using the free-tier plan for now, 
          I decided to leave out the POST and DELETE requests for all this endpoints and I’ve make the api as read-only. 
        </p>
        <p>Here are the functions grouped by identity:</p>
        <br />
        <h5>Employees</h5>
        <p>GET</p>
        <ListGroup>
          <ListGroup.Item>/employees – list all employees</ListGroup.Item>
          <ListGroup.Item>/employeea/id – bring the details from a particular employee</ListGroup.Item>
          <ListGroup.Item>/employees/id/salary – salary history for a particular employee</ListGroup.Item>
          <ListGroup.Item>/employees/id/titles – title history for a particular employee</ListGroup.Item>
        </ListGroup>
        <br />
        <h5>Departments</h5>
        <p>GET</p>
        <ListGroup>
          <ListGroup.Item>/departments – list all departments</ListGroup.Item>
          <ListGroup.Item>/departments/id/employees – list all active employees for a specific department</ListGroup.Item>
          <ListGroup.Item>/departments/id/managers – history of managers by department</ListGroup.Item>
        </ListGroup>
        <br />
        <h5>Salaries</h5>
        <p>GET</p>
        <ListGroup>
          <ListGroup.Item>/salaries/highest – top 10 employees with best salary</ListGroup.Item>
          <ListGroup.Item>/salaries/average-by-department – average salary by department</ListGroup.Item>
        </ListGroup>
        <br />
        <h5>Statistics</h5>
        <p>GET</p>
        <ListGroup>
          <ListGroup.Item>/stats/employees-per-department – quantification of employees by department</ListGroup.Item>
          <ListGroup.Item>/stats/gender-distribution – gender distribution by department</ListGroup.Item>
          <ListGroup.Item>/stats/title-history – evolution of common titles throughout the company</ListGroup.Item>
        </ListGroup>
        <br />
      </Container>
    </div>
  );
};

export default Home;
