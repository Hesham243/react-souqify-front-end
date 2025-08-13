import { Link } from 'react-router-dom'

const StoreList = (props) => {
  return(
    <main>
      <h1>Store List</h1>
      {props.stores.map((store) => (
        <div key={store._id} className="store-card">
        <Link to={`/stores/${store._id}`} >
          {store.logo ? (
            <img 
              src={store.logo} 
              alt={`${store.name} logo`} 
              className="store-logo"
            />
          ) : null}
          <h3>{store.name}</h3>
          <p><strong>Owner: </strong> {store.owner.username}</p>
          <p><strong>Category:</strong> {store.category}</p>
          </Link>
        </div>
      ))}
    </main>
  )
};

export default StoreList;
