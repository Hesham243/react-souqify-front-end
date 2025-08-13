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
          <Card bg="dark" text="light" className="shadow-sm border-0 flex-row" style={{ minHeight: '220px', display: 'flex', flexDirection: 'row', width: '100%' }}>
            {store.logo && (
              <div style={{ flex: '0 0 220px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#232526', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem' }}>
                <img src={store.logo} alt={`${store.name} logo`} style={{ maxHeight: '160px', maxWidth: '180px', objectFit: 'contain', borderRadius: '0.5rem' }} />
              </div>
            )}
            <div style={{ flex: '1', padding: '2rem' }}>
              <Card.Body className="p-0">
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
            </div>
          </Card>
        </Col>
      </Row>
      <hr className="bg-secondary" />
      <ItemList user={user} storeOwner={store.owner} />
    </Container>
  );
}

export default StoreDetails
