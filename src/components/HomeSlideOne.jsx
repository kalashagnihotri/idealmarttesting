import React, { useState, useEffect } from 'react';
import Slider1Img from '@/assets/Home-Banner-img/slider-1.png';
import Slider2Img from '@/assets/Home-Banner-img/slider-2.png';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import AppStore from '@/assets/Home-Banner-img/app-store.jpg';
import GooglePlay from '@/assets/Home-Banner-img/google-play.jpg';

const slides = [
    {
        image: Slider1Img,
        heading: "Your Savings, Our Priority",
        description: "Start your savings journey today with our exclusive offers,easy-to-use app, and trusted South Asian stores.",
    },
    {
        image: Slider2Img,
        heading: "Shop Smart, Save Big on Grocery and Food!",
    },
];

const HomeSlideOne = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    let touchStartX = 0;

    const prevSlide = () => {
        setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
    };

    const nextSlide = () => {
        setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
    };

    // Automatic sliding effect
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [currentIndex]);

    // Handle swipe gestures for mobile users
    const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) {
            // Swipe left
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            // Swipe right
            prevSlide();
        }
    };

    return (
        <>
            <div
                className=' md:py-6 lg:py-8 w-full h-[300px] md:h-[400px] lg:h-[550px] relative group'
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
                    className='w-full h-full rounded-2xl bg-center bg-cover transition-all duration-1000 ease-in-out'
                >
                    {/* Text Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-center items-start p-5 py-4 pr-6 md:p-8 lg:p-12 transition-all duration-1000 ease-in-out">
                        <div
                            className="flex flex-col md:gap-2 text-left font-Quicksand items-start max-w-md md:max-w-lg xl:max-w-3xl md:min-h-[130px] xl:min-h-[150px]"
                        >
                            <h2 className="text-[28px] md:text-3xl lg:text-5xl font-bold leading-tight md:leading-none text-[#253d4e] mb-1">
                                {slides[currentIndex].heading}
                            </h2>
                            {slides[currentIndex].description && (
                                <p className="text-[12px] font-medium md:font-normal md:text-lg lg:text-xl text-gray-600 pr-8 md:pr-20 lg:pr-0">
                                    {slides[currentIndex].description}
                                </p>
                            )}
                        </div>

                        {/* App Store Links */}
                        <div className="mt-3 md:mt-4">
                            <p className="text-sm md:text-base lg:text-xl mb-1 font-bold font-Quicksand text-[#253d4e]">Install App</p>
                            <p className="text-xs md:text-sm mb-3 text-[#406178]">From App Store or Google Play</p>
                            <div className="flex gap-4">
                                <a href='https://play.google.com/store/apps/details?id=com.idealmart.user'>
                                    <img src={GooglePlay} alt='GooglePlay' className='w-[100px] md:w-24 lg:w-28 rounded-full hover:-translate-y-1 transform transition' />
                                </a>

                                <a href='https://apps.apple.com/in/app/idealmart/id6736567166'>
                                    <img src={AppStore} alt='AppStore' className='w-[100px] md:w-24 lg:w-28 rounded-full hover:-translate-y-1 transform transition' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Left Arrow */}
                <div
                    className='hidden group-hover:block absolute top-1/2 left-6 text-sm lg:text-2xl rounded-full p-2 bg-white text-black cursor-pointer transform -translate-y-1/2'
                    onClick={prevSlide}
                >
                    <BsChevronCompactLeft />
                </div>
                {/* Right Arrow */}
                <div
                    className='hidden group-hover:block absolute top-1/2 right-6 text-sm lg:text-2xl rounded-full p-2 bg-white text-black cursor-pointer transform -translate-y-1/2'
                    onClick={nextSlide}
                >
                    <BsChevronCompactRight />
                </div>
            </div>
        </>
    );
};

export default HomeSlideOne;
