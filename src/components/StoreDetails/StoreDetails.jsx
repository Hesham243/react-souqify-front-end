import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as storeService from '../../services/storeServices.js';
import ItemList from '../ItemList/ItemList';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const StoreDetails = ({ user, handleDeleteStore }) => {
  const { storeId } = useParams()
  const [store, setStore] = useState(null)

  useEffect(() => {
    const fetchStore = async () => {
      const storeData = await storeService.show(storeId)
      setStore(storeData)
    }
    fetchStore()
  }, [storeId])

  if (!store) return <h2>Loading...</h2>;

  return (
    <Container className="py-4">
      <Row className="justify-content-center mb-4">
        <Col xs={12}>
          <Card bg="dark" text="light" className="shadow-sm border-0">
            <Row className="g-0 flex-column flex-lg-row align-items-stretch">
              {store.logo && (
                <Col xs={12} lg={4} className="d-flex align-items-center justify-content-center" style={{ background: '#232526', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem', minHeight: '180px' }}>
                  <img src={store.logo} alt={`${store.name} logo`} className="img-responsive" style={{ maxHeight: '160px', maxWidth: '180px', objectFit: 'contain', borderRadius: '0.5rem' }} />
                </Col>
              )}
              <Col xs={12} lg={store.logo ? 8 : 12} className="d-flex align-items-center">
                <Card.Body className="w-100" style={{ padding: '2rem' }}>
                  <Card.Title style={{ color: '#ffb347', fontWeight: 700, fontSize: '2rem' }}>{store.name}</Card.Title>
                  <Card.Text className="mb-2">
                    <strong>Owner:</strong> {store.owner.username}<br />
                    <strong>Category:</strong> {store.category}
                  </Card.Text>
                  {user && user._id === store.owner._id && (
                    <div className="d-flex gap-2 mt-3">
                      <Button as={Link} to={`/stores/${storeId}/edit`} variant="outline-warning">Edit</Button>
                      <Button variant="outline-danger" onClick={() => handleDeleteStore(storeId)}>Delete</Button>
                    </div>
                  )}
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <hr className="bg-secondary" />
      <ItemList user={user} storeOwner={store.owner} />
    </Container>
  );
}

export default StoreDetails
