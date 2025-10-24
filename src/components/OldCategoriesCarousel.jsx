import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DownloadPopUp } from '@/components';

// Icons
import Grocery from '@/assets/ProductSlide-img/grocery.png';
import Dairy from '@/assets/ProductSlide-img/dairy.png';
import Meat from '@/assets/ProductSlide-img/meat.png';
import Sweet from '@/assets/ProductSlide-img/sweet.png';
import Vegetable from '@/assets/ProductSlide-img/vegetable.png';
import Bakery from '@/assets/ProductSlide-img/bakery.png';
import Restaurant from '@/assets/ProductSlide-img/restaurant.png';
import Food from '@/assets/ProductSlide-img/food.png';

const cardData = [
    { id: 1, src: Grocery, title: 'Grocery' },
    { id: 2, src: Restaurant, title: 'Restaurant' },
    { id: 3, src: Vegetable, title: 'Vegetables' },
    { id: 4, src: Dairy, title: 'Dairy' },
    { id: 5, src: Meat, title: 'Meat' },
    { id: 6, src: Sweet, title: 'Sweets' },
    { id: 7, src: Food, title: 'Food' },
    { id: 8, src: Bakery, title: 'Bakery' },
];

const OldCategoriesCarousel = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const handleCardClick = () => {
        setPopupVisible(true); // Show popup when a card is clicked
    };

    const handleClosePopup = () => {
        setPopupVisible(false); // Hide popup
    };

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        centerMode: true,
        centerPadding: '5%',
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 5 } },
            { breakpoint: 1023, settings: { slidesToShow: 4 } },
            { breakpoint: 600, settings: { slidesToShow: 2 } },
        ],
    };

    return (
        <div className="py-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl text-[#253d4e] font-bold font-Quicksand mb-3 md:mb-6">Categories Available</h2>
            <div>
                <Slider {...settings}>
                    {cardData.map((card) => (
                        <div
                            key={card.id}
                            onClick={handleCardClick} // Attach click handler
                            className="flex flex-col justify-center items-center text-center p-2 md:p-4 bg-[#f4f6fa] rounded-lg transition-all duration-300 transform shadow-sm hover:shadow-md hover:border hover:bg-white border cursor-pointer"
                        >
                            <div className="flex flex-col justify-center h-[100px] md:h-[140px]">
                                <img
                                    src={card.src}
                                    alt={card.title}
                                    className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mb-2 mx-auto object-contain"
                                />
                                <p className="text-[14px] md:text-[16px] lg:text-[18px] font-semibold text-gray-700 overflow-hidden">
                                    {card.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            {isPopupVisible && (
                <DownloadPopUp onClose={handleClosePopup} />
            )}
        </div>
    );
};

export default OldCategoriesCarousel;
