import React from 'react';

const About = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" 
             style={{ backgroundImage: "url('/Logo.jpeg')", opacity:0.9 }}>
            <div className="max-w-2xl px-4 py-8 mx-auto bg-white bg-opacity-85">
                <h1 className="text-3xl font-bold text-center">Welcome to Burger Bar</h1>
                <p className="mt-4 text-lg text-center">
                    We are a burger restaurant dedicated to serving delicious and mouthwatering burgers to our customers.
                </p>
                <div className="mt-8">
                    <h2 className="text-2xl font-bold">Our Story</h2>
                    <p className="mt-4">
                    This cozy spot in town is perfect for anyone who loves a good burger. Here at Burger Bar, we use fresh ingredients to make our tasty burgers just right for you. Whether you want a classic burger or something new, we have something for everyone. It's a great place to relax and enjoy good food with friends. Come visit us at Burger Bar and taste the difference!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
