import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import * as storeService from '../../services/storeServices'
import * as itemService from '../../services/itemService.js'
import ReviewForm from '../ReviewForm/ReviewForm'
import { Card, Button, Container, Row, Col, Badge } from 'react-bootstrap'


const ItemDetails = ({ user }) => {
    const { storeId, itemId } = useParams()
    const [item, setItem] = useState(null)
    const navigate = useNavigate()
    const [deleting, setDeleting] = useState(false)

    const fetchItem = async () => {
        const storeData = await storeService.show(storeId)
        const foundItem = storeData.items.find(item => item._id === itemId)
        foundItem.owner = storeData.owner
        setItem(foundItem)
    }
    useEffect(() => {
        fetchItem()
    }, [storeId, itemId])


    const handleEdit = () => {
        navigate(`/stores/${storeId}/items/${itemId}/edit`)
    }


    const handleDelete = async () => {
        setDeleting(true)
        await itemService.deleteItem(storeId, itemId)
        setDeleting(false);
        navigate(`/stores/${storeId}`)
    }


    if (!item) return <h2>Loading...</h2>


    return (
        <Container className="py-4">
            <Row className="justify-content-center mb-4">
                <Col xs={12}>
                    <Card bg="dark" text="light" className="shadow-sm border-0" style={{ display: 'flex', flexDirection: 'row', minHeight: '300px' }}>
                        {item.image && (
                            <div style={{ 
                                flex: '0 0 300px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                padding: '20px',
                                background: 'transparent'
                            }}>
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    style={{ 
                                        maxHeight: '260px', 
                                        maxWidth: '280px', 
                                        objectFit: 'contain',
                                        borderRadius: '0.5rem'
                                    }} 
                                />
                            </div>
                        )}
                        <div style={{ flex: '1', padding: '2rem' }}>
                            <Card.Body className="p-0">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                    <Card.Title style={{ color: '#ffb347', fontWeight: 700, fontSize: '2rem' }}>
                                        {item.name}
                                    </Card.Title>
                                    <Badge bg="secondary">{item.category}</Badge>
                                </div>
                                <Card.Text className="mb-3" style={{ fontSize: '1.5rem', color: '#28a745', fontWeight: 600 }}>
                                    ${item.price}
                                </Card.Text>
                                <Card.Text className="mb-4">
                                    {item.description}
                                </Card.Text>
                                {user && user._id === item.owner._id && (
                                    <div className="d-flex gap-2">
                                        <Button variant="outline-warning" onClick={handleEdit}>
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="outline-danger" 
                                            onClick={handleDelete} 
                                            disabled={deleting}
                                        >
                                            {deleting ? 'Deleting...' : 'Delete'}
                                        </Button>
                                    </div>
                                )}
                            </Card.Body>
                        </div>
                    </Card>
                </Col>
            </Row>

            <hr className="bg-secondary" />
            
            <Row className="justify-content-center">
                <Col xs={12}>
                    <Card bg="dark" text="light" className="shadow-sm border-0">
                        <Card.Header>
                            <h3 style={{ color: '#ffb347', margin: 0 }}>Reviews</h3>
                        </Card.Header>
                        <Card.Body>
                            {item.reviews?.length ? (
                                <div>
                                    {item.reviews.map((review, idx) => (
                                        <Card key={review._id || review.id || idx} bg="secondary" text="light" className="mb-3">
                                            <Card.Body>
                                                {review.author?.username && (
                                                    <Card.Subtitle className="mb-2 text-warning">
                                                        {review.author.username}
                                                    </Card.Subtitle>
                                                )}
                                                <div className="mb-2">
                                                    <strong>Rating:</strong> {review.rating} ★
                                                </div>
                                                <Card.Text>{review.text}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <p>No reviews yet.</p>
                            )}
                            {user && (
                                <ReviewForm onReviewSubmit={fetchItem} />
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ItemDetails
