import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// banner image
import AppStore from '@/assets/Home-Banner-img/app-store.jpg';
import GooglePlay from '@/assets/Home-Banner-img/google-play.jpg';

import Vegetable from "@/assets/Home-Banner-img/vegetable.png";
import Drink from "@/assets/Home-Banner-img/drink.png";
import Grocery from "@/assets/Home-Banner-img/grocery.png"
import Food from "@/assets/Home-Banner-img/food.png"

const HomeFirstBanners = () => {
    const slides = [
        {
            id: 1,
            title: 'For Best Experience',
            // subtitle: 'Good Quality',
            price: '$59.00',
            buttonText: 'Shop Now',
            bgGradient: 'bg-gradient-to-l from-green-100 to-green-300',
            image: Vegetable,
            label: '100% Farm Fresh Food',
            buttonColor: 'bg-green-600',
            buttonHoverColor: 'hover:bg-green-700',
        },
        {
            id: 2,
            title: 'Discount On Beverage',
            subtitle: '100% Salted Drinks',
            price: '$15.00',
            buttonText: 'Shop Now',
            bgGradient: 'bg-gradient-to-l from-blue-100 to-blue-300',
            image: Drink,
            label: null,
            buttonColor: 'bg-blue-600',
            buttonHoverColor: 'hover:bg-blue-700',
        },
        {
            id: 3,
            title: 'Save Big on Groceries',
            subtitle: 'Top Quality Product',
            price: null,
            buttonText: 'Shop Now',
            bgGradient: 'bg-gradient-to-l from-gray-100 to-gray-300',
            image: Grocery,
            label: null,
            buttonColor: 'bg-gray-500',
            buttonHoverColor: 'hover:bg-gray-300',
        },
        {
            id: 4,
            title: 'Shop Smart',
            subtitle: 'Food For All',
            price: null,
            buttonText: 'Shop Now',
            bgGradient: 'bg-gradient-to-l from-purple-100 to-purple-300',
            image: Food,
            label: '15% OFF',
            buttonColor: 'bg-purple-600',
            buttonHoverColor: 'hover:bg-purple-700',
        },
    ];

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        // arrows: true,
        centerMode: true,
        centerPadding: '5%', // Display 5% of the previous and next card
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <section className="container mx-auto px-2 xl:px-0 overflow-hidden">
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="relative w-full h-[200px] sm:h-[250px] md:h-[350px] xl:h-[450px] group"
                    >
                        {/* Gradient Background */}
                        <div
                            className={`absolute inset-0 ${slide.bgGradient} w-full h-full rounded-lg`}
                        ></div>

                        {/* Image */}
                        <div className="absolute inset-0 w-full h-full flex justify-end">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="h-full w-4/5 sm:h-full sm:w-auto object-contain sm:object-cover"
                                style={{
                                    right: "5%",
                                    position: "absolute",
                                }}
                            />
                        </div>

                        {/* Hover Background */}
                        {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition duration-300 rounded-lg"></div> */}

                        {/* Text and Button */}
                        <div className="absolute inset-0 flex flex-col justify-end items-center sm:items-start text-center sm:text-left text-white lg:text-[#253d4e] p-2 sm:px-4 md:p-8">
                            {slide.label && (
                                <div className="inline-flex text-[10px] sm:text-[12px] md:text-xs lg:text-base bg-red-500 text-white font-medium px-2 sm:px-3 py-1 rounded-full mb-2">
                                    {slide.label}
                                </div>
                            )}
                            <h2 className="text-sm sm:text-lg md:text-xl lg:text-5xl font-bold md-1 md:mb-2">
                                {slide.title}
                            </h2>
                            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium mb-2 md:mb-3">
                                {slide.subtitle}
                            </p>
                            {/* {slide.price && (
                                <div className="text-sm sm:text-base md:text-2xl font-bold mb-4">
                                    {slide.price}
                                </div>
                            )} */}

                            <div className='mb-2'>
                                <h3 className='text-base md:text-3xl font-bold'>Install App</h3>
                                <p className='text-xs md:text-lg font-medium'>From App Store or Google Play</p>
                            </div>

                            <span className='flex gap-2'>
                                <a href='#'><img src={GooglePlay} alt='GooglePlay' className='w-16 md:w-28 rounded-full hover:-translate-y-1 transform transition' /></a>
                                <a href='#'><img src={AppStore} alt='AppStore' className='w-16 md:w-28 rounded-full hover:-translate-y-1 transform transition' /></a>
                            </span>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>

    );
};

export default HomeFirstBanners;
