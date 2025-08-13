import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as storeService from '../../services/storeServices.js'
import ItemList from '../ItemList/ItemList'

const StoreDetails = ({ user }) => {
  const { storeId } = useParams()
  const [store, setStore] = useState(null)

  useEffect(() => {
    const fetchStore = async () => {
      const storeData = await storeService.show(storeId)
      setStore(storeData)
    }
    fetchStore()
  }, [storeId])

  if (!store) return <h2>Loading...</h2>

  return (
    <main>
      <h1>{store.name}</h1>
      {store.logo && (
        <img src={store.logo} alt={`${store.name} logo`} />
      )}
      <p><strong>Category:</strong> {store.category}</p>
      <Link to={`/stores/${storeId}/edit`} >Edit</Link>
      <hr />
      <ItemList user={user} />
    </main>
  )
}

export default StoreDetails
