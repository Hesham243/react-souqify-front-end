import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as storeService from '../../services/storeServices'

const StoreForm = (props) => {

  const {storeId} = useParams()
  const  initialState = {
    name:'',
    logo:'',
    category:'',
  }
  const [formData, setFormData] = useState(initialState)

  useEffect(()=>{
    const fetchStore = async()=>{
      const data = await storeService.show(storeId)
      setFormData(data)
    }
    if(storeId) fetchStore()
  },[storeId])

  const handleChange = (evt) => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

  const handleSubmit = (event)=>{
    event.preventDefault()
    if(storeId){
      props.handleUpdateStore(formData,storeId)
    }
    else{
      props.handleAddStore(formData)
    }
  }

  return <main>
    <form onSubmit={handleSubmit}>
      <h1>{storeId ? 'Edit Store': 'New Store'}</h1>
      
      <div>
        <label htmlFor="name">Store Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="logo">Logo URL:</label>
        <input
          type="url"
          id="logo"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
          placeholder="https://example.com/logo.png"
        />
      </div>

      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="electronics">Electronics</option>
          <option value="toys">Toys</option>
          <option value="books">Books</option>
          <option value="sports">Sports</option>
          <option value="fashion">Fashion</option>
          <option value="health_beauty">Health & Beauty</option>
        </select>
      </div>

      <button type="submit">
        {storeId ? 'Update Store' : 'Create Store'}
      </button>
    </form>
  </main>;
};

export default StoreForm;
