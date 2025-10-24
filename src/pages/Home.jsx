import { CategoryCarousel, HomeFirstBanners, HomeProducts } from '@/components';

import React, { useRef, useState } from 'react'
import { HomeSlideOne, OldCategoriesCarousel, ReviewsCarousel } from '@/components';
// import AppStore from '../assets/footerimage/app-store.jpg';
// import GooglePlay from '../assets/footerimage/google-play.jpg';
import IntroVideo from '@/assets/Home-Banner-img/intro.mp4';
import LeftImg from '@/assets/Home-Banner-img/l4.png';

import { FiArrowUpCircle } from "react-icons/fi";
import { FaCalculator } from "react-icons/fa";

// Discover icons
import Icon1 from '@/assets/Home-Banner-img/icons/icon-1.svg';
import Icon2 from '@/assets/Home-Banner-img/icons/icon-2.svg';
import Icon3 from '@/assets/Home-Banner-img/icons/icon-3.svg';
import Icon5 from '@/assets/Home-Banner-img/icons/icon-5.svg';

// saving icons
import Deals from '@/assets/Home-Banner-img/deals.png';
import Ts from '@/assets/Home-Banner-img/ts.png';
import En from '@/assets/Home-Banner-img/en.png';
import Qa from '@/assets/Home-Banner-img/qa.png';

// import ReviewsCarousel from '../components/ReviewsCarousel';
// import CategoriesCarousel from '../components/CategoriesCarousel';




// Discover Deals data
const DiscoverDealsData = [
    {
        src: Icon1,
        title: 'Register for Free Trial',
        desc: 'Sign up on our app for a free 30-day free trial'
    },
    {
        src: Icon2,
        title: 'Browse Deals for Free',
        desc: 'Checkout the deals available for free'
    },
    {
        src: Icon3,
        title: 'Enjoy Your Savings',
        desc: 'Purchase the items in your shopping list at your favorite South Asian stores to save money'
    },
    {
        src: Icon5,
        title: 'Choose Subscription',
        desc: 'Pick a subscription plan to access advanced features like shopping list, favorites, rewards program etc'
    },
]


// saving, priority data
const SavingData = [
    {
        src: Deals,
        title: 'Handpicked Deals',
        desc: 'Carefully selected offers to ensure you get the best value.'
    },
    {
        src: Ts,
        title: 'Trusted South Asian Stores',
        desc: 'Only the best South Asian stores with the highest quality products.'
    },
    {
        src: En,
        title: 'Easy Navigation',
        desc: 'User-friendly app design to make your shopping experience seamless.'
    },
    {
        src: Qa,
        title: 'New Features',
        desc: 'Exciting new features like favorite shopping list with AI-generated deals, price lock and more.'
    },
];


const Home = () => {

    return (
        <div className='pt-[80px] md:pt-[70px] px-4 md:px-8 lg:px-10'>

            {/* -----Top Category Carousel----- */}
            {/* <CategoryCarousel /> */}

            {/* -----First offer banner grid----- */}
            {/* <HomeFirstBanners /> */}


            {/*--------------- Old Version ---------------*/}
            {/* Main Page Content */}
            {/* -----First SlideImage section------ */}
            <section>
                <HomeSlideOne />
            </section>

            {/* -----Categories section----- */}
            <section>
                <OldCategoriesCarousel />
            </section>

            {/* -----Product Slide----- */}
            <section>
                <HomeProducts />
            </section>

            {/* -----Discover deals section----- */}
            <section className=" py-4 flex flex-col items-center gap-4 xl:my-4">
                <h1 className="text-[35px] lg:text-3xl text-[#253d4e] font-bold md:mb-6 text-center font-Quicksand">Discover Deals in Just a Few Steps</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
                    {DiscoverDealsData.map((item, index) => (
                        <div
                            key={index}
                            className="flex-1 p-4 md:p-5 bg-white rounded-lg border hover:shadow-md text-center"
                        >
                            <img
                                src={item.src}
                                alt={item.title}
                                className=" w-10 md:w-12 lg:w-16 h-10 md:h-12 lg:h-16 mx-auto mb-4"
                            />
                            <h3 className="text-lg font-Quicksand font-bold mb-2 text-[#253d4e]">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* -----Savings and Priority Section----- */}
            <section className="pb-4 flex flex-col items-center gap-6 my-5">
                <h1 className="text-[35px] lg:text-3xl text-[#253d4e] font-bold md:mb-6 text-center font-Quicksand">Your Savings, Our Priority</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {SavingData.map((item, index) => (
                        <div
                            key={index}
                            className="flex-1 p-4 md:p-5 bg-white rounded-lg border hover:shadow-md text-center"
                        >
                            <img
                                src={item.src}
                                alt={item.title}
                                className=" w-10 md:w-12 lg:w-16 h-10 md:h-12 lg:h-16 mx-auto mb-4"
                            />
                            <h3 className="text-lg font-Quicksand font-bold mb-2 text-[#253d4e]">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* -----Key Benefits Section----- */}
            <section className="flex flex-col md:flex-row items-center py-4 my-5 md:my-8 lg:my-12 gap-6 lg:gap-10">
                {/* Image */}
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                    <img
                        src={LeftImg}
                        alt="image"
                        className="w-full h-auto rounded-lg"
                    />
                </div>
                {/* Text */}
                <div className="w-full md:w-1/2 text-left">
                    <span className='text-xl font-bold text-gray-400 font-Quicksand'>Key Benefits</span>
                    <h2 className="text-[35px] lg:text-3xl text-[#253d4e] font-bold mb-4 font-Quicksand">Enjoy Real-Time Deals and Effortless Savings</h2>
                    <p className="text-gray-600 text-sm lg:text-base grid gap-1">
                        <span>
                            Enjoy features like real-time deal alerts, deals of the week that set us apart.
                        </span>
                        <span>
                            Enjoy a seamless end-to-end experience that allows you to score the best deals at your favorite desi stores with new exciting features planned soon.
                        </span>
                    </p>
                </div>
            </section>

            {/* -----Video Section----- */}
            <section className=" flex flex-col items-center gap-6 my-5">
                {/* Heading */}
                <h2 className="text-[35px] lg:text-3xl text-[#253d4e] font-bold font-Quicksand mb-3 text-center">Watch Our Story</h2>

                {/* Video */}
                <div className="w-full max-w-5xl">
                    <video
                        controls
                        className="w-full rounded-lg shadow-md"
                    >
                        <source src={IntroVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </section>

            {/* -----Reviews Carousel Section----- */}
            <section>
                <ReviewsCarousel />
            </section>
        </div>
    )
}

export default Home