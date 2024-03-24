

const About = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-2xl px-4 py-8 mx-auto">
                <h1 className="text-3xl font-bold text-center">Welcome to Burger Bar</h1>
                <p className="mt-4 text-lg text-center">
                    We are a burger restaurant dedicated to serving delicious and mouthwatering burgers to our customers.
                </p>
                <div className="mt-8">
                    <h2 className="text-2xl font-bold">Our Story</h2>
                    <p className="mt-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc id aliquam ultrices, elit
                        mauris tincidunt nunc, ac lacinia nisl risus in nunc. Sed euismod, nunc id aliquam ultrices, elit mauris
                        tincidunt nunc, ac lacinia nisl risus in nunc.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;