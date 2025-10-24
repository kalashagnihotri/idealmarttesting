import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import Logo from "@/assets/navbar-img/logo.png";
import Headphone from '@/assets/navbar-img/icon-contact.svg';
// icons
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { PiCalculatorThin } from "react-icons/pi";

const Navbar = ({ onTogglePopup }) => {

    const location = useLocation();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    // Access the cart state from Redux
    const cart = useSelector((state) => state.cart.items);

    // Calculate the total quantity of items in the cart
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    const links = [
        { path: '/', label: 'Home' },
        { path: '/store', label: 'Store' },
        { path: '/about', label: 'AboutUs' },
        { path: '/contact', label: 'Contact' },
        { path: '/savings-and-spent', label: 'My Savings' }
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Function to handle scroll and toggle the sticky navbar
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        if (scrollTop > 100) { // Adjust this value as per requirement
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <>
            <div>
                {/* ----- Main Navbar ----- */}
                <div className='border-b w-full bg-white fixed z-50'>
                    <nav className="flex items-center justify-between py-3 px-4 md:px-8 lg:px-10 ">
                        <div className="flex items-center gap-14">
                            {/* Logo */}
                            <Link to="/" className='items-center'><img src={Logo} alt="Logo" className="h-7 md:h-8 xl:h-9" /></Link>

                            {/* Links for Large Screens */}
                            <span className="hidden lg:flex lg:gap-8 items-center pl-4">
                                {links.map((link, index) => (
                                    <Link
                                        key={index}
                                        to={link.path}
                                        className={`flex gap-2 items-center text-[16px] font-bold font-Quicksand text-[#253d4e] ${location.pathname === link.path ? 'text-green-600' : 'hover:text-idl-green'
                                            }`}
                                    >
                                        {link.label}
                                        {link.icon}
                                    </Link>
                                ))}
                            </span>
                        </div>

                        {/* Contact Us and discount */}
                        <div className="flex items-center gap-8">

                            <div className='flex lg:hidden items-center gap-2'>
                                {/* Calculator Icon */}
                                <div className="relative flex justify-center items-center cursor-pointer" onClick={onTogglePopup}>
                                    <PiCalculatorThin className="text-idl-text text-[22px] sm:text-[27px]" />
                                </div>

                                {/* Nav Menu */}
                                <div>
                                    <IoIosMenu
                                        className="text-2xl sm:text-3xl cursor-pointer"
                                        onClick={toggleSidebar}
                                    />
                                </div>
                            </div>

                            {/* Hotline Section */}
                            <div
                                className="hidden xl:flex items-center py-2"
                            >
                                <a href='mailto:admin@idealmart.ca' className='flex gap-2 font-semibold items-center'>
                                    <img src={Headphone} className='w-[37px]' />
                                    <span className='text-xl font-bold font-Quicksand text-[#253d4e] hover:text-idl-yellow'>Contact Us</span>
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div >

            {/* ----- Sidebar ----- */}
            < div
                className={`fixed top-0 left-0 h-full w-64 bg-white z-[60] transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`
                }
                onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the sidebar
            >
                <div className="flex justify-between items-center mb-3 p-4 border-b">
                    <Link to='/' onClick={toggleSidebar}>
                        <img src={Logo} alt='Logo' className='h-7 md:h-8' />
                    </Link>
                    <IoMdClose className="text-2xl cursor-pointer" onClick={toggleSidebar} />
                </div>

                {/* Search Bar */}
                <div className="flex items-center gap-2 p-4">
                    <input
                        type="text"
                        placeholder="Search for items..."
                        className="w-full py-1.5 pl-4 pr-3 text-xs border rounded-full focus:outline-none"
                    />
                    <FaSearch className="absolute left-52 text-gray-400 text-xs" />
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-5 p-4">
                    {links.map((link, index) => (
                        <Link key={index} to={link.path} className="text-sm" onClick={toggleSidebar}>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Copyright Notice */}
                <div className="absolute bottom-4 left-0 w-full text-center text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} <span className='text-[#275f61] font-semibold'>!DealMart</span> All rights reserved
                </div>
            </div >

            {/* Overlay for Sidebar */}
            {
                isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-[55]"
                        onClick={toggleSidebar} // Close sidebar when clicking on overlay
                    />
                )
            }
        </>
    )
}

export default Navbar