import React, { useState, useEffect } from 'react';
import Logo from '@/assets/navbar-img/logo.png';
import { FaStore } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";


// Product image Mock
import Atta from '@/assets/price-compare-cal-img/atta.png';
import Sugar from '@/assets/price-compare-cal-img/sugar.png';
import Paneer from '@/assets/price-compare-cal-img/paneer.png';
import Milk from '@/assets/price-compare-cal-img/milk.png';
import Butter from '@/assets/price-compare-cal-img/butter.png';
import Lentils from '@/assets/price-compare-cal-img/lentils.png';
import Spices from '@/assets/price-compare-cal-img/spices.png';
import Eggs from '@/assets/price-compare-cal-img/eggs.png';
import Bread from '@/assets/price-compare-cal-img/bread.png';

// Mock Data
let initialCalculatorItems = [
    {
        "name": "Basmati",
        "category": "grains",
        "quantity": "(10lb)",
        "image": "https://www.vyapartimes.com/vadmin/upload/team/201231123602.png",
        "checked": false,
        "store1_price": "$22.48",
        "store2_price": "$21.42",
        "idealmart_price": "$8.99"
    },
    {
        "name": "Atta",
        "category": "grains",
        "quantity": "(20lbs)",
        "image": Atta,
        "checked": false,
        "store1_price": "$22.95",
        "store2_price": "$19.99",
        "idealmart_price": "$13.99"
    },
    {
        "name": "Ghee",
        "category": "milk-products",
        "quantity": "(800gms)",
        "image": "https://aphra.in/wp-content/uploads/2024/08/Desi-Cow-Ghee.png",
        "checked": false,
        "store1_price": "$15.49",
        "store2_price": "$14.80",
        "idealmart_price": "$12.55"
    },
    {
        "name": "Sugar",
        "category": "grains",
        "image": Sugar,
        "checked": false,
        "store1_price": "$3.85",
        "store2_price": "$3.49",
        "idealmart_price": "$3.24"
    },
    {
        "name": "Paneer",
        "category": "milk-products",
        "quantity": "(300gms)",
        "image": Paneer,
        "checked": false,
        "store1_price": "$8.17",
        "store2_price": "$6.42",
        "idealmart_price": "$3.29"
    },
    {
        "name": "Milk",
        "category": "milk-products",
        "quantity": "(2 lts)",
        "image": Milk,
        "checked": false,
        "store1_price": "$9.93",
        "store2_price": "$10.35",
        "idealmart_price": "$9.10"
    },
    {
        "name": "Yogurt",
        "category": "milk-products",
        "quantity": "(750gms)",
        "image": "https://www.karouncheese.com/images/products/1045_tn800_12064.png",
        "checked": false,
        "store1_price": "$2.26",
        "store2_price": "$2.73",
        "idealmart_price": "$2.01"
    },
    {
        "name": "Butter",
        "category": "milk-products",
        "quantity": "(400g)",
        "image": Butter,
        "checked": false,
        "store1_price": "$3.67",
        "store2_price": "$3.07",
        "idealmart_price": "$1.82"
    },
    {
        "name": "Lentils",
        "category": "grains",
        "quantity": "(1.81kgs)",
        "image": Lentils,
        "checked": false,
        "store1_price": "$4.43",
        "store2_price": "$3.81",
        "idealmart_price": "$2.68"
    },
    {
        "name": "Spices",
        "category": "grains",
        "quantity": "(400g)",
        "image": Spices,
        "checked": false,
        "store1_price": "$3.61",
        "store2_price": "$3.84",
        "idealmart_price": "$3.36"
    },
    {
        "name": "Eggs",
        "category": "other",
        "quantity": "12",
        "image": Eggs,
        "checked": false,
        "store1_price": "$3.66",
        "store2_price": "$3.09",
        "idealmart_price": "$2.60"
    },
    {
        "name": "Bread",
        "category": "grains",
        "quantity": "1 loaf",
        "image": Bread,
        "checked": false,
        "store1_price": "$4.87",
        "store2_price": "$4.67",
        "idealmart_price": "$3.62"
    },
];

const PriceCompareCal = ({ isVisible, onClose }) => {
    const [calculatorItems, setCalculatorItems] = useState(initialCalculatorItems);
    const [totals, setTotals] = useState({ idealmart: 0, store1: 0, store2: 0 });
    const [savings, setSavings] = useState({ store1: 0, store2: 0 });

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const toggleChecked = (index) => {
        setCalculatorItems(prevItems =>
            prevItems.map((item, i) =>
                i === index ? { ...item, checked: !item.checked, showCheck: !item.showCheck } : item
            )
        );
    };

    const handleSelectAll = () => {
        setCalculatorItems(prevItems => prevItems.map(item => ({ ...item, checked: true, showCheck: true })));
    };

    const handleSelectCategory = (category) => {
        setCalculatorItems(prevItems =>
            prevItems.map(item =>
                item.category === category
                    ? { ...item, checked: true, showCheck: true }
                    : { ...item, checked: false, showCheck: false }
            )
        );
    };

    const handleUncheckAll = () => {
        setCalculatorItems(prevItems => prevItems.map(item => ({ ...item, checked: false, showCheck: false })));
    };

    useEffect(() => {
        const selectedItems = calculatorItems.filter(item => item.checked);

        const idealmartTotal = selectedItems.reduce((sum, item) => sum + parseFloat(item.idealmart_price.replace('$', '')), 0);
        const store1Total = selectedItems.reduce((sum, item) => sum + parseFloat(item.store1_price.replace('$', '')), 0);
        const store2Total = selectedItems.reduce((sum, item) => sum + parseFloat(item.store2_price.replace('$', '')), 0);

        setTotals({
            idealmart: idealmartTotal.toFixed(2),
            store1: store1Total.toFixed(2),
            store2: store2Total.toFixed(2)
        });

        const calculateExpensePercentage = (storeTotal, idealmartTotal) => {
            if (idealmartTotal > 0) {
                return (((storeTotal - idealmartTotal) / idealmartTotal) * 100).toFixed(2);
            }
            return 0;
        };

        setSavings({
            store1: calculateExpensePercentage(store1Total, idealmartTotal),
            store2: calculateExpensePercentage(store2Total, idealmartTotal),
        });

    }, [calculatorItems]);

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 z-50 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`relative bg-white rounded-lg p-4 sm:p-5 w-11/12 md:w-3/5 shadow-lg transform transition-transform duration-300 ease-in-out ${isVisible ? 'scale-100' : 'scale-90'}`}>
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-800 hover:text-red-500" aria-label="Close popup">✕</button>

                <div className='grid gap-2 lg:gap-4 text-gray-800'>
                    <div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 text-center">Compare Deals</h2>
                        <p className="text-xs md:text-sm text-gray-600 text-center">Select the products you want to compare</p>
                    </div>

                    <div className='grid lg:grid-cols-2 gap-2 lg:gap-5'>
                        <div className='lg:border rounded-lg lg:p-4 grid gap-2 lg:gap-4'>

                            {/* First row */}
                            <div className='bg-gray-100 text-black p-2 lg:p-3 rounded-lg grid gap-1 items-center'>
                                <img src={Logo} className='h-6 sm:h-8 lg:h-9' />
                                <div className='flex justify-between'>
                                    <div className='flex items-center gap-1'>
                                        <h3 className='text-sm md:text-base lg:text-xl font-bold'>${totals.idealmart}</h3>
                                        <p className='text-[12px] md:text-xs lg:text-base'>Only</p>
                                    </div>
                                    <p className='text-[12px] md:text-xs lg:text-base text-[#2e6516]'>You'll save {savings.store1}%</p>
                                </div>
                            </div>

                            {/* Second 2 row */}
                            <div className='grid gap-1 lg:gap-2'>
                                <div className='flex justify-between border border-gray-300 rounded-lg p-1 md:p-2 lg:p-3'>
                                    <div className='flex items-center gap-1'>
                                        <FaStore className='w-8 md:w-10 lg:text-xl text-idl-green' />
                                        <span className='text-sm lg:text-lg'>Store1</span>
                                    </div>
                                    <div className='flex flex-col items-end justify-center pr-2 md:pr-0'>
                                        <p className='text-[12px] md:text-sm lg:text-sm'>${totals.store1}</p>
                                        <p className='text-[8px] md:text-[10px] lg:text-xs text-red-500'>{savings.store1}% expensive</p>
                                    </div>
                                </div>

                                <div className='flex justify-between border border-gray-300 rounded-lg p-1 md:p-2 lg:p-3'>
                                    <div className='flex items-center gap-1'>
                                        <FaStore className='w-8 md:w-10 lg:text-xl text-idl-green' />
                                        <span className='text-sm lg:text-lg'>Store2</span>
                                    </div>
                                    <div className='flex flex-col items-end justify-center pr-2 md:pr-0'>
                                        <p className='text-[12px] md:text-sm lg:text-sm'>${totals.store2}</p>
                                        <p className='text-[8px] md:text-[10px] lg:text-xs text-red-500'>{savings.store2}% expensive</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='lg:border rounded-lg lg:p-4'>

                            {/* Shorting buttons */}
                            <div className='border-b py-2 flex justify-start gap-2 text-[12px] md:text-xs'>
                                <button onClick={handleSelectAll} className='bg-gray-100 text-black rounded-full py-1 px-2'>All</button>
                                <button onClick={() => handleSelectCategory('grains')} className='border border-gray-300 rounded-full py-1 px-2'>Grains</button>
                                <button onClick={() => handleSelectCategory('milk-products')} className='border border-gray-300 rounded-full py-1 px-2'>Dairy</button>
                                <button onClick={handleUncheckAll} className='text-black p-1'>Uncheck All</button>
                            </div>

                            {/* Grid products */}
                            <div className='grid grid-cols-4 gap-1 py-2'>
                                {calculatorItems.map((item, id) => (
                                    <div key={id} onClick={() => toggleChecked(id)} className={`relative flex flex-col items-center justify-center text-center bg-gray-100 text-black rounded-lg p-1 md:p-2 overflow-hidden cursor-pointer ${item.checked ? 'border border-green-500' : 'border border-gray-300'}`}>
                                        <img src={item.image} alt={item.name} className='h-7 md:h-8 lg:h-9 w-7 md:w-8 lg:w-9 object-cover mb-1' />
                                        <span className='text-[10px] md:text-xs font-semibold'>{item.name}</span>
                                        <span className='text-[5px] md:text-[8px] text-gray-500'>{item.quantity || ''}</span>
                                        {item.showCheck && (
                                            <span className={`absolute top-1 right-1 w-3 h-3 rounded-full flex items-center justify-center ${item.checked ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                {item.checked && (
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                )}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default PriceCompareCal;