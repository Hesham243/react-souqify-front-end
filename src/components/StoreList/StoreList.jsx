import { Link } from 'react-router-dom'
import { Card, Row, Col, Container } from 'react-bootstrap';

const StoreList = (props) => {

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center" style={{ color: '#ffb347', fontFamily: 'Montserrat, Arial, sans-serif' }}>Store List</h1>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {props.stores.map((store) => (
          <Col key={store._id}>
            <Card bg="dark" text="light" className="h-100 shadow-sm border-0">
              <Link to={`/stores/${store._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {store.logo && (
                  <Card.Img variant="top" src={store.logo} alt={`${store.name} logo`} className="img-responsive" style={{ maxHeight: '120px', objectFit: 'contain', background: '#232526' }} />
                )}
                <Card.Body>
                  <Card.Title style={{ color: '#ffb347', fontWeight: 700 }}>{store.name}</Card.Title>
                  <Card.Text>
                    <strong>Owner:</strong> {store.owner.username}<br />
                    <strong>Category:</strong> {store.category}
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
};

export default StoreList;
