import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';

const SignUp = (props) => {
  const navigate = useNavigate()

  const initialState = {
    username: '',
    password: '',
    passwordConf: '',
  }

  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState(null)


  useEffect(() => {
    if (props.user) {
      navigate('/')
    }
  }, [props.user])

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  // made this function asynchronous
  const handleSubmit = async (evt) => {
    evt.preventDefault()  
    // saved the return as "result"
    const result = await props.handleSignUp(formData)
    // if sign up is succssful, navigate to home
    if (result.success){
      navigate('/')
    } else {
      // otherwise, set the error message state 
      setError(result.message)
    }
  }

  let formIsInvalid = true

  if (formData.username && formData.password && formData.password === formData.passwordConf) {
    formIsInvalid = false
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card bg="dark" text="light" style={{ width: '22rem' }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">Sign Up</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" onChange={handleChange} placeholder="Enter username" autoComplete="username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={handleChange} placeholder="Enter password" autoComplete="new-password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPasswordConf">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="passwordConf" onChange={handleChange} placeholder="Confirm password" autoComplete="new-password" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100" disabled={formIsInvalid}>Sign Up</Button>
          </Form>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default SignUp