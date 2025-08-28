import { Col, Container, Row } from 'react-bootstrap';
import EmployeeDetails from '../components/Employees';

const Employees_page = () => {
  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col xl={10} xxl={8}>
            
            {/* Header del Dashboard */}
            <div className="card shadow-lg border-0 rounded-4 mb-5 overflow-hidden">
              <div className="bg-gradient" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                <div className="text-white p-4">
                  <div className="d-flex align-items-center">
                    <div className="bg-white bg-opacity-25 rounded-circle p-3 me-4">
                      <i className="bi bi-person-workspace fs-2 text-white"></i>
                    </div>
                    <div>
                      <h1 className="h3 fw-bold mb-1">Employee Profile</h1>
                      <p className="opacity-90 mb-0">Complete employee information and details</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Employee Details Card */}
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-header bg-white border-0 py-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                      <i className="bi bi-person-vcard text-primary fs-5"></i>
                    </div>
                    <div>
                      <h5 className="fw-bold text-primary mb-0">Personal Information</h5>
                      <small className="text-muted">Employee profile and contact details</small>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary btn-sm rounded-pill">
                      <i className="bi bi-pencil me-1"></i>Edit
                    </button>
                    <button className="btn btn-outline-success btn-sm rounded-pill">
                      <i className="bi bi-download me-1"></i>Export
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="p-4">
                  <EmployeeDetails/>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="text-center mt-5">
              <p className="text-muted">
                <i className="bi bi-shield-check me-1"></i>
                All information is securely encrypted and protected
              </p>
            </div>
            
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Employees_page
