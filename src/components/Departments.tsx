import { useEffect, useState } from 'react'
import type { Department } from '../models/DepartmentModel'
import axios from 'axios'
import { API_URL } from '../api/config';
import { Col, Container,Row } from 'react-bootstrap';

const Departments = () => {

    const [departments,setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const fetchDepartments = async () => {
            try {
                const res = await axios.get<Department[]>(`${API_URL}/departments`);
                setDepartments(Array.isArray(res.data) ? res.data : []);
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

    <Container fluid className="py-5 bg-light min-vh-100">
        <Container>
            <Row className="justify-content-center">
                <Col xl={8} lg={10}>
                    {/* Header Principal */}
                    <div className="card shadow-lg border-0 rounded-4 mb-5 overflow-hidden">
                        <div className="bg-primary bg-gradient text-white p-5 text-center">
                            <div className="bg-white bg-opacity-25 rounded-circle p-4 d-inline-flex align-items-center justify-content-center mb-4">
                                <i className="bi bi-buildings fs-1 text-white"></i>
                            </div>
                            <h1 className="display-4 fw-bold mb-2">Departments</h1>
                            <p className="fs-5 opacity-90 mb-0">Explore all company departments</p>
                        </div>
                    </div>

                    {/* Stats Header */}
                    <div className="card shadow-sm border-0 rounded-4 mb-4">
                        <div className="card-body p-4">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h5 className="fw-bold text-primary mb-0">
                                        <i className="bi bi-collection me-2"></i>
                                        All Departments
                                    </h5>
                                    <p className="text-muted mb-0 small">
                                        {departments.length} departments available
                                    </p>
                                </div>
                                <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                                    <i className="bi bi-graph-up text-primary fs-4"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Departamentos */}
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                        <div className="list-group list-group-flush">
                            {departments.map((dept, _index) => (
                                <a 
                                    key={dept.id}
                                    href={`/departments/${dept.id}/employees`}
                                    className="text-decoration-none"
                                >
                                    <div className="list-group-item border-0 py-4">
                                        <Row className="align-items-center">
                                            <Col xs="auto">
                                                {/* Icono */}
                                                <div 
                                                    className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                                                    style={{width: '60px', height: '60px'}}
                                                >
                                                    <i className="bi bi-building fs-4"></i>
                                                </div>
                                            </Col>
                                            <Col>
                                                <h5 className="text-primary fw-bold mb-1">
                                                    {dept.deptName}
                                                </h5>
                                                <div className="d-flex align-items-center text-muted">
                                                    <i className="bi bi-people me-1"></i>
                                                    <small>
                                                        View department employees
                                                    </small>
                                                </div>
                                            </Col>
                                            <Col xs="auto">
                                                <i className="bi bi-arrow-right text-primary fs-4"></i>
                                            </Col>
                                        </Row>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-4">
                        <p className="text-muted">
                            <i className="bi bi-info-circle me-1"></i>
                            Click on any department to view its employees
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    </Container>
  )
}

export default Departments
