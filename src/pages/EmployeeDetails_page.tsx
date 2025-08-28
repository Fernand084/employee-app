import { useParams } from 'react-router-dom';
import EmployeeDetails from '../components/EmployeeDetails';
import { EmployeeSalaryHistory } from '../components/Dashboards';
import { Col, Container, Row } from 'react-bootstrap';


const EmployeeDetails_page = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = id ? parseInt(id) : NaN;

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
                    <i className="bi bi-person-circle fs-2 text-white"></i>
                  </div>
                  <div>
                    <h1 className="h3 fw-bold mb-1">Employee Profile</h1>
                    <p className="opacity-90 mb-0">Detailed information and salary history</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Layout Principal */}
            <Row className="g-4">
              
              {/*  Employee Details */}
              <Col lg={12} xl={12} className="order-2 order-lg-1">
                <div className="card shadow-lg border-0 rounded-4 h-100">
                  <div className="card-header bg-white border-0 py-4">
                    <div className="d-flex align-items-center">
                      <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                        <i className="bi bi-person-badge text-info fs-5"></i>
                      </div>
                      <h5 className="fw-bold text-info mb-0">Employee Details</h5>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <EmployeeDetails id={numericId} />
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              {/* Salary History */}
              <Col xl={12} xxl={12} className="order-1 order-lg-2">
                <div className="card shadow-lg border-0 rounded-4 h-100">
                  <div className="card-header bg-white border-0 py-4">
                    <div className="d-flex align-items-center">
                      <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                        <i className="bi bi-graph-up text-success fs-5"></i>
                      </div>
                      <h5 className="fw-bold text-success mb-0">Salary History</h5>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <EmployeeSalaryHistory id={numericId}/>
                  </div>
                </div>
              </Col>
            </Row>
            
            {/* Footer */}
            <div className="text-center mt-5">
              <p className="text-muted">
                <i className="bi bi-clock me-1"></i>
                Data updated in real-time
              </p>
            </div>
            
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default EmployeeDetails_page;
