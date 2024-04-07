import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Dashboard = () => {
    const pathname = usePathname();

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center h-screen">
            <h2 className="text-3xl font-semibold mb-4">Admin Panel</h2>
            <div className="flex flex-col space-y-4">
                <Link href="/admin/items" passHref>
                    <p className={`px-4 py-2 rounded-md focus:outline-none transition-colors duration-300 ease-in-out text-center ${pathname === '/admin/items' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}>
                        Manage Items
                    </p>
                </Link>
                <Link href="/admin/orders" passHref>
                    <p className={`px-4 py-2 rounded-md focus:outline-none transition-colors duration-300 ease-in-out text-center ${pathname === '/admin/orders' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}>
                        Manage Orders
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
