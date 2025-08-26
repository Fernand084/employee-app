import Departments from '../components/Departments'
import { Col, Container, Row } from 'react-bootstrap'
import { ActiveEmployeesByDepartment, AverageSalaryByDepartment, TitlesHistoryByDepartment } from '../components/Dashboards'

const Departments_page = () => {
  return (
    <Container fluid="sm order-md-1">
      <br />
      <Row>
        <Col>
          <Departments/>
        </Col>
        <br />
        <Col md={{ span: 6, order: 1 }}>
          <ActiveEmployeesByDepartment/>
          <AverageSalaryByDepartment/>
        </Col>
      </Row>
      <Row>
        <Col>
          <TitlesHistoryByDepartment/>
        </Col>
      </Row>
        
        <br />
        
    </Container>
  )
}

export default Departments_page
