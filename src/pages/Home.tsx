// src/pages/Home.tsx
import Message from '../components/Message';
import { homeContent } from '../content/HomeContent';
import { Col, Container, Row, Table } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col xl={11} xxl={10}>
            
            {/* Hero Header */}
            <div className="card shadow-lg border-0 rounded-4 mb-5 overflow-hidden">
              <div className="bg-gradient position-relative" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                <div className="text-white p-5">
                  <div className="d-flex align-items-center">
                    <div className="bg-white bg-opacity-25 rounded-circle p-4 me-4">
                      <i className="bi bi-code-slash fs-1 text-white"></i>
                    </div>
                    <div>
                      <h1 className="display-6 fw-bold mb-2">{homeContent.title}</h1>
                      <div className="bg-white bg-opacity-10 rounded-3 p-3 mt-3">
                        <Message msg={homeContent.text} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Row className="g-4 mb-5">
              
              {/* Tech Stack Section */}
              <Col lg={6}>
                <div className="card shadow-lg border-0 rounded-4 h-100">
                  <div className="card-header bg-white border-0 py-4">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                        <i className="bi bi-stack text-primary fs-5"></i>
                      </div>
                      <h4 className="fw-bold text-primary mb-0">Tech Stack</h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="text-muted mb-4">Modern technologies powering this application:</p>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="d-flex align-items-center p-3 bg-light rounded-3">
                          <i className="bi bi-cup-hot text-warning fs-4 me-3"></i>
                          <div>
                            <div className="fw-bold">Spring Boot 3.2</div>
                            <small className="text-muted">JPA, PostgreSQL, Lombok</small>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center p-3 bg-light rounded-3">
                          <i className="bi bi-box text-info fs-4 me-3"></i>
                          <div>
                            <div className="fw-bold">Maven</div>
                            <small className="text-muted">Build & Dependencies</small>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center p-3 bg-light rounded-3">
                          <i className="bi bi-code-square text-danger fs-4 me-3"></i>
                          <div>
                            <div className="fw-bold">Java 21</div>
                            <small className="text-muted">Latest LTS</small>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center p-3 bg-light rounded-3">
                          <i className="bi bi-database text-success fs-4 me-3"></i>
                          <div>
                            <div className="fw-bold">PostgreSQL 16</div>
                            <small className="text-muted">Database</small>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center p-3 bg-light rounded-3">
                          <i className="bi bi-container text-primary fs-4 me-3"></i>
                          <div>
                            <div className="fw-bold">Docker</div>
                            <small className="text-muted">Containerization</small>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center p-3 bg-light rounded-3">
                          <i className="bi bi-lightning text-warning fs-4 me-3"></i>
                          <div>
                            <div className="fw-bold">React + Vite</div>
                            <small className="text-muted">Frontend</small>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex align-items-center p-3 bg-warning bg-opacity-10 rounded-3 border border-warning border-opacity-25">
                          <i className="bi bi-cloud text-warning fs-4 me-3"></i>
                          <div>
                            <div className="fw-bold text-warning">AWS Deployment</div>
                            <small className="text-muted">Cloud hosting and infrastructure</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              {/* Environment & Tools Section */}
              <Col lg={6}>
                <div className="d-flex flex-column gap-4 h-100">
                  
                  {/* Dev Environment Section*/}
                  <div className="card shadow-lg border-0 rounded-4 flex-grow-1">
                    <div className="card-header bg-white border-0 py-4">
                      <div className="d-flex align-items-center">
                        <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                          <i className="bi bi-terminal text-info fs-5"></i>
                        </div>
                        <h5 className="fw-bold text-info mb-0">Development Environment</h5>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex align-items-start">
                        <i className="bi bi-ubuntu text-danger fs-3 me-3 mt-1"></i>
                        <div>
                          <p className="mb-2">
                            Working on Windows with <strong>WSL Linux (Ubuntu)</strong> as the development environment, 
                            which provides better compatibility and is closer to production.
                          </p>
                          <div className="bg-light rounded-3 p-3">
                            <small className="text-muted">
                              <i className="bi bi-check-circle text-success me-1"></i>
                              Avoids Windows configuration issues
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Docker */}
                  <div className="card shadow-lg border-0 rounded-4 flex-grow-1">
                    <div className="card-header bg-white border-0 py-4">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                          <i className="bi bi-container text-primary fs-5"></i>
                        </div>
                        <h5 className="fw-bold text-primary mb-0">Docker Containerization</h5>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="mb-3">
                        Using Docker for convenient local development without installing software locally.
                      </p>
                      <div className="bg-primary bg-opacity-5 rounded-3 p-3">
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-play-circle text-success fs-5 me-2"></i>
                          <strong>Single Command Setup</strong>
                        </div>
                        <small className="text-muted">
                          Docker Compose orchestrates database and application containers seamlessly.
                        </small>
                      </div>
                    </div>
                  </div>

                </div>
              </Col>
            </Row>

            {/* Database Section */}
            <div className="card shadow-lg border-0 rounded-4 mb-5">
              <div className="card-header bg-white border-0 py-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                      <i className="bi bi-database text-success fs-5"></i>
                    </div>
                    <div>
                      <h4 className="fw-bold text-success mb-0">Database Schema</h4>
                      <small className="text-muted">Employee database with comprehensive test data</small>
                    </div>
                  </div>
                  <a href="https://github.com/neondatabase-labs/postgres-sample-dbs#employees-database" 
                    className="btn btn-outline-success btn-sm rounded-pill" 
                    target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-github me-1"></i>Source
                  </a>
                </div>
              </div>
              <div className="card-body">
                <div className="alert alert-info border-0 rounded-3 mb-4">
                  <i className="bi bi-info-circle me-2"></i>
                  Using the <strong>neondatabase-labs employee database</strong> - perfect for complex SQL queries and testing.
                </div>
                <div className="table-responsive">
                  <Table className="table-hover align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th><i className="bi bi-table me-2"></i>Table Name</th>
                        <th><i className="bi bi-list-columns me-2"></i>Column Name</th>
                        <th><i className="bi bi-code me-2"></i>Data Type</th>
                        <th><i className="bi bi-question-circle me-2"></i>Nullable</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-primary">
                        <td><span className="badge bg-primary">department</span></td>
                        <td>id</td>
                        <td><code>character</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-primary">
                        <td><span className="badge bg-primary">department</span></td>
                        <td>dept_name</td>
                        <td><code>character varying</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-info">
                        <td><span className="badge bg-info">department_employee</span></td>
                        <td>employee_id</td>
                        <td><code>bigint</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-info">
                        <td><span className="badge bg-info">department_employee</span></td>
                        <td>department_id</td>
                        <td><code>character</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-info">
                        <td><span className="badge bg-info">department_employee</span></td>
                        <td>from_date</td>
                        <td><code>date</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-info">
                        <td><span className="badge bg-info">department_employee</span></td>
                        <td>to_date</td>
                        <td><code>date</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-warning">
                        <td><span className="badge bg-warning">department_manager</span></td>
                        <td>employee_id</td>
                        <td><code>bigint</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-warning">
                        <td><span className="badge bg-warning">department_manager</span></td>
                        <td>department_id</td>
                        <td><code>character</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-warning">
                        <td><span className="badge bg-warning">department_manager</span></td>
                        <td>from_date</td>
                        <td><code>date</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-warning">
                        <td><span className="badge bg-warning">department_manager</span></td>
                        <td>to_date</td>
                        <td><code>date</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-success">
                        <td><span className="badge bg-success">employee</span></td>
                        <td>id</td>
                        <td><code>bigint</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-success">
                        <td><span className="badge bg-success">employee</span></td>
                        <td>birth_date</td>
                        <td><code>date</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-success">
                        <td><span className="badge bg-success">employee</span></td>
                        <td>first_name</td>
                        <td><code>character varying</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-success">
                        <td><span className="badge bg-success">employee</span></td>
                        <td>last_name</td>
                        <td><code>character varying</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-success">
                        <td><span className="badge bg-success">employee</span></td>
                        <td>gender</td>
                        <td><code>USER-DEFINED</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-success">
                        <td><span className="badge bg-success">employee</span></td>
                        <td>hire_date</td>
                        <td><code>date</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-danger">
                        <td><span className="badge bg-danger">salary</span></td>
                        <td>employee_id</td>
                        <td><code>bigint</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-danger">
                        <td><span className="badge bg-danger">salary</span></td>
                        <td>amount</td>
                        <td><code>bigint</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-danger">
                        <td><span className="badge bg-danger">salary</span></td>
                        <td>from_date</td>
                        <td><code>date</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-danger">
                        <td><span className="badge bg-danger">salary</span></td>
                        <td>to_date</td>
                        <td><code>date</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-secondary">
                        <td><span className="badge bg-secondary">title</span></td>
                        <td>employee_id</td>
                        <td><code>bigint</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-secondary">
                        <td><span className="badge bg-secondary">title</span></td>
                        <td>title</td>
                        <td><code>character varying</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-secondary">
                        <td><span className="badge bg-secondary">title</span></td>
                        <td>from_date</td>
                        <td><code>date</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                      <tr className="table-secondary">
                        <td><span className="badge bg-secondary">title</span></td>
                        <td>to_date</td>
                        <td><code>date</code></td>
                        <td><span className="badge bg-danger">NO</span></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>

            {/* API Endpoints Section */}
            <div className="card shadow-lg border-0 rounded-4 mb-5">
              <div className="card-header bg-white border-0 py-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                      <i className="bi bi-api text-warning fs-5"></i>
                    </div>
                    <div>
                      <h4 className="fw-bold text-warning mb-0">API Endpoints</h4>
                      <small className="text-muted">Read-only REST API for AWS free-tier deployment</small>
                    </div>
                  </div>
                  <span className="badge bg-success rounded-pill px-3 py-2">
                    <i className="bi bi-shield-check me-1"></i>GET Only
                  </span>
                </div>
              </div>
              <div className="card-body">
                <div className="alert alert-warning border-0 rounded-3 mb-4">
                  <i className="bi bi-info-circle me-2"></i>
                  <strong>AWS Free-Tier Optimization:</strong> Only GET endpoints are available to minimize resource usage and costs.
                </div>
                
                <Row className="g-4">
                  
                  {/* Employees Endpoints Section*/}
                  <Col lg={6}>
                    <div className="border rounded-3 p-4 h-100">
                      <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-people-fill text-primary fs-4 me-3"></i>
                        <h5 className="text-primary fw-bold mb-0">Employees</h5>
                      </div>
                      <div className="vstack gap-2">
                        <div className="d-flex align-items-center p-2 bg-light rounded-2">
                          <span className="badge bg-success me-2">GET</span>
                          <code className="small">/employees</code>
                        </div>
                        <div className="d-flex align-items-center p-2 bg-light rounded-2">
                          <span className="badge bg-success me-2">GET</span>
                          <code className="small">/employees/id</code>
                        </div>
                        <div className="d-flex align-items-center p-2 bg-light rounded-2">
                          <span className="badge bg-success me-2">GET</span>
                          <code className="small">/employees/id/salary</code>
                        </div>
                        <div className="d-flex align-items-center p-2 bg-light rounded-2">
                          <span className="badge bg-success me-2">GET</span>
                          <code className="small">/employees/id/salaries</code>
                        </div>
                        <div className="d-flex align-items-center p-2 bg-light rounded-2">
                          <span className="badge bg-success me-2">GET</span>
                          <code className="small">/employees/id/titles</code>
                        </div>
                      </div>
                    </div>
                  </Col>

                  {/* Departments Endpoints Section*/}
                  <Col lg={6}>
                    <div className="border rounded-3 p-4 h-100">
                      <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-building text-info fs-4 me-3"></i>
                        <h5 className="text-info fw-bold mb-0">Departments</h5>
                      </div>
                      <div className="vstack gap-2">
                        <div className="d-flex align-items-center p-2 bg-light rounded-2">
                          <span className="badge bg-success me-2">GET</span>
                          <code className="small">/departments</code>
                        </div>
                        <div className="d-flex align-items-center p-2 bg-light rounded-2">
                          <span className="badge bg-success me-2">GET</span>
                          <code className="small">/departments/id/employees</code>
                        </div>
                        <div className="d-flex align-items-center p-2 bg-light rounded-2">
                          <span className="badge bg-success me-2">GET</span>
                          <code className="small">/departments/id/manager</code>
                        </div>
                      </div>
                    </div>
                  </Col>

                  {/* Salaries Endpoints Section*/}
                  <Col lg={6}>
                    <div className="border rounded-3 p-4 h-100">
                      <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-currency-dollar text-success fs-4 me-3"></i>
                        <h5 className="text-success fw-bold mb-0">Salaries</h5>
                      </div>
                      <div className="vstack gap-2">
                        <div className="d-flex align-items-center p-2 bg-light rounded-2">
                          <span className="badge bg-success me-2">GET</span>
                          <code className="small">/salary/id/highest</code>
                        </div>
                        <div className="d-flex align-items-center p-2 bg-light rounded-2">
                          <span className="badge bg-success me-2">GET</span>
                          <code className="small">/salary/average-by-department</code>
                        </div>
                      </div>
                    </div>
                  </Col>

                  {/* Statistics Endpoints Section*/}
                  <Col lg={6}>
                    <div className="border rounded-3 p-4 h-100">
                      <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-graph-up text-warning fs-4 me-3"></i>
                        <h5 className="text-warning fw-bold mb-0">Statistics</h5>
                      </div>
                      <div className="vstack gap-2">
                        <div className="d-flex align-items-center p-2 bg-light rounded-2">
                          <span className="badge bg-success me-2">GET</span>
                          <code className="small">/stats/employees-per-department</code>
                        </div>
                        <div className="d-flex align-items-center p-2 bg-light rounded-2">
                          <span className="badge bg-success me-2">GET</span>
                          <code className="small">/stats/gender-distribution</code>
                        </div>
                        <div className="d-flex align-items-center p-2 bg-light rounded-2">
                          <span className="badge bg-success me-2">GET</span>
                          <code className="small">/stats/titles-history</code>
                        </div>
                      </div>
                    </div>
                  </Col>

                </Row>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center">
              <div className="d-inline-flex align-items-center bg-white rounded-pill px-4 py-2 shadow-sm">
                <i className="bi bi-github text-dark fs-5 me-2"></i>
                <span className="text-muted small">Built with passion for modern web development</span>
              </div>
            </div>
            
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Home;
