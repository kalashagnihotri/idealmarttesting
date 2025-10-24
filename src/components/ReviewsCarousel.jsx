import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// mock data
const data = [
    {
        id: 1,
        name: "Chetan",
        place: "Mississauga, ON",
        review: "DealMart is my go-to app for shopping. It’s convenient and I always find what I need at great prices. The deals are fantastic!"
    },
    {
        id: 2,
        name: "Roop",
        place: "Mississauga, ON",
        review: "I love the variety of products available on !DealMart. It's like having a local market at my fingertips. Highly recommended!"
    },
    {
        id: 3,
        name: "Pooja",
        place: "Mississauga, ON",
        review: "As a busy mom, !DealMart makes it so easy to get everything I need at the best prices. The quality of products from trusted South Asian stores is always top-notch. It's a game-changer!"
    },
    {
        id: 4,
        name: "Ajaib",
        place: "Mississauga, ON",
        review: "!DealMart has completely changed how I shop for Groceries and Food. The app is user-friendly, and I always find fantastic deals on my favorite South Asian products. I highly recommend it!"
    },
    {
        id: 5,
        name: "Sathvik",
        place: "Mississauga, ON",
        review: "Partnering with !DealMart has significantly boosted my store's sales. The exposure to a wider audience and the support from the !DealMart team have been invaluable."
    },
];

const ReviewsCarousel = () => {
    // carousel settings
    const settings = {
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 10000, // Large screens
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 1024, // Medium screens
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640, // Small screens
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className=" overflow-hidden">
            <div className='flex flex-col text-center gap-5 py-8 mb-2 md:mb-6 lg:mb-10'>
                <h1 className='text-[35px] md:text-2xl lg:text-3xl text-[#253d4e] font-bold font-Quicksand mb-2 md:mb-4'>What Our Users are Saying
                </h1>
                <Slider {...settings}>
                    {data.map((review) => (
                        <div
                            key={review.id}
                            className="w-full h-[190px] p-3 md:p-4 bg-white rounded-lg border"
                        >
                            <div className='flex flex-col overflow-hidden h-full items-center justify-center'>
                                <div>
                                    <h3 className="text-xs md:text-sm font-semibold text-[#253d4e]">{review.name}</h3>
                                    <p className="text-[8px] xs:text-[10px] text-gray-500">{review.place}</p>
                                </div>
                                <p className="text-[10px] xs:text-[12px] md:text-[13px] text-gray-600 mt-2 overflow-hidden">
                                    {review.review}
                                </p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ReviewsCarousel;
