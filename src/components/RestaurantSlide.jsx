import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent } from "@/components/ui/card";
import { RatingStars } from "@/components";
// icons
import { CiSearch } from "react-icons/ci";
import { SlRefresh } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const RestaurantSlide = ({ head, img, products, categories }) => {
    const sliderRef = useRef(null); // Reference for the slider
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");

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
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1280, // Below large screens
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1023, // Below large screens
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600, // Below medium screens
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="p-4">
            <div className="container mx-auto px-2 xl:px-0 pt-4">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <span className="text-xl sm:text-2xl font-bold">{head}</span>
                        <div className="flex items-center gap-4">
                            <ul className="flex gap-2 text-xs font-medium">
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
                            </ul>
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
                                            <div className="w-full h-60 overflow-hidden rounded-lg">
                                                <img
                                                    src={data.url}
                                                    alt={data.tag}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            {/* Overlay Content */}
                                            <div className="absolute inset-0 flex flex-col justify-between p-3 bg-gradient-to-t from-black/65 via-transparent to-transparent rounded-lg">
                                                {/* Top: Category and Heart Icon */}
                                                <div className="flex justify-between items-center">
                                                    {/* Category */}
                                                    <span className="text-xs font-medium text-white bg-black/60 px-2 py-1 rounded-md">
                                                        {data.category}
                                                    </span>
                                                    {/* Heart Icon */}
                                                    <CiHeart className="text-white text-xl cursor-pointer" />
                                                </div>

                                                <div className="grid gap-3">
                                                    {/* Middle: Discount, Product Info, and Rating */}
                                                    <div className="flex flex-col items-start gap-1">
                                                        {/* Discount */}
                                                        <span
                                                            className="bg-red-500 text-white text-[12px] px-3 py-1 font-semibold"
                                                            style={{
                                                                clipPath:
                                                                    "polygon(50% 0, 100% 0, 100% 0, 95% 50%, 100% 100%, 100% 100%, 62% 100%, 0 100%, 0 0, 0 0)",
                                                                height: "1.25rem",
                                                            }}
                                                        >
                                                            {data.discount}
                                                        </span>
                                                        {/* Product Info */}
                                                        <span className="text-sm text-white font-semibold truncate">
                                                            {data.tag}
                                                        </span>
                                                        {/* Rating */}
                                                        <div className="flex items-center gap-2">
                                                            <RatingStars rating={data.rating} />
                                                            <span className="text-xs text-white font-semibold">
                                                                {data.rating}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Bottom: Select Option Button */}
                                                    <button className="flex w-full items-center justify-center gap-2 bg-red-500 text-white rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300">
                                                        <span className="text-sm font-medium">
                                                            Select Option
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
                </div>
            </div>
        </div>
    );
};

export default RestaurantSlide;
