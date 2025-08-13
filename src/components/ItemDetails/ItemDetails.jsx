import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import * as storeService from '../../services/storeServices'
import * as itemService from '../../services/itemService.js'


const ItemDetails = ({ user }) => {
    const { storeId, itemId } = useParams()
    const [item, setItem] = useState(null)
    const navigate = useNavigate()
    const [deleting, setDeleting] = useState(false)


    useEffect(() => {
        const fetchItem = async () => {
            const storeData = await storeService.show(storeId)
            const foundItem = storeData.items.find(item => item._id === itemId)
            setItem(foundItem)
        }
        fetchItem()
    }, [storeId, itemId])


    const handleEdit = () => {
        navigate(`/stores/${storeId}/items/${itemId}/edit`)
    }


    const handleDelete = async () => {
        setDeleting(true)
        await itemService.deleteItem(storeId, itemId)
        setDeleting(false);
        navigate(`/stores/${storeId}/items`)
    }


    if (!item) return <h2>Loading...</h2>


    return (
        <main>
            <h1>{item.name}</h1>

            {item.image && (<img src={item.image} alt={item.name} />)}
            <p><strong>Price:</strong> ${item.price}</p>
            <p><strong>Description:</strong> {item.description}</p>

            {user && (
                <div style={{ marginTop: '1rem' }}>
                    <button onClick={handleEdit} style={{ marginRight: '0.5rem' }}>Edit</button>
                    <button onClick={handleDelete} style={{ color: 'red' }} disabled={deleting}>
                        {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            )}

            <hr />
            <section>
                <h2>Reviews</h2>
                {item.reviews?.length ? (
                <ul>
                {item.reviews.map((review) => (
                    <>
                        <li key={review._id}>
                           <p><strong>Author: </strong>{user.username}</p>
                           <strong>Rating:</strong> {review.rating} ★<br />
                           <p><strong>Review: </strong>{review.text}</p>
                        </li>
                        <hr />
                    </>
                ))}
                </ul>
                ): (<p>No reviews yet.</p>)}
            </section>
        </main>
    )
}

export default ItemDetails
