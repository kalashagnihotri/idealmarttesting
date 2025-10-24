import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DownloadPopUp } from '@/components';
import { GiShoppingCart } from "react-icons/gi";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const ProductSlide = ({ head, img, products, categories }) => {
    const sliderRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [showPopup, setShowPopup] = useState(false); // Popup visibility state

    const slideLeft = () => {
        if (sliderRef.current) {
            const newScrollPosition = Math.max(sliderRef.current.scrollLeft - 300, 0);
            sliderRef.current.scrollTo({ left: newScrollPosition, behavior: "smooth" });
            setScrollPosition(newScrollPosition);
        }
    };

    const slideRight = () => {
        if (sliderRef.current) {
            const newScrollPosition = Math.min(
                sliderRef.current.scrollLeft + 300,
                sliderRef.current.scrollWidth - sliderRef.current.clientWidth
            );
            sliderRef.current.scrollTo({ left: newScrollPosition, behavior: "smooth" });
            setScrollPosition(newScrollPosition);
        }
    };

    useEffect(() => {
        if (sliderRef.current) {
            setScrollPosition(sliderRef.current.scrollLeft);
        }
    }, [sliderRef]);

    return (
        <div>
            <div className="flex flex-col gap-6 pb-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between">
                    <span className="text-xl md:text-2xl lg:text-3xl text-[#253d4e] font-bold font-Quicksand">
                        {head}
                    </span>
                    <div className="hidden md:flex gap-2">
                        <button
                            className="border p-1.5 rounded-sm"
                            onClick={slideLeft}
                        >
                            <MdOutlineKeyboardArrowLeft />
                        </button>
                        <button
                            className="border p-1.5 rounded-sm"
                            onClick={slideRight}
                        >
                            <MdOutlineKeyboardArrowRight />
                        </button>
                    </div>
                </div>

                {/* Product Cards Slider */}
                <div
                    ref={sliderRef}
                    className="flex overflow-x-scroll no-scrollbar gap-4"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {products.map((data, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-40 sm:w-44" // Smaller card width
                        >
                            <Card className="relative">
                                <CardContent className="p-2 sm:p-3">
                                    {/* Discount Badge */}
                                    {data.discount_percentage > 0 && (
                                        <span
                                            className="absolute top-0 left-0 bg-idl-green text-white px-2 text-[8px] font-medium flex items-center justify-center sm:px-3 sm:text-[10px]"
                                            style={{
                                                clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)",
                                                height: "1.5rem",
                                                width: "1.2rem",
                                            }}
                                        >
                                            {`${data.discount_percentage}%`}
                                        </span>
                                    )}

                                    {/* Image Container */}
                                    <div className="w-full h-16 sm:h-20 lg:h-24 overflow-hidden flex justify-center items-center">
                                        <img
                                            src={data.image_url}
                                            alt={data.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 mt-2 sm:mt-3">
                                        {/* Price and Discount */}
                                        <div className="flex gap-1 sm:gap-2">
                                            {data.discount_price ? (
                                                <>
                                                    <span className="text-xs sm:text-sm font-medium line-through text-gray-500">
                                                        {`${data.price}$ `}
                                                    </span>
                                                    <span className="text-xs sm:text-sm font-medium text-green-500">
                                                        {`${data.discount_price}$`}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-xs sm:text-sm font-medium">
                                                    {`${data.price}$`}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-col">
                                            {/* Store Name */}
                                            <span className="font-semibold text-[10px] sm:text-xs font-Quicksand truncate">
                                                {data.storeName}
                                            </span>

                                            {/* Product Name */}
                                            <span className="text-[10px] sm:text-xs truncate">{data.name}</span>
                                        </div>

                                        {/* Add to Cart */}
                                        <button
                                            className="flex mt-2 items-center justify-center gap-1 bg-frost-white hover:bg-idl-green text-idl-green hover:text-white rounded-3xl px-2 py-1 sm:px-3 sm:py-2"
                                            onClick={() => setShowPopup(true)}
                                        >
                                            <GiShoppingCart className="text-sm sm:text-base" />
                                            <span className="text-[10px] sm:text-xs font-medium">Add to Cart</span>
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Optional Banner */}
                {img && (
                    <div className="w-full">
                        <img
                            src={img}
                            alt="Banner"
                            className="w-full h-auto object-cover rounded-md"
                        />
                    </div>
                )}

                {/* Popup */}
                {showPopup && (
                    <DownloadPopUp onClose={() => setShowPopup(false)} />
                )}
            </div>
        </div>
    );
};

export default ProductSlide;
