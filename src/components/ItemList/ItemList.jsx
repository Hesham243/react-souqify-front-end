
import React from 'react';

const mockItems = [
  { id: 1, name: 'Item One', price: 10.99, description: 'First item description.' },
  { id: 2, name: 'Item Two', price: 15.49, description: 'Second item description.' },
  { id: 3, name: 'Item Three', price: 7.99, description: 'Third item description.' },
];

const ItemList = () => {
  return (
    <div>
      <h2>Items</h2>
      <ul>
        {mockItems.map(item => (
          <li key={item.id} style={{ marginBottom: '1rem' }}>
            <strong>{item.name}</strong> - ${item.price}
            <div>{item.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
