import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Container, Card } from 'react-bootstrap';

const SignIn = (props) => {
  const navigate = useNavigate()

  const initialState = {
    username: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialState)

  useEffect(() => {
    if (props.user) {
      navigate('/')
    }
  }, [props.user])

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleSignIn(formData)
    navigate('/')
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card bg="dark" text="light" style={{ width: '22rem' }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">Sign In</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" onChange={handleChange} placeholder="Enter username" autoComplete="username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={handleChange} placeholder="Enter password" autoComplete="current-password" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">Sign In</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default SignIn