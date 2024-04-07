import React, { useState } from 'react';
import ItemModal from '../components/ItemModal';

const ManageItems = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [items, updateItems] = useState([
        // Add your menu items here
        {
            id: 1,
            name: "BBQ Chicken",
            description: "Grilled chicken marinated in BBQ sauce",
            price: 18.99,
            imageUrl:
                "https://images.unsplash.com/photo-1522330397643-244786698879?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            quantity: 1,
        },
        // Add more items as needed
    ]);

    const openEditModal = (item) => {
        setSelectedItem(item);
        setShowEditModal(true);
    };

    const openAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseModals = () => {
        setShowEditModal(false);
        setShowAddModal(false);
    };

    const handleSaveEdit = (editedItem) => {
        // Find the index of the edited item in the items array
        const index = items.findIndex(item => item.id === editedItem.id);
        if (index !== -1) {
            // Update the item in the items array
            const updatedItems = [...items];
            updatedItems[index] = editedItem;
            updateItems(updatedItems);
        }
        handleCloseModals();
    };

    const handleAddItem = (newItem) => {
        // Generate a unique ID for the new item
        const newItemWithId = { ...newItem, id: Date.now() };
        // Add the new item to the items array
        const updatedItems = [...items, newItemWithId];
        updateItems(updatedItems);
        handleCloseModals();
    };
    const handleRemoveItem = (itemId) => {
        // Filter out the item with the given ID
        const updatedItems = items.filter(item => item.id !== itemId);
        updateItems(updatedItems);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold mb-6">Manage Items</h2>
            <button onClick={openAddModal} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">Add Item</button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover mb-4 rounded-md" />
                        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <p className="text-gray-700 font-semibold mb-2">${item.price}</p>
                        <button onClick={() => openEditModal(item)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">Edit</button>
                        <button onClick={() => handleRemoveItem(item.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">Remove</button>

                    </div>
                ))}
            </div>

            {/* Edit Item Modal */}
            <ItemModal isOpen={showEditModal} onClose={handleCloseModals} mode="edit" itemToUpdate={selectedItem} onSave={handleSaveEdit}>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Edit Item</h2>
                    {/* Add item form goes here */}
                </div>
            </ItemModal>

            {/* Add Item Modal */}
            <ItemModal isOpen={showAddModal} onClose={handleCloseModals} mode="add" onSave={handleAddItem}>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Add Item</h2>
                    {/* Add item form goes here */}
                </div>
            </ItemModal>
        </div>
    );
};

export default ManageItems;

