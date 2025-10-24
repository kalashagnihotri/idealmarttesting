import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent } from "@/components/ui/card";
import { DownloadPopUp } from '@/components';
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const TopFoodOffersSlide = ({ head, img, products, categories }) => {
    const sliderRef = useRef(null); // Reference for the slider
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [isPopUpVisible, setPopUpVisible] = useState(false);

    // Randomize products when "All" is active
    useEffect(() => {
        if (activeCategory === "All") {
            const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
            setFilteredProducts(shuffledProducts);
        } else {
            setFilteredProducts(
                products.filter((product) => product.category === activeCategory)
            );
        }
    }, [activeCategory, products]);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    const settings = {
        infinite: true, // Disable infinite scroll
        speed: 500,
        slidesToShow: Math.min(filteredProducts.length, 5), // Show at most 4 slides, but limit to available products
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: false,
        centerMode: false, // Disable centering of slides
        centerPadding: '0%', // Remove padding around the center
        responsive: [
            {
                breakpoint: 1280, // Below large screens
                settings: {
                    slidesToShow: Math.min(filteredProducts.length, 3), // Show at most 3 slides, but limit to available products
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1023, // Below large screens
                settings: {
                    slidesToShow: Math.min(filteredProducts.length, 2), // Show at most 2 slides, but limit to available products
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600, // Below medium screens
                settings: {
                    slidesToShow: Math.min(filteredProducts.length, 2), // Show at most 1 slide, but limit to available products
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div>
            <div className="pb-8">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row justify-between">
                        <span className="text-xl md:text-2xl lg:text-3xl text-[#253d4e] font-bold font-Quicksand">{head}</span>
                        <div className="flex items-center gap-4">
                            {/* <ul className="flex gap-2 text-xs font-medium">
                                {categories.map((category, index) => (
                                    <li
                                        key={index}
                                        className={`cursor-pointer ${activeCategory === category
                                            ? "text-green-600"
                                            : "text-gray-500"
                                            }`}
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul> */}
                            <div className="hidden xl:flex gap-2">
                                <button
                                    className="border p-1.5 rounded-sm"
                                    onClick={() => sliderRef.current.slickPrev()} // Go to the previous slide
                                >
                                    <MdOutlineKeyboardArrowLeft />
                                </button>
                                <button
                                    className="border p-1.5 rounded-sm"
                                    onClick={() => sliderRef.current.slickNext()} // Go to the next slide
                                >
                                    <MdOutlineKeyboardArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Slider {...settings} ref={sliderRef}>
                            {filteredProducts.map((data, index) => (
                                <div key={index}>
                                    <Card>
                                        <div className="relative">
                                            {/* Image Container */}
                                            <div className="w-full h-40 md:h-60 overflow-hidden rounded-lg">
                                                <img
                                                    src={data.image_url}
                                                    alt={data.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            {/* Overlay Content */}
                                            <div className="absolute inset-0 flex flex-col justify-between p-2 md:p-3 bg-gradient-to-t from-black/75 via-transparent to-transparent rounded-lg">
                                                {/* Top: Category and Heart Icon */}
                                                <div className="flex justify-between items-center">
                                                    {/* Category */}
                                                    <span className="text-[10px] md:text-xs text-white bg-black/60 font-semibold px-2 py-0.5 md:py-1 rounded-sm">
                                                        {data.storeName}
                                                    </span>
                                                    {/* Heart Icon */}
                                                    {/* <FaHeart className="text-red-600 text-sm cursor-pointer" /> */}
                                                </div>

                                                <div className="grid gap-2 md:gap-3">
                                                    {/* Middle: Discount, Price, Product Info, and Rating */}
                                                    <div className="flex flex-col items-start gap-1">
                                                        {/* Discount */}
                                                        <span
                                                            className="bg-red-500 text-white text-[8px] md:text-xs px-1 md:px-3 py-0.5 md:py-3 font-semibold flex items-center"
                                                            style={{
                                                                clipPath:
                                                                    "polygon(50% 0, 100% 0, 100% 0, 95% 50%, 100% 100%, 100% 100%, 62% 100%, 0 100%, 0 0, 0 0)",
                                                                height: "1rem",
                                                            }}
                                                        >
                                                            {`${data.discount_percentage}%`}
                                                        </span>
                                                        {/* Price */}
                                                        <div className="flex gap-2 items-center">
                                                            {data.discount_price ? (
                                                                <>
                                                                    <span className="text-[12px] md:text-sm font-semibold line-through text-idl-yellow">
                                                                        {`${data.price}$`}
                                                                    </span>
                                                                    <span className="text-[10px] md:text-base font-semibold text-white">
                                                                        {`${data.discount_price}$`}
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <span className="text-[10px] md:text-base font-semibold">
                                                                    {`${data.price}$`}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {/* Product Name */}
                                                        <span className="text-[10px] md:text-sm text-white font-semibold line-clamp-2">
                                                            {data.name}
                                                        </span>
                                                        {/* Rating */}
                                                        {/* <div className="flex items-center gap-2">
                        <RatingStars rating={data.rating} />
                        <span className="text-[10px] text-white font-semibold">
                            {data.rating}
                        </span>
                    </div> */}
                                                    </div>

                                                    {/* Bottom: Select Option Button */}
                                                    <button className="flex w-full items-center justify-center gap-2 bg-idl-green hover:bg-idl-yellow text-white hover:text-idl-text rounded-full px-2 py-1.5 md:px-4 md:py-2 shadow-sm hover:shadow-md transition-all duration-300"
                                                        onClick={() => setPopUpVisible(true)}>
                                                        <span className="text-[10px] md:text-sm font-semibold">
                                                            Add to Cart
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </Slider>
                    </div>

                    {/* Conditional banner */}
                    {img && (
                        <div className="w-full">
                            <img
                                src={img}
                                alt="Banner"
                                className="w-full h-auto object-cover rounded-md"
                            />
                        </div>
                    )}

                    {isPopUpVisible && (
                        <DownloadPopUp onClose={() => setPopUpVisible(false)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopFoodOffersSlide;
