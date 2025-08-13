import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as itemService from '../../services/itemService.js'
import { Card, Row, Col, Container, Button } from 'react-bootstrap'


const ItemList = ({ user, storeOwner }) => {
	const { storeId } = useParams()
	const [items, setItems] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		itemService.index(storeId).then(data => setItems(data || []))
	}, [storeId])

	return (
		<Container className="py-4">
			<h1 className="mb-4 text-center" style={{ color: '#ffb347', fontFamily: 'Montserrat, Arial, sans-serif' }}>Item List</h1>

			{user && storeOwner && user._id === storeOwner._id && (
				<div className="d-flex justify-content-end mb-3">
					<Button variant="warning" onClick={() => navigate(`/stores/${storeId}/items/new`)}>
						Add New Item
					</Button>
				</div>
			)}

			{items.length > 0 ? (
				<Row xs={1} sm={2} md={3} lg={4} className="g-4">
					{items.map(item => (
						<Col key={item._id}>
							<Card 
								bg="dark" 
								text="light" 
								className="h-100 shadow-sm border-0" 
								style={{ cursor: 'pointer' }} 
								onClick={() => navigate(`/stores/${storeId}/items/${item._id}`)}
							>
								{item.image && (
									<div style={{ 
										height: '150px', 
										display: 'flex', 
										alignItems: 'center', 
										justifyContent: 'center',
										padding: '10px',
										background: 'transparent'
									}}>
										<img 
											src={item.image} 
											alt={item.name} 
											style={{ 
												maxHeight: '130px',
												maxWidth: '100%',
												objectFit: 'contain',
												background: 'transparent'
											}} 
										/>
									</div>
								)}
								<Card.Body>
									<Card.Title style={{ color: '#ffb347', fontWeight: 700 }}>{item.name}</Card.Title>
									<Card.Text>
										<strong>Price:</strong> ${item.price}
									</Card.Text>
									<div className="d-flex justify-content-end">
										<small style={{ color: '#adb5bd' }}>{item.category}</small>
									</div>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			) : (
				<p className="text-center">No items found.</p>
			)}

		</Container>
	)
}


export default ItemList