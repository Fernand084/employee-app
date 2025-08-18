import React, { useEffect, useState } from 'react'
import type { Department } from '../models/DepartmentModel'
import axios from 'axios'
import { API_URL } from '../api/config';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';

const Departments = () => {

    const [departments,setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const fetchDepartments = async () => {
            try {
                const res = await axios.get<Department[]>(`${API_URL}/departments`);
                setDepartments(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError
                setLoading(false);
            }
        };
        fetchDepartments();
    },[]);

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>

  return (
    <Container>
        <Row className="justify-content-md-center">
            <Col lg={6}>
                <ListGroup>
                    {departments.map(department => (
                        <a className="page-link" href={`/departments/${department.id}/employees`}>
                            <ListGroup.Item className="page-item" key={department.id}>{department.deptName}</ListGroup.Item>
                        </a>
                    ))}
                </ListGroup>
            </Col>
        </Row>
    </Container>
  )
}

export default Departments
