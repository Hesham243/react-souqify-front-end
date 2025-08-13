import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as itemService from '../../services/itemService.js'


const ItemList = ({ user, storeOwner }) => {
	const { storeId } = useParams()
	const [items, setItems] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		itemService.index(storeId).then(data => setItems(data || []))
	}, [storeId])

	return (
		<main>
			<h1>Item List</h1>

			{user && storeOwner && user._id === storeOwner._id && (
				<button onClick={() => navigate(`/stores/${storeId}/items/new`)}>Add New Item</button>
			)}

			{items.length > 0 ? (
				
				items.map(item => (
					<div
						key={item._id}
						className="item-card"
						style={{ cursor: 'pointer' }}
						onClick={() => navigate(`/stores/${storeId}/items/${item._id}`)}
					>
						<h3>{item.name}</h3>
						<p><strong>Price:</strong> ${item.price}</p>
						<p>{item.description}</p>
					</div>
				))

			) : (
				<p>No items found.</p>
			)}

		</main>
	)
}


export default ItemList