import React, { useEffect, useState } from 'react'
import type { Employee } from '../models/EmployeeModel'
import axios from 'axios'
import type { Title } from '../models/TitleModel';
import type { Salary } from '../models/SalaryModel';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api/config';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { formatCurrency } from './Utils';

interface Props {
  id: number;
};

const EmployeeDetails = ({id}:Props) => {
    const [employee, setEmployee] = useState<Employee>();
    const [titles, setTitles] = useState<Title[] | null>();
    const [salary, setSalary] = useState<Salary | null>();
    const [salaries, setSalaries] = useState<Salary[] | null>();
    const [hireDate,setHireDate] = useState<number[]>();
    const [fromDate, setFromDate] = useState<number[]>();
    const [toDate, setToDate] = useState<number[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    
    useEffect(() => {
        axios
          .get<Employee>(`${API_URL}/employees/${id}`)
          .then(res => {
            setEmployee(res.data);
            setHireDate(res.data.hireDate);
            setLoading(false);
          })
          .catch(err => {
            console.log('Something went wrong');
            setLoading(false);
          });

        axios
          .get<Salary>(`${API_URL}/employees/${id}/salary`)
          .then(res => {
            setSalary(res.data);
            setFromDate(res.data.fromDate);
            setToDate(res.data.toDate);
            setLoading(false);
          })
          .catch(err => {
            console.log('Something went wrong');
            setLoading(false);
          });

          axios
          .get<Salary[]>(`${API_URL}/employees/${id}/salaries`)
          .then(res => {
            setSalaries(res.data);
            setFromDate(salary?.fromDate);
            setToDate(salary?.toDate);
            setLoading(false);
          })
          .catch(err => {
            console.log('Something went wrong');
            setLoading(false);
          });

          axios
          .get<Title[]>(`${API_URL}/employees/${id}/titles`)
          .then(res => {
            setTitles(res.data);
            setFromDate(salary?.fromDate);
            setToDate(salary?.toDate);
            setLoading(false);
          })
          .catch(err => {
            console.log('Something went wrong');
            setLoading(false);
          });
    }, [id]);

    if (loading) return <p>Loading employee data....</p>
    if(!employee?.id) return <p>Employee {id} does not exists</p> 

    return (
      <Container>
        <Row>
          <h2>{employee.id}</h2>
          <br />
        </Row>
        <Row>
          <Col>
            <p>Name: {employee.firstName}&nbsp;{employee.lastName}</p>
            <p>Hire date:&nbsp;{hireDate ? `${hireDate[2]}/${hireDate[1]}/${hireDate[0]}` : '--'}</p>
            <p>Salary: {formatCurrency(salary?.amount)}</p>
            
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Titles</h3>
            <br />
            <ListGroup>
              {titles && titles.map(t => (
                <ListGroup.Item key={t.title.length}>Position: {t.title}&nbsp;|&nbsp;
                From: {t.fromDate[2]}/{t.fromDate[1]}/{t.fromDate[0]} &nbsp;|&nbsp;
                To: {t.toDate[2]}/{t.toDate[1]}/{t.toDate[0]}</ListGroup.Item>
              ))}
            </ListGroup>
            <br />
            <Button onClick={() => navigate(-1)}>⬅ Back</Button>
          </Col>
        </Row>
        
      </Container>
    );
}

export default EmployeeDetails
