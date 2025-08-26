import { useParams } from 'react-router-dom';
import EmployeeDetails from '../components/EmployeeDetails';
import { EmployeeSalaryHistory } from '../components/Dashboards';
import { Col, Container, Row } from 'react-bootstrap';


const EmployeeDetails_page = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = id ? parseInt(id) : NaN;

  return (
    <Container>
      <Row>
        <Col>
          <EmployeeDetails id={numericId} />
        </Col>
        <Col md={{ span: 7, order: 1 }}>
          <EmployeeSalaryHistory id={numericId}/>
        </Col>
      </Row>
      
      
    </Container>
  );
};

export default EmployeeDetails_page;
