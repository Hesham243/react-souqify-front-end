const StoreList = (props) => {
  return(
    <main>
      <h1>Store List</h1>
      {props.stores.map((store) => (
        <div key={store._id} className="store-card">
          {store.logo ? (
            <img 
              src={store.logo} 
              alt={`${store.name} logo`} 
              className="store-logo"
            />
          ) : null}
          <h3>{store.name}</h3>
          <p><strong>Category:</strong> {store.category}</p>
        </div>
      ))}
    </main>
  )
};

export default StoreList;
