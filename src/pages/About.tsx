import { aboutContent } from '../content/AboutSectionContent';
import { Col, Container, Row } from 'react-bootstrap';

const About: React.FC = () => {
  return (
    <Container fluid className="py-5 bg-gradient" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <Container>
        <Row className="justify-content-center">
          <Col xl={10} xxl={8}>
            {/* Card principal */}
            <div className="card shadow-xl border-0 rounded-4 overflow-hidden">
              
              {/* Header */}
              <div className="bg-primary bg-gradient text-white text-center py-5">
                <div className="position-relative">
                  {/* profile pic */}
                  <div className="position-relative d-inline-block mb-4">
                    <img 
                      src="/img/profile_pic.jpg" 
                      alt="profile_pic" 
                      className="rounded-circle border border-5 border-white shadow-lg"
                      width={180} 
                      height={180}
                      style={{objectFit: 'cover'}}
                    />
                    {/* Badge de estado online */}
                    <span className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-3 border-white" 
                          style={{width: '24px', height: '24px'}}></span>
                  </div>
                  
                  {/* Título */}
                  <h1 className="display-5 fw-bold mb-2">{aboutContent.title}</h1>
                  <p className="lead opacity-90 mb-0">Full Stack Developer & Problem Solver</p>
                </div>
              </div>

              {/* Contenido principal */}
              <div className="card-body p-5">
                <Row className="g-4">
                  {/* Columna de texto */}
                  <Col lg={8}>
                    <div className="mb-4">
                      <h3 className="h4 fw-bold text-primary mb-3">
                        <i className="bi bi-person-circle me-2"></i>
                        About Me
                      </h3>
                      <div className="text-muted lh-lg" style={{ whiteSpace: "pre-line", fontSize: '1.1rem' }}>
                        {aboutContent.text}
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="d-flex flex-wrap gap-3 mt-4">
                      <button className="btn btn-primary btn-lg rounded-pill px-4">
                        <i className="bi bi-download me-2"></i>
                        Download Resume
                      </button>
                      <button className="btn btn-outline-primary btn-lg rounded-pill px-4">
                        <i className="bi bi-envelope me-2"></i>
                        Contact Me
                      </button>
                    </div>
                  </Col>

                  {/* Columna lateral con stats/skills */}
                  <Col lg={4}>
                    <div className="bg-light rounded-4 p-4 h-100">
                      <h5 className="fw-bold text-primary mb-4">
                        <i className="bi bi-graph-up me-2"></i>
                        Quick Stats
                      </h5>
                      
                      {/* Stats cards */}
                      <div className="d-flex flex-column gap-3">
                        <div className="bg-white rounded-3 p-3 text-center shadow-sm">
                          <i className="bi bi-code-slash text-primary fs-2 mb-2"></i>
                          <div className="fw-bold fs-4 text-primary">10+</div>
                          <small className="text-muted">Years Experience</small>
                        </div>
                        
                        <div className="bg-white rounded-3 p-3 text-center shadow-sm">
                          <i className="bi bi-laptop text-success fs-2 mb-2"></i>
                          <div className="fw-bold fs-4 text-success">8+</div>  
                          <small className="text-muted">Projects Completed</small>
                        </div>
                        
                        <div className="bg-white rounded-3 p-3 text-center shadow-sm">
                          <i className="bi bi-star-fill text-warning fs-2 mb-2"></i>
                          <div className="fw-bold fs-4 text-warning">Java</div>
                          <small className="text-muted">Favorite Tech</small>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Footer con redes */}
              <div className="card-footer bg-light border-0 py-4">
                <Row className="align-items-center">
                  <Col md={6}>
                    <p className="mb-0 text-muted">
                      <i className="bi bi-geo-alt-fill me-1"></i>
                      Based in Mérida Yucatan, MX
                    </p>
                  </Col>
                  <Col md={6} className="text-md-end">
                    <div className="d-flex justify-content-md-end gap-2">
                      <button className="btn btn-outline-dark rounded-circle p-2">
                        <i className="bi bi-github"></i>
                      </button>
                      <button className="btn btn-outline-primary rounded-circle p-2">
                        <i className="bi bi-linkedin"></i>
                      </button>
                      <button className="btn btn-outline-info rounded-circle p-2">
                        <i className="bi bi-twitter"></i>
                      </button>
                      <button className="btn btn-outline-danger rounded-circle p-2">
                        <i className="bi bi-envelope"></i>
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
    
};

export default About;
