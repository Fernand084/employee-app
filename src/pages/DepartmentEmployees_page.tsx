import { useParams } from 'react-router-dom';
import DepartmentEmployees from '../components/DepartmentEmployees'
import { Col, Container, Row } from 'react-bootstrap';
import GenderDistribution, { TopSalariesByDepartmentId } from '../components/Dashboards';

const DepartmentEmployees_page = () => {
    const { id } = useParams<{ id: string }>();
    //const deptId = id;
  return (
    <Container fluid className="py-5 bg-light min-vh-100">
        <Container>
            <Row className="justify-content-center">
                <Col xl={11} xxl={10}>
                    
                    {/* Header del Dashboard */}
                    <div className="card shadow-lg border-0 rounded-4 mb-5 overflow-hidden">
                        <div className="bg-primary bg-gradient text-white p-4">
                            <div className="d-flex align-items-center">
                                <div className="bg-white bg-opacity-25 rounded-circle p-3 me-4">
                                    <i className="bi bi-graph-up-arrow fs-2 text-white"></i>
                                </div>
                                <div>
                                    <h1 className="h3 fw-bold mb-1">Department Analytics</h1>
                                    <p className="opacity-90 mb-0">Comprehensive overview and insights</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Layout Principal */}

                    <Row>
                        <Col>
                            <div className="d-flex flex-column gap-4">
                                {/* Top Salaries Card */}
                                <div className="card shadow-lg border-0 rounded-4">
                                    <div className="card-header bg-white border-0 py-4">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                                                <i className="bi bi-currency-dollar text-warning fs-5"></i>
                                            </div>
                                            <h6 className="fw-bold text-warning mb-0">Top Salaries</h6>
                                        </div>
                                    </div>
                                    <div className="card-body p-0">
                                        <TopSalariesByDepartmentId id={id!}/>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        {/* Componentes Secundarios */}
                        <Col lg={10} xl={12}>
                            <div className="d-flex flex-column gap-4">
                                
                                {/* Gender Distribution Card */}
                                <div className="card shadow-lg border-0 rounded-4">
                                    <div className="card-header bg-white border-0 py-4">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                                                <i className="bi bi-pie-chart text-success fs-5"></i>
                                            </div>
                                            <h6 className="fw-bold text-success mb-0">Gender Distribution</h6>
                                        </div>
                                    </div>
                                    <div className="card-body p-0">
                                        <GenderDistribution id={id!}/>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    
                    <Row className="justify-content-center">
                        
                        {/* Componente Principal */}
                        <Col lg={10} xl={12}>
                            <div className="card shadow-lg border-0 rounded-4 h-100">
                                <div className="card-header bg-white border-0 py-4">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                                            <i className="bi bi-people text-primary fs-5"></i>
                                        </div>
                                        <h5 className="fw-bold text-primary mb-0">Department Team</h5>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <DepartmentEmployees id={id!}/>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    
                    
                    {/* Footer */}
                    <div className="text-center mt-5">
                        <p className="text-muted">
                            <i className="bi bi-info-circle me-1"></i>
                            Dashboard updates in real-time
                        </p>
                    </div>
                    
                </Col>
            </Row>
        </Container>
    </Container>
  )
}

export default DepartmentEmployees_page
