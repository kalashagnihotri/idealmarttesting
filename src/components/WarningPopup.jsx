import React from "react";

const WarningPopup = ({ message }) => {
    if (!message) return null; // Don't render if there's no message

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-4/5">
                <h2 className="text-xl font-Quicksand font-bold mb-2 text-red-600">Sorry</h2>
                <p className="text-gray-700 text-xs">{message}</p>
                <div className="mt-4 flex justify-end">
                </div>
            </div>
        </div>
    );
};

export default WarningPopup;
