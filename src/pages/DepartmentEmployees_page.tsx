import { useParams } from 'react-router-dom';
import DepartmentEmployees from '../components/DepartmentEmployees'
import { Col, Container, Row } from 'react-bootstrap';
import GenderDistribution, { TopSalariesByDepartmentId } from '../components/Dashboards';

const DepartmentEmployees_page = () => {
    const { id } = useParams<{ id: string }>();
    //const deptId = id;
  return (
    <Container>
      <Row>
        <Col>
          <DepartmentEmployees id={id!}/>
        </Col>
        <Col>
          <GenderDistribution id={id!}/>
          <TopSalariesByDepartmentId id={id!}/>
        </Col>
      </Row>
      
    </Container>
  )
}

export default DepartmentEmployees_page
