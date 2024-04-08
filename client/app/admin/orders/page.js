"use client";
import React, { useEffect, useState } from 'react';

import {
    orderSlice,
    useSelector,
    useDispatch,
    selectCount,
    incrementAsync,
    incrementIfOddAsync,
} from "@/lib/redux";



import Link from 'next/link';
import { usePathname } from 'next/navigation';
import OrderModal from '../../components/orderModal';

const ManageOrders = () => {
    const pathname = usePathname();
    const dispatch = useDispatch();


    const [orders, setOrders] = useState([]);
    const orderRedux = useSelector(state => state.orders.orders);


    useEffect(() => {
        setOrders(orderRedux);
    }, [orderRedux]);

    const temp = [
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
        }, {
            id: 3,
            orderTime: "2024-04-07T10:30:00",
            customerContact: "1234567890",
            note: "Extra spicy",
            addressToDeliver: {
                textAddress: "123 Main St, City, Country",
                mapLink: "https://maps.google.com",
            },
            orderStatus: "Cancelled",
            items: {
                3: 2,
                4: 1
            },
            deliveryFee: 5,
            totalBill: 35.98
        }, {
            id: 2,
            orderTime: "2024-04-07T10:30:00",
            customerContact: "1234567890",
            note: "Extra spicy",
            addressToDeliver: {
                textAddress: "123 Main St, City, Country",
                mapLink: "https://maps.google.com",
            },
            orderStatus: "Fulfilled",
            items: {
                3: 2,
                4: 1
            },
            deliveryFee: 5,
            totalBill: 35.98
        },
    ];


    const tempFunc = () => {

        dispatch(orderSlice.actions.setOrders(temp));
        // alert("Items set")
    }


    const [statusFilters, setStatusFilters] = useState({
        Open: true,
        Fulfilled: false,
        Dispatched: false,
        Cancelled: false,
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
            <h2 className="text-3xl font-semibold mt-2 mb-6">Manage Orders</h2>

            <div className="flex flex-col space-y-4 mb-5">
                <Link href="/admin/items" passHref>
                    <p className={`px-4 py-2 rounded-md focus:outline-none transition-colors duration-300 ease-in-out text-center ${pathname === '/admin/items' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}>
                        Manage Items
                    </p>
                </Link>
                <button onClick={tempFunc} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">Add Item</button>
            </div>

            <div className="flex mb-4">
                {Object.keys(statusFilters).map((status) => (
                    <div key={status} className="mr-4">
                        <button
                            type="button"
                            onClick={() => toggleStatusFilter(status)}
                            className={`mr-2 py-1 px-3 rounded-md focus:outline-none ${statusFilters[status] ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            {status}
                        </button>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-6">
                {orders.map((order) => (
                    statusFilters[order.orderStatus] && (
                        <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Order ID: {order.id}</h3>
                            <p className="ml-4">Order Time: {order.orderTime}</p>
                            <p className="ml-4">Address: {order.addressToDeliver.textAddress}</p>
                            <p className="ml-4">Status: {order.orderStatus}</p>
                            <button onClick={() => openOrderDetailsModal(order)} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 transition duration-300">
                                View Details
                            </button>
                        </div>
                    )
                ))}
            </div>
            <OrderModal isOpen={showOrderDetailsModal} onClose={handleCloseOrderDetailsModal} order={selectedOrder} />
        </div>
    );
};

export default ManageOrders;
