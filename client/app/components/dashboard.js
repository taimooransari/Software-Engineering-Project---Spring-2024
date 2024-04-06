import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Dashboard = () => {
    const pathname = usePathname();

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>
            <div className="flex mb-4">
                <p className={`px-4 py-2 mr-4 rounded-md focus:outline-none ${pathname === '/admin/items' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    <Link href="/admin/items" legacyBehavior>

                        Manage Items

                    </Link></p>
                    
                <p className={`px-4 py-2 rounded-md focus:outline-none ${pathname === '/admin/orders' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    <Link href="/admin/orders" legacyBehavior>

                        Manage Orders

                    </Link></p>
            </div>
            {/* Content for managing items and orders will be rendered by the Router */}
        </div>
    );
};

export default Dashboard;
