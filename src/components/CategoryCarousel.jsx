import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PiDotsThreeVertical } from "react-icons/pi";
// icons
import Groceries from '@/assets/navbar-img/grocery-bag.svg';
import Fruits from '@/assets/navbar-img/melon.svg';
import Bakery from '@/assets/navbar-img/take-away.svg';
import Dairy from '@/assets/navbar-img/milk-product.svg';
import Meats from '@/assets/navbar-img/meat.svg';
import vegetables from '@/assets/navbar-img/vegetable-fruit.svg';
import Beverage from '@/assets/navbar-img/soda.svg';
import Food from '@/assets/navbar-img/fish-fillet.svg';
import Sweets from '@/assets/navbar-img/christmas-candy.svg';

const cardData = [
    { id: 1, src: Groceries, title: 'Groceries', products: '6 Products' },
    { id: 2, src: Fruits, title: 'Fruits', products: '11 Products' },
    { id: 3, src: Bakery, title: 'Bakery', products: '5 Products' },
    { id: 4, src: Dairy, title: 'Dairy', products: '4 Products' },
    { id: 5, src: Meats, title: 'Fish & Meats', products: '7 Products' },
    { id: 6, src: 'https://www.radiustheme.com/demo/wordpress/themes/zilly/wp-content/uploads/2024/01/vegetables-1.svg', title: 'vegetables', products: '9 Products' },
    { id: 7, src: 'https://www.radiustheme.com/demo/wordpress/themes/zilly/wp-content/uploads/2024/01/beverage-01.svg', title: 'Beverage', products: '12 Products' },
    { id: 8, src: Food, title: 'Food', products: '10 Products' },
    { id: 9, src: Sweets, title: 'Sweets', products: '9 Products' },
];

const CategoryCarousel = () => {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1280, // Below large screens
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1023, // Below large screens
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600, // Below medium screens
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 380, // Extra small screens
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="container mx-auto py-4 mx:py-6">
            <Slider {...settings}>
                {cardData.map((card) => (
                    <div
                        key={card.id}
                    >
                        <div className='flex px-2 xl:px-0 justify-between items-center gap-2 md:gap-0'>
                            <span className='bg-frost-white rounded-full p-2.5'>
                                <img src={card.src} alt={card.title} className="w-6 h-6" />
                            </span>
                            <span className='grid'>
                                <p className="text-xs font-semibold text-gray-700">{card.title}</p>
                                <span className='text-[12px]'>{card.products}</span>
                            </span>
                            <PiDotsThreeVertical />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default CategoryCarousel