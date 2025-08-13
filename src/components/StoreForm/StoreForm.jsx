import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as storeService from '../../services/storeServices';
import { Form, Button, Container, Card } from 'react-bootstrap';

const StoreForm = (props) => {

  const {storeId} = useParams()
  const  initialState = {
    name:'',
    logo:'',
    category:'',
  }
  const [formData, setFormData] = useState(initialState)

  useEffect(()=>{
    const fetchStore = async()=>{
      const data = await storeService.show(storeId)
      setFormData(data)
    }
    if(storeId) fetchStore()
  },[storeId])

  const handleChange = (evt) => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

  const handleSubmit = (event) => {
    event.preventDefault();
    if (storeId) {
      props.handleUpdateStore(formData, storeId);
    } else {
      props.handleAddStore(formData);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card bg="dark" text="light" style={{ width: '28rem' }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">{storeId ? 'Edit Store' : 'New Store'}</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Store Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter store name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLogo">
              <Form.Label>Logo URL</Form.Label>
              <Form.Control
                type="url"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                required
                placeholder="https://example.com/logo.png"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="toys">Toys</option>
                <option value="books">Books</option>
                <option value="sports">Sports</option>
                <option value="fashion">Fashion</option>
                <option value="health_beauty">Health & Beauty</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {storeId ? 'Update Store' : 'Create Store'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default StoreForm;
