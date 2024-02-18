import React from "react";
// import { useDispatch, useSelector } from 'react-redux'
// import { actionCreators } from '../state';

const MenuItem = (props) => {
  const { item } = props;

  const { name, description, price, imageUrl } = item;
  //   const dispatch = useDispatch()
  //   const existingItem = useSelector(state => state.items.find(i => i.name === item.name));
  const handleAddToCart = () => {
    // if(existingItem){
    //     dispatch(actionCreators.updateitem(existingItem));

    // }else{
    //   dispatch(actionCreators.additem(item));
    // }
    console.log("Add to cart clicked");
  };

  return (
    <div className="my-3">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          src={imageUrl}
          alt="Menu Item"
          className="w-full h-48 object-cover"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            Price: ${price}
          </span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleAddToCart()}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
