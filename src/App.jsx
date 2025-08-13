import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import StoreForm from './components/StoreForm/StoreForm'
import StoreList from './components/StoreList/StoreList'
import StoreDetails from './components/StoreDetails/StoreDetails.jsx'
import ItemForm from './components/ItemForm/ItemForm.jsx'
import ItemList from './components/ItemList/ItemList.jsx'
import ItemDetails from './components/ItemDetails/ItemDetails.jsx'
import Landing from './components/Landing/Landing.jsx'
import { Route, Routes, useNavigate } from 'react-router-dom'
import * as authService from './services/authService.js'
import { useState, useEffect } from 'react'

import * as storeService from './services/storeServices.js'

const App = () => {

  const navigate = useNavigate()

  const initialState = authService.getUser()

  const [user, setUser] = useState(initialState)
  const [stores, setStores] = useState([])
  

  useEffect(() => {
    const fetchAllStores = async () => {
      const storesData = await storeService.index()
      setStores(storesData)
    }
    fetchAllStores()
  }, [])

  const handleSignUp = async (formData) => {
    try {
      const res = await authService.signUp(formData)
      setUser(res)
      // return success
      return { success: true }
    } catch(err){
      // return failure flag (then signup form can display message)
      // add message?
      return { success: false, message: err.message }
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleSignIn = async (formData) => {
    const res = await authService.signIn(formData)
    setUser(res)
  }

  const handleAddStore = async (formData)=>{
    const newStore = await storeService.create(formData)
    setStores([...stores, newStore])
    navigate('/stores')
  }

  const handleUpdateStore = async (formData, storeId)=>{
    const updatedStore = await storeService.update(formData, storeId)
    const storeIndex = stores.findIndex(store => store._id === storeId)
    const newStores = [...stores]
    newStores[storeIndex] = updatedStore
    setStores(newStores)
    navigate(`/stores/${storeId}`)
  }

  const handleDeleteStore = async (storeId) => {
    try {
      await storeService.deleteStore(storeId)
      setStores(stores.filter(store => store._id !== storeId))
      navigate('/stores')
    } catch (err) {
      console.error('Error deleting store:', err)
    }
  }

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Landing />} />
        <Route path='/stores' element={<StoreList stores={stores} />} />
        <Route path='/stores/:storeId' element={<StoreDetails user={user} handleDeleteStore={handleDeleteStore} />} />
        <Route path='/stores/:storeId/items' element={<ItemList user={user} />} />
        <Route path='/stores/:storeId/items/:itemId' element={<ItemDetails user={user} />} />
        {user ? (
          <>
            {/* Protected Routes - only for authenticated users */}
            <Route path='/stores/new' element={<StoreForm handleAddStore={handleAddStore} />} />
            <Route path='/stores/:storeId/edit' element={<StoreForm handleUpdateStore={handleUpdateStore} />} />
            <Route path='/stores/:storeId/items/new' element={<ItemForm mode="create" />} />
            <Route path='/stores/:storeId/items/:itemId/edit' element={<ItemForm mode="edit" />} />
          </>
        ) : (
          <>
            {/* Routes only for non-authenticated users */}
            <Route path='/sign-up' element={<SignUp handleSignUp={handleSignUp} user={user} />} />
            <Route path='/sign-in' element={<SignIn handleSignIn={handleSignIn} user={user} />} />
          </>
        )}
        
        <Route path='*' element={<h1>404</h1>} />
    </Routes>
    </>
  )
}

export default App


