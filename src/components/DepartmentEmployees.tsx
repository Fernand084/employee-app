import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Employee } from '../models/EmployeeModel';
import type { ApiResponse } from '../models/ApiResponseModel';
import type { Pageable } from '../models/PageableModel';
import type { Department } from '../models/DepartmentModel'
import axios from 'axios';
import { API_URL } from "../api/config";
import { Col, Container, ListGroup, Pagination, Row } from 'react-bootstrap';


interface Props {
  id: string;
};

const DepartmentEmployees = ({id}:Props) => {
    const [departments,setDepartments] = useState<Department[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [manager, setManager] = useState<Employee[]>([]);
    const [pageable, setPageable] = useState<Pageable | null>(null);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "0", 10);
    const size = parseInt(searchParams.get("size") || "40", 10);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error] = useState<string | null>(null);

    const goToPage = (newPage: number) => {
        navigate(`?page=${newPage}&size=${size}`);
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
                axios
                    .get<Department[]>(`${API_URL}/departments`)
                    .then(res => {
                        setDepartments(Array.isArray(res.data) ? res.data : []);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.log(error);
                        setLoading(false);
                    });
                axios
                    .get<ApiResponse>(`${API_URL}/departments/${id}/manager`)
                    .then(res => {
                        setManager(Array.isArray(res.data.content) ? res.data.content : []);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.log(error);
                        setLoading(false);
                    })
                const res = await axios.get<ApiResponse>(`${API_URL}/departments/${id}/employees`,{
                    params: { page, size },
                });
                setEmployees(Array.isArray(res.data.content) ? res.data.content : []);
                setLoading(false);
                setPageable(res.data.pageable);
                setTotalElements(res.data.totalElements);
                setTotalPages(res.data.totalPages);

                
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id, page, size]);


        if(loading) return <p>Loading...</p>
        if(error) return <p>{error}</p>

    

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
        <Container>
            <Row className="justify-content-center">
                <Col xl={10}>
                    {/* Header */}
                    <div className="card shadow-lg border-0 rounded-4 mb-5 overflow-hidden">
                        {/* Banner */}
                        <div className="bg-primary bg-gradient text-white p-5">
                            <div className="d-flex align-items-center">
                                <div className="bg-white bg-opacity-25 rounded-circle p-3 me-4">
                                    <i className="bi bi-building fs-1 text-white"></i>
                                </div>
                                <div>
                                    <h1 className="display-5 fw-bold mb-2">
                                        {departments.find((d) => d.id == id)?.deptName}
                                    </h1>
                                    <p className="fs-5 opacity-90 mb-0">Department Overview</p>
                                </div>
                            </div>
                        </div>

                        {/* Manager Section */}
                        <div className="bg-white p-4">
                            <div className="d-flex align-items-center">
                                <div className="bg-success bg-opacity-10 rounded-circle p-3 me-4">
                                    <i className="bi bi-person-badge text-success fs-3"></i>
                                </div>
                                <div>
                                    <h6 className="text-muted mb-1 text-uppercase fw-semibold">
                                        <i className="bi bi-crown-fill text-warning me-1"></i>
                                        Department Manager
                                    </h6>
                                    <a 
                                        href={`/employees/${manager.at(0)?.id}`} 
                                        className="text-decoration-none"
                                    >
                                        <h4 className="text-primary fw-bold mb-0">
                                            {manager.at(0)?.firstName} {manager.at(0)?.lastName}
                                            <i className="bi bi-arrow-right ms-2 fs-6"></i>
                                        </h4>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls Section */}
                    <div className="card shadow-sm border-0 rounded-4 mb-4">
                        <div className="card-body p-4">
                            <Row className="align-items-center">
                                <Col md={6}>
                                    <h5 className="fw-bold text-primary mb-0">
                                        <i className="bi bi-people-fill me-2"></i>
                                        Team Members
                                    </h5>
                                    <p className="text-muted mb-0 small">
                                        Showing {employees.length} employees
                                    </p>
                                </Col>
                                <Col md={6} className="text-md-end">
                                    {/* Search Bar (not working) */}
                                    <div className="input-group" style={{maxWidth: '300px', marginLeft: 'auto'}}>
                                        <span className="input-group-text bg-light border-end-0">
                                            <i className="bi bi-search text-muted"></i>
                                        </span>
                                        <input 
                                            type="text" 
                                            className="form-control border-start-0 bg-light" 
                                            placeholder="Search employees..."
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    {/* Pagination Top */}
                    <div className="d-flex justify-content-center mb-4">
                        <div className="card shadow-sm border-0 rounded-pill px-2">
                            <div className="card-body py-2 px-3">
                                {pagination()}
                            </div>
                        </div>
                    </div>

                    {/* Employee Cards */}
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                        <div className="list-group list-group-flush">
                            {employees.map((Employee, index) => (
                                <div key={Employee.id} className="list-group-item border-0 py-4">
                                    <Row className="align-items-center">
                                        <Col xs="auto">
                                            {/* Avatar con iniciales */}
                                            <div 
                                                className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                                                style={{width: '60px', height: '60px'}}
                                            >
                                                <span className="fs-5">
                                                    {Employee.firstName?.charAt(0)}{Employee.lastName?.charAt(0)}
                                                </span>
                                            </div>
                                        </Col>
                                        <Col>
                                            <a 
                                                href={`/employees/${Employee.id}`}
                                                className="text-decoration-none"
                                            >
                                                <h5 className="text-primary fw-bold mb-1">
                                                    {Employee.firstName} {Employee.lastName}
                                                </h5>
                                            </a>
                                            <div className="d-flex align-items-center text-muted">
                                                <i className="bi bi-calendar3 me-1"></i>
                                                <small>
                                                    Hire Date: <span className="fw-semibold">
                                                        {Employee.hireDate ? 
                                                            `${Employee.hireDate[2]}/${Employee.hireDate[1]}/${Employee.hireDate[0]}` 
                                                            : 'Not specified'
                                                        }
                                                    </span>
                                                </small>
                                            </div>
                                            
                                            {/* Badge de antigüedad */}
                                            {Employee.hireDate && (
                                                <div className="mt-2">
                                                    <span className="badge bg-info bg-opacity-15 text-info rounded-pill">
                                                        <i className="bi bi-clock me-1"></i>
                                                        {new Date().getFullYear() - Employee.hireDate[0]} years
                                                    </span>
                                                </div>
                                            )}
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination Bottom */}
                    <div className="d-flex justify-content-center mt-4">
                        <div className="card shadow-sm border-0 rounded-pill px-2">
                            <div className="card-body py-2 px-3">
                                {pagination()}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </Container>
  )
}

export default DepartmentEmployees
