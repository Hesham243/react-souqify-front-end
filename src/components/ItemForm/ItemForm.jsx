import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as itemService from '../../services/itemService.js'
import { Form, Button, Container, Card } from 'react-bootstrap'

const categories = [
	'smartphones',
	'laptops',
	'clothing',
	'furniture',
	'kitchen',
	'stationery',
	'fitness',
]

const ItemForm = () => {
	const { storeId, itemId } = useParams()
	const navigate = useNavigate()
	const [form, setForm] = useState({
		name: '',
		description: '',
		price: '',
		image: '',
		category: '',
	})


  // this use effect gonna get item info's and do setForm so when u click edit btn all info's are pre filled
  useEffect(() => {
    if (itemId) {
      itemService.show(storeId, itemId).then(data => {
        setForm({
          name: data.name || '',
          description: data.description || '',
          price: data.price || '',
          image: data.image || '',
          category: data.category || '',
        })
      })
    }
  }, [storeId, itemId])


	const handleChange = (e) => {
		const { name, value } = e.target
		setForm(f => ({ ...f, [name]: value }))
	}


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (itemId) {
      await itemService.update(storeId, itemId, { ...form, price: Number(form.price) })
    } else {
      await itemService.create(storeId, { ...form, price: Number(form.price) })
    }
    navigate(-1)
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card bg="dark" text="light" style={{ width: '28rem' }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">{itemId ? 'Edit Item' : 'Add New Item'}</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter item name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter item description"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price *</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                placeholder="Enter price"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category *</Form.Label>
              <Form.Select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {itemId ? 'Update Item' : 'Create Item'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ItemForm
