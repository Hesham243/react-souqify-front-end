import React from 'react';

const mockItem = {
  id: 1,
  name: 'Item One',
  price: 10.99,
  description: 'This is a detailed description of Item One.',
  reviews: [
    { id: 1, author: 'Alice', text: 'Great product!' },
    { id: 2, author: 'Bob', text: 'Good value for money.' },
  ],
};

const ItemDetails = () => {
  return (
    <div>
      <h2>{mockItem.name}</h2>
      <p><strong>Price:</strong> ${mockItem.price}</p>
      <p>{mockItem.description}</p>
      <h3>Reviews</h3>
      <ul>
        {mockItem.reviews.map(review => (
          <li key={review.id}>
            <strong>{review.author}:</strong> {review.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemDetails;
