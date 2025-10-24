import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";



// data
const data = [
    {
        tag: 'Basic',
        price: '$4.99',
        validity: '/Month',
        features: [
            { check: '✓', detail: 'Favorite List' },
            { check: '✓', detail: 'Real-Time deal alerts' },
            { check: '✓', detail: 'Earn rewards points to save more' },
            { check: '✗', detail: 'Lowest price guarantee' },
        ]
    },
    {
        tag: 'Essential',
        price: '$23.99',
        validity: '/6 Months',
        features: [
            { check: '✓', detail: 'Favorite List' },
            { check: '✓', detail: 'Real-Time deal alerts' },
            { check: '✓', detail: 'Earn rewards points to save more' },
            { check: '✓', detail: 'Lowest price guarantee' },
        ]
    },
    // {
    //     tag: 'Premium',
    //     price: '$58.99',
    //     validity: '/ Yearly',
    //     features: [
    //         { check: '✓', detail: 'Favorite List' },
    //         { check: '✓', detail: 'Real-Time deal alerts' },
    //         { check: '✓', detail: 'Earn rewards points to save more' },
    //         { check: '✓', detail: 'Lowest price guarantee' },
    //     ]
    // },
];




const Pricing = () => {
    return (
        <div className='container mx-auto'>
            <div className='p-2 lg:p-0 grid gap-10'>
                <div className='flex justify-center items-center pt-6'>
                    <h1 className='text-3xl md:text-4xl font-bold text-center text-[#253d4e]'>Plans and Pricing</h1>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 items-center lg:grid-cols-3 gap-6 pb-6'>
                    <div className='md:col-span-2 lg:col-span-1'>
                        <h3 className='text-2xl md:text-3xl font-bold flex justify-center text-center lg:block lg:text-left pb-4 text-[#253d4e]'>Our Subscription Models</h3>
                        <span className='flex justify-center text-center lg:block lg:text-left text-gray-600 lg:pr-2 text-sm xl:text-base'>
                            At !DealMart, we invite you to browse deals for free and experience tangible savings on your groceries. For accessing advanced features, you can choose from our affordable subscription plans<br /><br />

                            We guarantee a minimum of 20% savings on the items you purchase through our deals, ensuring that your savings will far exceed the cost of the subscription.
                        </span>
                    </div>

                    {/* cards */}
                    {data.map((plan, index) => (
                        <div
                            key={index}
                            className='bg-white shadow-md rounded-lg p-5 grid gap-3 transform transition-all duration-300 hover:scale-105 hover:shadow-xl'
                        >
                            <div className='flex flex-col'>
                                <h2 className='text-2xl text-[#253d4e] font-bold text-center mb-2 border rounded-lg p-2'>{plan.tag}</h2>
                                <span className='text-3xl text-[#3d8116] font-bold mt-2'>
                                    {plan.price}
                                </span>
                                <span className='text-xs font-semibold'>
                                    {plan.validity}
                                </span>
                            </div>
                            <ul className='flex flex-col gap-1'>
                                {plan.features.map((feature, index) => (
                                    <li key={index} className='flex items-center'>
                                        <span
                                            className={`text-sm ${feature.check === '✓' ? 'text-green-500' : 'text-red-500'
                                                }`}
                                        >
                                            {feature.check}
                                        </span>
                                        <span className='ml-2 text-gray-500 text-sm'>{feature.detail}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className="bg-idl-green text-white font-semibold py-2 px-4 rounded-lg hover:bg-idl-yellow hover:text-idl-text focus:outline-none transform transition-transform duration-300 hover:scale-105 active:scale-95"
                            >
                                Buy
                            </button>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Pricing