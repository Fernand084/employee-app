import { Col, Container, Row } from 'react-bootstrap'
import { ActiveEmployeesByDepartment, AverageSalaryByDepartment, TitlesHistoryByDepartment } from '../components/Dashboards'
import Departments from '../components/Departments'

const Departments_page = () => {
  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
            <Row className="justify-content-center">
                {/* Header del Dashboard */}
                  <div className="text-center mb-5">
                      <div className="bg-primary bg-opacity-10 rounded-circle p-4 d-inline-flex align-items-center justify-content-center mb-3">
                          <i className="bi bi-graph-up-arrow text-primary fs-1"></i>
                      </div>
                      <h1 className="display-6 fw-bold text-primary mb-2">Department Dashboard</h1>
                      <p className="text-muted">Analytics and team overview</p>
                      <div className="bg-primary mx-auto rounded-pill" style={{width: '60px', height: '4px'}}></div>
                  </div>

                <Col lg={6} xl={8}>
                    <div className="d-flex flex-column gap-4 h-100">
                        
                        {/* titles history */}
                        <div className="card shadow-lg border-0 rounded-4 flex-fill">
                            <div className="card-body p-0">
                                <TitlesHistoryByDepartment/>
                            </div>
                        </div>
                        
                    </div>
                </Col>
                <Col lg={6} xl={8}>
                    <div className="d-flex flex-column gap-4 h-100">
                        
                        {/* Active employees */}
                        <div className="card shadow-lg border-0 rounded-4 flex-fill">
                            <div className="card-body p-0">
                                <ActiveEmployeesByDepartment/>
                            </div>
                        </div>
                        
                        {/* Avergae salary by department */}
                        <div className="card shadow-lg border-0 rounded-4 flex-fill">
                            <div className="card-body p-0">
                                <AverageSalaryByDepartment/>
                            </div>
                        </div>
                        
                    </div>
                </Col>
                
            </Row>
            <br />
          <Row className="justify-content-center">
              <Col xl={11} xxl={10}>
                  
                  

                  {/* Layout Principal*/}

                  <Row className="g-4">
                      <Col lg={7} xl={12}>
                          <div className="card shadow-lg border-0 rounded-4 h-100 overflow-hidden">
                              <div className="card-body p-0">
                                  <Departments/>
                              </div>
                          </div>
                      </Col>
                  </Row>
                  
                  
              </Col>
          </Row>
      </Container>
  </Container>
  )
}

export default Departments_page
