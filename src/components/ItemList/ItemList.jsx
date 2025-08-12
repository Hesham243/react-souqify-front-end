import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as itemService from '../../services/itemService.js'


const ItemList = ({ user }) => {
	const { storeId } = useParams()
	const [items, setItems] = useState([])
	const navigate = useNavigate()


	useEffect(() => {
		itemService.index(storeId).then(data => setItems(data || []))
	}, [storeId])


	const handleDelete = async (itemId) => {
		await itemService.deleteItem(storeId, itemId)
		setItems(items.filter(item => item._id !== itemId))
	}


	return (
		<main>
			<h1>Item List</h1>

			{user && (
				<button onClick={() => navigate(`/stores/${storeId}/items/new`)}>Add New Item</button>
			)}
      
			{items.length > 0 ? (
				items.map(item => (
					<div key={item._id} className="item-card">
						<h3>{item.name}</h3>
						<p><strong>Price:</strong> ${item.price}</p>
						<p>{item.description}</p>
						{user && (
							<>
								<button onClick={() => navigate(`/stores/${storeId}/items/${item._id}/edit`)}>Edit</button>
								<button onClick={() => handleDelete(item._id)} style={{ marginLeft: '0.5rem', color: 'red' }}>Delete</button>
							</>
						)}
					</div>
				))

			) : (
				<p>No items found.</p>
			)}
      
		</main>
	)
}


export default ItemList