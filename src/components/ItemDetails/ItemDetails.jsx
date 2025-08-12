import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as storeService from '../../services/storeServices';

const ItemDetails = () => {
    const { storeId, itemId } = useParams()
    const [item, setItem] = useState(null)

    useEffect(() => {
        const fetchItem = async () => {
            const storeData = await storeService.show(storeId)
            const foundItem = storeData.items.find(item => item._id === itemId )
            setItem(foundItem)
        }
        fetchItem()
    }, [storeId, itemId])

    if (!item) return <h2>Loading...</h2>

    return (
        <main>
            <h1>{item.name}</h1>
            {item.image && (<img src={item.image} alt={item.name} />
        )}
        <p><strong>Price:</strong> ${item.price}</p>
      <p><strong>Description:</strong> {item.description}</p>
        </main>
    )
}

export default ItemDetails;
