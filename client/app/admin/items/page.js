"use client";
import React, { useEffect, useState } from 'react';
import ItemModal from '../../components/ItemModal';
import {
    itemSlice,
    useSelector,
    useDispatch,
    selectCount,
    incrementAsync,
    incrementIfOddAsync,
} from "@/lib/redux";
import { usePathname } from 'next/navigation';
import Link from 'next/link';




const ManageItems = () => {

    const pathname = usePathname();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [items, updateItems] = useState([]);

    const dispatch = useDispatch();
    const itemsRedux = useSelector(state => state.items.items);
    
    const fetchItems = async()=>{
        const response = await fetch("http://localhost:3000/api/inventory/getinventory", {
            method: "GET",
         
        
        });
    
        if (!response.ok) {
            throw new Error("Failed to add item");
        }
        return response.json();                           
    }

    // const additemdb = async (item: Item) => {
    //     const response = await fetch("http://localhost:3000/api/inventory/addinventory", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(item),
    //     });
    
    //     if (!response.ok) {
    //         throw new Error("Failed to add item");
    //     }
    
    //     return response.json();
    // }

    useEffect(() => {
        updateItems(itemsRedux);
        // alert("call 2")
    }, [itemsRedux]);


useEffect(()=>{
    fetchItems().then((data)=>{
        dispatch(itemSlice.actions.setItems(data));
        console.log(data);
    }).catch((err)=>{
        console.log(err);
    })
},[])


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

        dispatch(itemSlice.actions.updateItem(editedItem));
        // const index = items.findIndex(item => item.id === editedItem.id);
        // if (index !== -1) {
        //     // Update the item in the items array
        //     const updatedItems = [...items];
        //     updatedItems[index] = editedItem;
        //     updateItems(updatedItems);
        // }

        handleCloseModals();
    };

    const handleAddItem = (newItem) => {
        // Generate a unique ID for the new item
        const newItemWithId = { ...newItem, id: Date.now() };

        alert(JSON.stringify(newItemWithId));

        dispatch(itemSlice.actions.addItem(newItemWithId));

        // const updatedItems = [...items, newItemWithId];
        // updateItems(updatedItems);
        handleCloseModals();
    };
    const handleRemoveItem = (itemId) => {
        // Filter out the item with the given ID
        dispatch(itemSlice.actions.removeItem({ id: itemId }));
        // const updatedItems = items.filter(item => item.id !== itemId);
        // updateItems(updatedItems);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold mb-6">Manage Items</h2>

            <div className="flex flex-col space-y-4">
                <Link href="/admin/orders" passHref>
                    <p className={`px-4 py-2 rounded-md focus:outline-none transition-colors duration-300 ease-in-out text-center ${pathname === '/admin/orders' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}>
                        Manage Orders
                    </p>
                </Link>
                <button onClick={openAddModal} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">Add Item</button>
            </div>



            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">



                {/* <div  className="bg-blue-200 p-6 rounded-lg shadow-md">
                    <img src={""} alt={"Image"} className="w-full h-48 object-cover mb-4 rounded-md" />
                    <h3 className="text-xl font-semibold mb-2">Name</h3>
                    <p className="text-gray-600 mb-4">Description</p>
                    <p className="text-gray-700 font-semibold mb-2">Price</p>
                    <button onClick={openAddModal} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">Add Item</button>

                </div> */}



                {items.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover mb-4 rounded-md" />
                        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <p className="text-gray-700 font-semibold mb-2">Rs. {item.price}</p>
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

