import React from 'react'

const Combos = () => {
    return (
        <div className="flex items-center justify-center min-h-screen text-gray-800">
            <div className="text-center p-6">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Coming Soon</h1>
                <p className="text-sm lg:text-lg md:text-xl mb-6">We are working hard to bring you something amazing. Stay tuned!</p>
                {/* <form className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-4 py-2 rounded-md w-full md:w-96 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold"
                    >
                        Notify Me
                    </button>
                </form> */}
            </div>
        </div>
    );
}

export default Combos