import Recat from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Navbar from '../navbar/navbar.component'

const Dashboard = (props) => {
  const sidebar = {
    position: 'fixed',
    top: '50px',
    bottom: '0',
    left: '0',
    display: 'block',
    padding: '20px',
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: '#f5f5f5',
    borderRight: '1px solid #eee',
    width: '230px',
  }

  return (
    <Container fluid className="p-0">
      <Row>
        <Col>
          <Navbar username={props.username} />
        </Col>
      </Row>
      <Row>
        <Col xs={2} style={sidebar}>
          <p>asd</p>
        </Col>
        <Col xsoffset={2} style={{ marginLeft: '230px' }}>
          <div className='p-3'>
          {props.children}
        </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
