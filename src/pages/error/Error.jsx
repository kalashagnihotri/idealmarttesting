import React from 'react';
import NotFound from '@/assets/Home-Banner-img/notfound.gif';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-scree pt-[90px] md:pt-[110px] px-4 md:px-8 lg:px-10 mb-10">
      <img
        src={NotFound}
        alt="404 Not Found"
        className="w-1/2 md:w-1/6 lg:w-1/6"
      />
      <h1 className="text-xl md:text-4xl font-Quicksand font-bold text-gray-800 mt-4">Oops! Page not found</h1>
      <p className="text-xs text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
      {/* <button
        onClick={() => (window.location.href = '/')}
        className="mt-8 px-5 py-2 bg-idl-green text-white text-xs font-medium rounded-full shadow-md hover:bg-idl-yellow hover:text-idl-text transition duration-5000 ease-in-out animate-pulse"
      >
        Back to Home
      </button> */}
    </div>
  );
};

export default Error;
