
import React from "react";
import {
  cartSlice,
  useSelector,
  useDispatch,
  selectCount,
  incrementAsync,
  incrementIfOddAsync,
} from "@/lib/redux";

const MenuItem = (props) => {
  const { item, showalert } = props;

  const { name, description, price, imageUrl } = item;


  const dispatch = useDispatch()

  //   const existingItem = useSelector(state => state.items.find(i => i.name === item.name));
  const handleAddToCart = () => {
    dispatch(cartSlice.actions.addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    }));
    console.log("Add to cart clicked");
    alert("Item added to cart");
    showalert();
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
          <div className="text-gray-700 text-base">{description}</div>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Rs. {price}
          </span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
