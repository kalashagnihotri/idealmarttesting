import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'animate.css';
import { Navbar, Footer, PriceCompareCal } from '@/components';
import AppRouter from './routers/AppRouter';
import { FiArrowUpCircle } from "react-icons/fi";
import { FaCalculator } from "react-icons/fa";

function App() {
  const topRef = useRef(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const location = useLocation();

  const scrollToTop = () => {
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  // Exclude specific routes and a folder (e.g., "/admin/*")
  const excludedRoutes = ['/register', '/dashboard', '/combos', '/combos/coming-soon', '/savings-and-spent', '/feedback'];
  const excludedFolders = ['/games', '/error', '/contests']; // Example folder path

  // Check if current route is excluded
  const isExcluded =
    excludedRoutes.some(route => location.pathname.startsWith(route)) || // Match excludedRoutes
    excludedFolders.some(folder => location.pathname.startsWith(folder)); // Match excludedFolders


  return (
    <>
      <div ref={topRef}>
        {/* Conditionally render Navbar */}
        {!isExcluded && <Navbar onTogglePopup={togglePopup} />}

        {/* Main Content (Router) */}
        <AppRouter />

        {/* Conditionally render Sticky Buttons */}
        {!isExcluded && (
          <>
            <button
              onClick={togglePopup}
              className="hidden xl:flex flex-col justify-center items-center gap-2 fixed bottom-1/2 right-4 bg-idl-green text-white p-2 rounded-sm shadow-lg border z-10"
            >
              <div className='text-[20px] lg:text-[25px]'>
                <FaCalculator />
              </div>
              <div className='flex flex-col text-[10px] font-medium'>
                <span>Compare</span>
                <span>Price</span>
              </div>
            </button>

            <button
              onClick={scrollToTop}
              className="fixed bottom-14 right-4 bg-white text-idl-green p-2 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:translate-y-[-2px] hover:shadow-xl border z-10"
              style={{
                background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1), inset 0px 4px 6px rgba(255, 255, 255, 0.6)",
              }}
            >
              <FiArrowUpCircle size="20px" />
            </button>
          </>
        )}

        {/* Popup Component */}
        <PriceCompareCal isVisible={isPopupVisible} onClose={togglePopup} />

        {/* Footer */}
        {!isExcluded && <Footer />}
      </div>
    </>
  );
}

export default App;
