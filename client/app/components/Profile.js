"use client";
import React, { useState, useEffect} from 'react';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('Taimoor Ansari');
    const [email, setEmail] = useState('taimoor.ansari432@gmail.com');
    const [contactNumber, setContactNumber] = useState('033633468547');
    const [address, setAddress] = useState('R13, Block 13, Gulshan-e-Iqbal, Karachi, Pakistan');

    useEffect(() => {
        // Fetch the user profile data when the component mounts
        getprofile();
    }
    , []);

    const host = "http://localhost:3000";

    const getprofile = async () => {
        try {
            console.log("Fetching user profile");
            const mytoken = localStorage.getItem('token');
            const response = await fetch(`${host}/api/customers/getuser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': mytoken,
                },
            });
            if (response.ok) {
                const user = await response.json();
                // Update the state with the fetched user data
                setName(user.name);
                setEmail(user.email);
            } else {
                console.error('Failed to fetch user profile');
            }
        } catch (error) {
            console.error('Failed to fetch user profile', error);
        }
    };
    
     


    const handleSave = () => {
        // Save the updated profile information
        // You can implement the logic to save the data to your backend here
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center m-auto w-3/4 mt-20">
            <div className="bg-gray-50 shadow-md rounded-lg p-8 w-full">
                <h1 className="text-2xl font-bold mb-4">Profile</h1>
                <div className="mb-4">
                    <label className="block mb-2 font-bold" htmlFor="name">
                        Name
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            id="name"
                            className="border border-gray-300 p-2 w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    ) : (
                        <p>{name}</p>
                    )}
                </div>
                {!isEditing && (
                    <div className="mb-4">
                        <label className="block mb-2 font-bold" htmlFor="email">
                            Email
                        </label>
                        <p>{email}</p>
                    </div>
                )}
                <div className="mb-4">
                    <label className="block mb-2 font-bold" htmlFor="contactNumber">
                        Contact Number
                    </label>
                    {isEditing ? (
                        <input
                            type="tel"
                            id="contactNumber"
                            className="border border-gray-300 p-2 w-full"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                        />
                    ) : (
                        <p>{contactNumber}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold" htmlFor="address">
                        Address
                    </label>
                    {isEditing ? (
                        <textarea
                            id="address"
                            className="border border-gray-300 p-2 w-full"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    ) : (
                        <p>{address}</p>
                    )}
                </div>
                {isEditing ? (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                ) : (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                )}


                {isEditing && (<button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsEditing(false)} // Cancel button
                >
                    Cancel
                </button>)}


            </div>
        </div>
    );
};

export default Profile;
