import React, { useState, useEffect } from 'react';

const ItemModal = ({ isOpen, onClose, mode, itemToUpdate, onSave }) => {
  const [item, setItem] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: ''
  });

  useEffect(() => {
    if (mode === 'edit' && itemToUpdate) {
      setItem(itemToUpdate);
    } else {
      setItem({
        name: '',
        description: '',
        price: 0,
        imageUrl: ''
      });
    }
  }, [isOpen, mode, itemToUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = () => {
    onSave(item);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 z-50">
          <div className="flex justify-end">
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <h2 className="text-2xl font-semibold mb-4">{mode === 'add' ? 'Add Item' : 'Edit Item'}</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Name:</label>
              <input type="text" id="name" name="name" value={item.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700">Description:</label>
              <textarea id="description" name="description" value={item.description} onChange={handleChange} className="w-full px-4 py-2 border rounded-md resize-none outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700">Price:</label>
              <input type="number" id="price" name="price" value={item.price} onChange={handleChange} className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500" />
            </div>
            <button type="button" onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">{mode === 'add' ? 'Add' : 'Save'}</button>
          </form>
        </div>
      </div>
    )
  );
};

export default ItemModal;
