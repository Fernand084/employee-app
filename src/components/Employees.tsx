import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Employee } from '../models/EmployeeModel';
import type { ApiResponse } from '../models/ApiResponseModel';
import type { Pageable } from '../models/PageableModel';
import axios from 'axios';
import { API_URL } from '../api/config';
import { Col, Container, ListGroup, Pagination, Row } from 'react-bootstrap';


const Employees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [pageable, setPageable] = useState<Pageable | null>(null);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "0", 10);
    const size = parseInt(searchParams.get("size") || "40", 10);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const goToPage = (newPage: number) => {
        navigate(`/employees?page=${newPage}&size=${size}`);
    };

    const pagination = () => {
        return(
            <Container>
                <Pagination>
                <Pagination.First onClick={() => goToPage(0)}/>
                <Pagination.Prev onClick={() => goToPage(page - 1)} disabled={page <= 0}/>
                <Pagination.Item active>{page + 1}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item onClick={() => goToPage(totalPages/4)}>{totalPages/4}</Pagination.Item>
                <Pagination.Item onClick={() => goToPage(totalPages/2)}>{totalPages/2}</Pagination.Item>
                <Pagination.Item onClick={() => goToPage((totalPages/4)+totalPages/2)}>{(totalPages/4)+totalPages/2}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item onClick={() => goToPage(totalPages-1)}>{totalPages}</Pagination.Item>
                <Pagination.Next onClick={() => goToPage(page + 1)} disabled={ pageable === null || 
                    pageable.offset + pageable.pageSize >= totalElements}/>
                <Pagination.Last onClick={() => goToPage(totalPages-1)}/>
                </Pagination>
            </Container>
        );
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get<ApiResponse>(`${API_URL}/employees`,{
                    params: { page, size },
                });
                setEmployees(res.data.content);
                setLoading(false);
                setPageable(res.data.pageable);
                setTotalElements(res.data.totalElements);
                setTotalPages(res.data.totalPages);
                
            } catch (error) {
                setError;
                console.error(error);
                
                setLoading(false);
            }
        };

        fetchData();
    }, [page, size]);


        if(loading) return <p>Loading...</p>
        if(error) return <p>{error}</p>

        return (
            <div>
                <br />
                <h2>Employees</h2>
                <br />
                <Container>
                    <Row md="auto" className="justify-content-md-center">
                        <Col >
                            {pagination()}
                        </Col>
                    </Row>
                </Container>
                
                <br/>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col lg={6}>
                            <ListGroup className="pagination">
                                {employees.map(Employee => (
                                <ListGroup.Item className="page-item" key={Employee.id}>
                                    <a className="page-link" href ={`/employees/${Employee.id}`}>
                                        {Employee.firstName}&nbsp;{Employee.lastName}&nbsp;
                                        
                                    </a>
                                    <p>Hire date:&nbsp;{Employee.hireDate ? `${Employee.hireDate[2]}/${Employee.hireDate[1]}/${Employee.hireDate[0]}` : '--'}</p>
                                </ListGroup.Item>
                                    ))}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
                
                <br/>
                <Container>
                    <Row md="auto" className="justify-content-md-center">
                        <Col >
                            {pagination()}
                        </Col>
                    </Row>
                </Container>
                <br/>
            </div>
            
        );
}

export default Employees
