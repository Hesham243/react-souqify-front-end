const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/stores`

const index = async (storeId) => {
  try {
    const res = await fetch(`${BASE_URL}/${storeId}/items`)
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const show = async (storeId, itemId) => {
  try {
    const res = await fetch(`${BASE_URL}/${storeId}/items/${itemId}`)
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const create = async (storeId, formData) => {
  try {
    const token = localStorage.getItem('token')

    const res = await fetch(`${BASE_URL}/${storeId}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })

    const data = await res.json()
    return data

  } catch (err) {
    console.log(err)
  }
}

const createReview = async (storeId, itemId, formData) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${storeId}/items/${itemId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    return data
}

const deleteItem = async (storeId, itemId) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${storeId}/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    return data
  } catch(err) {
    console.log(err)
  }
}

const update = async (storeId, itemId, formData) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${storeId}/items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    return data
  } catch(err) {
    console.log(err)
  }
}

export {
  index,
  show,
  create,
  createReview,
  deleteItem,
  update,
}