import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/assets/footer-img/logo.png';
import GooglePlay from '@/assets/footer-img/google-play.jpg';
import AppStore from '@/assets/footer-img/app-store.jpg';
import Payment from '@/assets/footer-img/payment-method.png';

// import { CiLocationOn } from "react-icons/ci";
// import { LuPhoneCall } from "react-icons/lu";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {

    const Links = [
        {
            title: 'Available In',
            links: [
                { path: '#', label: 'Mississauga' },
                { path: '#', label: 'Brampton' },
                { path: '#', label: 'Malton' },
                { path: '#', label: 'Toronto (Coming Soon)' },
                { path: '#', label: 'Scarborough (Coming Soon)' },
            ],
        },
        {
            title: 'Company',
            links: [
                { path: '/about', label: 'About' },
                { path: '/privacy-policy', label: 'Privacy Policy' },
                { path: '/faqs', label: 'FAQs' },
                { path: '/contact', label: 'Contact' },
            ],
        },
    ];

    return (
        <div>
            {/* ----------upper footer---------- */}
            <div className='bg-[#edf7f1]'>
                <div className='px-4 md:px-8 lg:px-10 py-7 md:py-10 grid md:grid-cols-2 gap-2 lg:gap-8 items-center'>
                    <div className='md:pr-8 grid gap-5 lg:gap-8'>
                        <h2 className='text-[35px] lg:text-3xl text-[#253d4e] font-Quicksand font-bold leading-tight lg:leading-normal'>Unlock the best deals on South Asian Groceries and Food with !DealMart</h2>
                        <span className='text-xs font-medium'>Start Your Daily Shopping with <span className='text-idl-green font-medium'>!DealMart</span></span>
                    </div>

                    <div className='grid gap-3'>
                        <span className='text-xs md:text-sm'>Join the revolution in smart shopping and start saving today. Whether you're a customer looking for the best deals or a business aiming to reach more customers, !DealMart is your perfect partner.</span>
                        <span>
                            <h3 className='text-lg font-bold font-Quicksand'>For Customers</h3>
                            <span className='text-xs'>From App Store or Google Play</span>
                        </span>
                        <span className='flex gap-2'>
                            <a href='https://play.google.com/store/apps/details?id=com.idealmart.user'><img src={GooglePlay} alt='GooglePlay' className='w-24 hover:-translate-y-1 transform transition' /></a>
                            <a href='https://apps.apple.com/in/app/idealmart/id6736567166'><img src={AppStore} alt='AppStore' className='w-24 hover:-translate-y-1 transform transition' /></a>
                        </span>
                    </div>
                </div>
            </div>

            {/* ----------lower footer---------- */}
            <div className='text-gray-700'>
                <footer className="flex flex-col items-center w-full px-4 md:px-8 lg:px-10 py-4">

                    {/* ----upper section---- */}
                    <section className='grid lg:grid-cols-5 md:grid-cols-2 gap-3 w-full py-6'>

                        {/* first div */}
                        <div className='flex flex-col gap-4 pr-3 col-span-2'>
                            <Link to="/"><img src={Logo} alt="Logo" className="h-7 sm:h-8 md:h-9 lg:h-9" /></Link>
                            <span className='text-xs font-medium'>
                                Best deals from your favorite South Asian stores, offering quality products at unbeatable prices.
                            </span>
                            {/* <div className='flex flex-col gap-2'>
                                <span className='flex gap-2 items-center'>
                                    <CiLocationOn className='text-lg' />
                                    <span className='text-xs font-medium'>23/A Road, Newyork City</span>
                                </span>
                                <span className='flex gap-2 items-center'>
                                    <LuPhoneCall />
                                    <span className='text-xs font-medium'>+0000-000-000</span>
                                </span>
                            </div> */}
                            <span className='flex gap-2'>
                                <a href='#' className='bg-slate-100 hover:bg-idl-yellow text-idl-green hover:text-idl-text p-1.5 rounded-full lg:hover:-translate-y-1 transform transition text-sm'><FaFacebookF /></a>
                                <a href='#' className='bg-slate-100 hover:bg-idl-yellow text-idl-green hover:text-idl-text p-1.5 rounded-full lg:hover:-translate-y-1 transform transition text-sm'><FaInstagram /></a>
                                {/* <a href='#' className='bg-slate-100 hover:bg-idl-yellow text-idl-green hover:text-idl-text p-1.5 rounded-full lg:hover:-translate-y-1 transform transition text-sm'><FaXTwitter /></a> */}
                            </span>
                        </div>

                        {/* Dynamically generate the sections based on Links array */}
                        {Links.map((section, index) => (
                            <div key={index} className='flex flex-col gap-4'>
                                <h3 className='text-lg font-bold font-Quicksand'>{section.title}</h3>
                                <span className='flex flex-col text-xs font-medium gap-3'>
                                    {section.links.map((link, index) => (
                                        <Link key={index} to={link.path} className='hover:text-idl-green hover:translate-x-1 transform transition duration-300 ease-in-out'>
                                            {link.label}
                                        </Link>
                                    ))}
                                </span>
                            </div>
                        ))}

                        {/* Last div */}
                        <div className='flex flex-col gap-4'>
                            <h3 className='text-xl font-bold font-Quicksand'>Install App</h3>
                            <span className='text-xs'>From App Store or Google Play</span>
                            <span className='flex gap-2'>
                                <a href='https://play.google.com/store/apps/details?id=com.idealmart.user'><img src={GooglePlay} alt='GooglePlay' className='w-26 xl:w-28 hover:-translate-y-1 transform transition' /></a>
                                <a href='https://apps.apple.com/in/app/idealmart/id6736567166'><img src={AppStore} alt='AppStore' className='w-26 xl:w-28 hover:-translate-y-1 transform transition' /></a>
                            </span>
                        </div>
                    </section>

                    {/* ----lower section---- */}
                    <section className='flex justify-center items-center w-full pt-6 pb-2 border-t'>
                        <span className='text-[14px] md:text-xs'>
                            &copy; {new Date().getFullYear()} <span className='font-semibold text-idl-green'>!DealMart</span> All rights reserved
                        </span>
                        {/* <span>
                            <img src={Payment} alt='Payment' className='w-40' />
                        </span> */}
                    </section>
                </footer>
            </div>
        </div>
    );
};

export default Footer;
