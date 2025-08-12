import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as itemService from '../../services/itemService.js'

const categories = [
	'smartphones',
	'laptops',
	'clothing',
	'furniture',
	'kitchen',
	'stationery',
	'fitness',
]

const ItemForm = () => {
	const { storeId, itemId } = useParams()
	const navigate = useNavigate()
	const [form, setForm] = useState({
		name: '',
		description: '',
		price: '',
		image: '',
		category: '',
	})


  // this use effect gonna get item info's and do setForm so when u click edit btn all info's are pre filled
  useEffect(() => {
    if (itemId) {
      itemService.show(storeId, itemId).then(data => {
        setForm({
          name: data.name || '',
          description: data.description || '',
          price: data.price || '',
          image: data.image || '',
          category: data.category || '',
        })
      })
    }
  }, [storeId, itemId])


	const handleChange = (e) => {
		const { name, value } = e.target
		setForm(f => ({ ...f, [name]: value }))
	}


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (itemId) {
      await itemService.update(storeId, itemId, { ...form, price: Number(form.price) })
    } else {
      await itemService.create(storeId, { ...form, price: Number(form.price) })
    }
    navigate(-1)
  }

  return (
    <form onSubmit={handleSubmit} className="item-form">

      <h2>{itemId ? 'Edit Item' : 'Add New Item'}</h2>

      <label>
        Name*:
        <input 
          name="name" 
          value={form.name} 
          onChange={handleChange} 
          required 
        />
      </label>

      <label>
        Description:
        <textarea 
          name="description" 
          value={form.description} 
          onChange={handleChange} 
        />
      </label>

      <label>
        Price*:
        <input 
          name="price" 
          type="number" 
          min="0" 
          value={form.price} 
          onChange={handleChange} 
          required 
        />
      </label>

      <label>
        Image URL:
        <input 
          name="image" 
          value={form.image} 
          onChange={handleChange} 
        />
      </label>

      <label>
        Category*:
        <select 
          name="category" 
          value={form.category} 
          onChange={handleChange} 
          required 
        >
          <option value="">Select category</option>
          
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </label>

      <button type="submit">{itemId ? 'Update' : 'Create'}</button>
    </form>
  )
}

export default ItemForm
