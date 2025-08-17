import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import * as storeService from '../../services/storeServices';

const Landing = () => {
  const [randomItems, setRandomItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRandomItems = async () => {
      try {
        const storesData = await storeService.index();
        // Collect all items from all stores
        const allItems = [];
        storesData.forEach(store => {
          if (store.items && store.items.length > 0) {
            store.items.forEach(item => {
              allItems.push({
                ...item,
                storeName: store.name,
                storeId: store._id
              });
            });
          }
        });
        
        // Shuffle and get random 8 items
        const shuffled = allItems.sort(() => 0.5 - Math.random());
        setRandomItems(shuffled.slice(0, 8));
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomItems();
  }, []);

  if (loading) {
    return (
      <Container className="py-5">
        <h2 className="text-center" style={{ color: '#ffb347' }}>Loading...</h2>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Hero Section */}
      <Row className="mb-5">
        <Col xs={12} className="text-center">
          <h1 style={{ 
            color: '#ffb347', 
            fontFamily: 'Montserrat, Arial, sans-serif', 
            fontWeight: 700, 
            fontSize: '3rem',
            marginBottom: '1rem'
          }}>
            Welcome to Souqify
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#adb5bd', marginBottom: '2rem' }}>
            Discover amazing products from stores around the world
          </p>
          <Button 
            variant="warning" 
            size="lg" 
            onClick={() => navigate('/stores')}
            style={{ fontWeight: 600 }}
          >
            Browse All Stores
          </Button>
        </Col>
      </Row>

      {/* Featured Items Section */}
      <Row className="mb-4">
        <Col xs={12}>
          <h2 style={{ 
            color: '#ffb347', 
            fontFamily: 'Montserrat, Arial, sans-serif', 
            fontWeight: 600, 
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Featured Items
          </h2>
        </Col>
      </Row>

      {randomItems.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {randomItems.map(item => (
            <Col key={`${item.storeId}-${item._id}`}>
              <Card 
                bg="dark" 
                text="light" 
                className="h-100 shadow-sm border-0" 
                style={{ cursor: 'pointer' }} 
                onClick={() => navigate(`/stores/${item.storeId}/items/${item._id}`)}
              >
                {item.image && (
                  <div className="d-flex align-items-center justify-content-center p-2" style={{height: '150px', background: 'transparent'}}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="img-responsive"
                      style={{ maxHeight: '130px', objectFit: 'contain', background: 'transparent' }} 
                    />
                  </div>
                )}
                <Card.Body>
                  <Card.Title style={{ color: '#ffb347', fontWeight: 700 }}>{item.name}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> ${item.price}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <small style={{ color: '#adb5bd' }}>{item.category}</small>
                    <small style={{ color: '#28a745' }}>{item.storeName}</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          <Col xs={12} className="text-center">
            <p style={{ color: '#adb5bd', fontSize: '1.1rem' }}>
              No items available yet. Be the first to add some products!
            </p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Landing;
