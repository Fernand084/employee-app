import { useEffect, useState } from 'react'
import type { Employee } from '../models/EmployeeModel'
import axios from 'axios'
import type { Title } from '../models/TitleModel';
import type { Salary } from '../models/SalaryModel';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api/config';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { formatCurrency } from './Utils';

interface Props {
  id: number;
};

const EmployeeDetails = ({id}:Props) => {
    const [employee, setEmployee] = useState<Employee>();
    const [titles, setTitles] = useState<Title[] | null>();
    const [salary, setSalary] = useState<Salary | null>();
    //const [salaries, setSalaries] = useState<Salary[] | null>();
    const [hireDate,setHireDate] = useState<number[]>();
    //const [fromDate, setFromDate] = useState<number[]>();
    //const [toDate, setToDate] = useState<number[]>();
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
            console.log(error);
            setError(err)
            setLoading(false);
          });

        axios
          .get<Salary>(`${API_URL}/employees/${id}/salary`)
          .then(res => {
            setSalary(res.data);
            //setFromDate(res.data.fromDate);
            //setToDate(res.data.toDate);
            setLoading(false);
          })
          .catch(error => {
            console.log('Something went wrong');
            setError(error)
            setLoading(false);
          });

         /* axios
          .get<Salary[]>(`${API_URL}/employees/${id}/salaries`)
          .then(res => {
            //setSalaries(res.data);
            //setFromDate(salary?.fromDate);
            //setToDate(salary?.toDate);
            setLoading(false);
          })
          .catch(error => {
            console.log('Something went wrong');
            setError(error)
            setLoading(false);
          });*/

          axios
          .get<Title[]>(`${API_URL}/employees/${id}/titles`)
          .then(res => {
            setTitles(res.data);
            //setFromDate(salary?.fromDate);
            //setToDate(salary?.toDate);
            setLoading(false);
          })
          .catch(error => {
            console.log('Something went wrong');
            setError(error)
            setLoading(false);
          });
    }, [id]);

    if (loading) return <p>Loading employee data....</p>
    if(!employee?.id) return <p>Employee {id} does not exists</p> 

    return (
      <Container fluid className="py-5 bg-light min-vh-100">
        <Container>
            <Row className="justify-content-center">
                <Col xl={10} lg={11}>
                    
                    {/* Botón Back */}
                    <div className="mb-4">
                        <Button 
                            onClick={() => navigate(-1)}
                            className="btn btn-outline-secondary rounded-pill px-4"
                        >
                            <i className="bi bi-arrow-left me-2"></i>
                            Back to List
                        </Button>
                    </div>

                    {/* Header */}
                    <div className="card shadow-lg border-0 rounded-4 mb-5 overflow-hidden">
                        <div className="bg-primary bg-gradient text-white p-5">
                            <Row className="align-items-center">
                                <Col lg={8}>
                                    <div className="d-flex align-items-center">
                                        {/* Avatar grande */}
                                        <div 
                                            className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center text-white fw-bold me-4"
                                            style={{width: '100px', height: '100px'}}
                                        >
                                            <span className="fs-1">
                                                {employee.firstName?.charAt(0)}{employee.lastName?.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <h1 className="display-5 fw-bold mb-2">
                                                {employee.firstName} {employee.lastName}
                                            </h1>
                                            <p className="fs-5 opacity-90 mb-1">
                                                Employee ID: <span className="badge bg-white bg-opacity-25 rounded-pill px-3">{employee.id}</span>
                                            </p>
                                            <p className="opacity-75 mb-0">Employee Profile</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <Row className="g-4">
                        {/* Información Personal */}
                        <Col lg={8}>
                            <div className="card shadow-lg border-0 rounded-4 mb-4">
                                <div className="card-header bg-white border-0 py-4">
                                    <h5 className="fw-bold text-primary mb-0">
                                        <i className="bi bi-person-circle me-2"></i>
                                        Personal Information
                                    </h5>
                                </div>
                                <div className="card-body p-4">
                                    <Row className="g-4">
                                        <Col md={6}>
                                            <div className="bg-light rounded-3 p-4">
                                                <div className="d-flex align-items-center mb-2">
                                                    <i className="bi bi-person text-primary fs-5 me-3"></i>
                                                    <span className="text-muted small text-uppercase fw-semibold">Full Name</span>
                                                </div>
                                                <h6 className="fw-bold text-dark mb-0">
                                                    {employee.firstName} {employee.lastName}
                                                </h6>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="bg-light rounded-3 p-4">
                                                <div className="d-flex align-items-center mb-2">
                                                    <i className="bi bi-calendar3 text-success fs-5 me-3"></i>
                                                    <span className="text-muted small text-uppercase fw-semibold">Hire Date</span>
                                                </div>
                                                <h6 className="fw-bold text-dark mb-0">
                                                    {hireDate ? `${hireDate[2]}/${hireDate[1]}/${hireDate[0]}` : 'Not specified'}
                                                </h6>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="bg-light rounded-3 p-4">
                                                <div className="d-flex align-items-center mb-2">
                                                    <i className="bi bi-currency-dollar text-warning fs-5 me-3"></i>
                                                    <span className="text-muted small text-uppercase fw-semibold">Current Salary</span>
                                                </div>
                                                <h5 className="fw-bold text-success mb-0">
                                                    {formatCurrency(salary?.amount!)}
                                                </h5>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="bg-light rounded-3 p-4">
                                                <div className="d-flex align-items-center mb-2">
                                                    <i className="bi bi-clock text-info fs-5 me-3"></i>
                                                    <span className="text-muted small text-uppercase fw-semibold">Years of Service</span>
                                                </div>
                                                <h6 className="fw-bold text-dark mb-0">
                                                    {hireDate ? `${new Date().getFullYear() - hireDate[0]} years` : 'N/A'}
                                                </h6>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                            {/* Historial de Títulos */}
                            <div className="card shadow-lg border-0 rounded-4">
                                <div className="card-header bg-white border-0 py-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h5 className="fw-bold text-primary mb-0">
                                            <i className="bi bi-briefcase me-2"></i>
                                            Position History
                                        </h5>
                                        <span className="badge bg-primary rounded-pill px-3">
                                            {titles?.length || 0} positions
                                        </span>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    {titles && titles.length > 0 ? (
                                        <div className="list-group list-group-flush">
                                            {titles.map((title, index) => (
                                                <div key={index} className="list-group-item border-0 py-4 px-4">
                                                    <Row className="align-items-center">
                                                        <Col xs="auto">
                                                            <div 
                                                                className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                                                                style={{width: '50px', height: '50px'}}
                                                            >
                                                                <i className="bi bi-briefcase text-primary fs-5"></i>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <h6 className="fw-bold text-dark mb-2">
                                                                {title.title}
                                                            </h6>
                                                            <div className="d-flex align-items-center text-muted">
                                                                <i className="bi bi-calendar-range me-1"></i>
                                                                <small>
                                                                    <span className="fw-semibold">From:</span> {title.fromDate[2]}/{title.fromDate[1]}/{title.fromDate[0]} 
                                                                    <span className="mx-2">•</span>
                                                                    <span className="fw-semibold">To:</span> {title.toDate[2]}/{title.toDate[1]}/{title.toDate[0]}
                                                                </small>
                                                            </div>
                                                            <div className="mt-2">
                                                                <span className="badge bg-info bg-opacity-15 text-info rounded-pill">
                                                                    <i className="bi bi-clock me-1"></i>
                                                                    {Math.floor((new Date(title.toDate[0], title.toDate[1]-1, title.toDate[2]) - 
                                                                                new Date(title.fromDate[0], title.fromDate[1]-1, title.fromDate[2])) / 
                                                                                (1000 * 60 * 60 * 24 * 365))} years
                                                                </span>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-5">
                                            <i className="bi bi-briefcase text-muted fs-1 mb-3"></i>
                                            <h6 className="text-muted">No position history available</h6>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Col>

                        {/* Sidebar - Quick Stats */}
                        <Col lg={4}>
                            <div className="card shadow-lg border-0 rounded-4" style={{top: '2rem'}}>
                                <div className="card-header bg-light border-0 py-4">
                                    <h6 className="fw-bold text-primary mb-0">
                                        <i className="bi bi-graph-up me-2"></i>
                                        Quick Overview
                                    </h6>
                                </div>
                                <div className="card-body p-4">
                                    <div className="d-flex flex-column gap-4">
                                        
                                        {/* Stat: Employee ID */}
                                        <div className="text-center bg-primary bg-opacity-10 rounded-3 p-3">
                                            <i className="bi bi-hash text-primary fs-2 mb-2"></i>
                                            <div className="fw-bold fs-5 text-primary">{employee.id}</div>
                                            <small className="text-muted">Employee ID</small>
                                        </div>

                                        {/* Stat: Current Position */}
                                        <div className="text-center bg-success bg-opacity-10 rounded-3 p-3">
                                            <i className="bi bi-award text-success fs-2 mb-2"></i>
                                            <div className="fw-bold fs-6 text-success">
                                                {titles && titles.length > 0 ? titles[titles.length - 1].title : 'No Position'}
                                            </div>
                                            <small className="text-muted">Current Position</small>
                                        </div>

                                        {/* Stat: Total Positions */}
                                        <div className="text-center bg-info bg-opacity-10 rounded-3 p-3">
                                            <i className="bi bi-collection text-info fs-2 mb-2"></i>
                                            <div className="fw-bold fs-5 text-info">{titles?.length || 0}</div>
                                            <small className="text-muted">Total Positions</small>
                                        </div>

                                        {/* Stat: Status */}
                                        <div className="text-center bg-warning bg-opacity-10 rounded-3 p-3">
                                            <i className="bi bi-person-check text-warning fs-2 mb-2"></i>
                                            <div className="fw-bold fs-6 text-warning">Active</div>
                                            <small className="text-muted">Employment Status</small>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </Container>
    );
}

export default EmployeeDetails
