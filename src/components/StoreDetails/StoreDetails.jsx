import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import * as storeService from '../../services/storeServices.js'
import ItemList from '../ItemList/ItemList'

const StoreDetails = ({ user }) => {
  const { storeId } = useParams()
  const [store, setStore] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStore = async () => {
      const storeData = await storeService.show(storeId)
      setStore(storeData)
    }
    fetchStore()
  }, [storeId])

  const handleDeleteStore = async (storeId) => {
    try {
      await storeService.deleteStore(storeId)
      navigate('/stores')
    } catch (error) {
      console.error('Error deleting store:', error)
    }
  }

  if (!store) return <h2>Loading...</h2>

  return (
    <main>
      <h1>{store.name}</h1>
      {store.logo && (
        <img src={store.logo} alt={`${store.name} logo`} />
      )}
      <p><strong>Owner: </strong> {store.owner.username}</p>
      <p><strong>Category:</strong> {store.category}</p>
      
      {user && user._id === store.owner._id && (
        <>
          <Link to={`/stores/${storeId}/edit`}>Edit</Link>
          <button onClick={() => handleDeleteStore(storeId)}>Delete</button>
        </>
      )}
      
      <hr />
      <ItemList user={user} storeOwner={store.owner} />
    </main>
  )
}

export default StoreDetails
