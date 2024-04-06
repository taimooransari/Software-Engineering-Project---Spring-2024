"use client";
import React, { useState } from 'react';
import ItemModal from '../../components/ItemModal'; // Assuming ItemModal is reusable and accepts children
import OrderModal from '../../components/orderModal';
const ManageOrders = () => {

    


    const [orders, setOrders] = useState([
        {
            id: 1,
            orderTime: "2024-04-07T10:30:00",
            customerContact: "1234567890",
            note: "Extra spicy",
            addressToDeliver: {
                textAddress: "123 Main St, City, Country",
                mapLink: "https://maps.google.com",
            },
            orderStatus: "Open",
            items: {
                3: 2,
                4: 1
            },
            deliveryFee: 5,
            totalBill: 35.98
        },
        // Add more orders as needed
    ]);

    const [statusFilters, setStatusFilters] = useState({
        Open: true,
        Fulfilled: true,
        Dispatched: true,
        Cancelled: true,
    });

    const toggleStatusFilter = (status) => {
        setStatusFilters({
            ...statusFilters,
            [status]: !statusFilters[status],
        });
    };



    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);

    const openOrderDetailsModal = (order) => {
        setSelectedOrder(order);
        setShowOrderDetailsModal(true);
    };

    const handleCloseOrderDetailsModal = () => {
        setShowOrderDetailsModal(false);
    };


    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold mb-6">Manage Orders</h2>
            <div className="flex mb-4">
                {Object.keys(statusFilters).map((status) => (
                    <div key={status} className="mr-4">
                        <input
                            type="checkbox"
                            id={status}
                            checked={statusFilters[status]}
                            onChange={() => toggleStatusFilter(status)}
                            className="mr-2"
                        />
                        <label htmlFor={status}>{status}</label>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-6">
                {orders.map((order) => (
                    statusFilters[order.orderStatus] && (
                        <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Order ID: {order.id}</h3>
                            <p>Order Time: {order.orderTime}</p>
                            <p>Contact: {order.customerContact}</p>
                            <p>Note: {order.note}</p>
                            <p>Address: {order.addressToDeliver.textAddress}</p>
                            <p>Status: {order.orderStatus}</p>

                            <button onClick={() => openOrderDetailsModal(order)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">View Details</button>
                        </div>
                    )
                ))}
            </div>
            
            <OrderModal isOpen={showOrderDetailsModal} onClose={handleCloseOrderDetailsModal} order={selectedOrder} />

        </div>
    );
};

export default ManageOrders;


// "use client";
// import React, { useState } from 'react';

// const ManageOrders = () => {
//   // Define state to manage orders and status filters
//   const [orders, setOrders] = useState([
//     {
//       id: 1,
//       orderTime: "2024-04-07T10:30:00",
//       customerContact: "1234567890",
//       note: "Extra spicy",
//       addressToDeliver: {
//         textAddress: "123 Main St, City, Country",
//         mapLink: "https://maps.google.com",
//       },
//       orderStatus: "Open",
//     },
//     {
//       id: 2,
//       orderTime: "2024-04-07T11:45:00",
//       customerContact: "9876543210",
//       note: "No onions",
//       addressToDeliver: {
//         textAddress: "456 Elm St, City, Country",
//         mapLink: "https://maps.google.com",
//       },
//       orderStatus: "Fulfilled",
//     },
//     // Add more orders as needed
//   ]);


//   const [statusFilters, setStatusFilters] = useState({
//     Open: true,
//     Fulfilled: true,
//     Dispatched: true,
//     Cancelled: true,
//   });

//   // Function to toggle status filter
//   const toggleStatusFilter = (status) => {
//     setStatusFilters({
//       ...statusFilters,
//       [status]: !statusFilters[status],
//     });
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-semibold mb-6">Manage Orders</h2>
//       {/* Status Filters */}
//       <div className="flex mb-4">
//         {Object.keys(statusFilters).map((status) => (
//           <div key={status} className="mr-4">
//             <input
//               type="checkbox"
//               id={status}
//               checked={statusFilters[status]}
//               onChange={() => toggleStatusFilter(status)}
//               className="mr-2"
//             />
//             <label htmlFor={status}>{status}</label>
//           </div>
//         ))}
//       </div>
//       {/* Orders List */}
//       <div className="grid grid-cols-1 gap-6">
//         {/* Iterate over orders and display based on status filters */}
//         {orders.map((order) => (
//           // Check if the order status is enabled in filters
//           statusFilters[order.orderStatus] && (
//             <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
//               {/* Display order details */}
//               <h3 className="text-xl font-semibold mb-2">Order ID: {order.id}</h3>
//               <p>Order Time: {order.orderTime}</p>
//               <p>Contact: {order.customerContact}</p>
//               <p>Note: {order.note}</p>
//               <p>Address: {order.addressToDeliver.textAddress}</p>
//               <p>Status: {order.orderStatus}</p>
//             </div>
//           )
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageOrders;
