import { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const SingleProductDetail = () => {

    const [count, setCount] = useState(1);

    return (
        <div className="pt-[80px] md:pt-[90px] xl:pt-[120px] px-4 md:px-8 lg:px-10 mb-5 md:mb-10">
            {/* Product Image and Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4">
                {/* Image Section */}
                <div className="flex justify-center">
                    <img
                        src="https://pngimg.com/uploads/carrot/carrot_PNG4994.png"
                        alt="Premium Quality Garden Fresh Carrot"
                        className="w-2/5 md:w-full lg:w-1/2 object-contain"
                    />
                </div>

                {/* Details Section */}
                <div>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                        100% Premium Quality Garden Fresh Carrot
                    </h1>
                    <div className="flex items-center text-yellow-500 mb-2">
                        <span className="text-xs md:text-sm font-semibold mr-2">★★★★★</span>
                        <span className="text-gray-500 text-xs md:text-sm">(1 Customer Review)</span>
                    </div>
                    <p className="text-gray-700 text-sm md:text-sm lg:text-base mb-4">
                        Add natural sweetness and vibrant color to your meals with our fresh organic carrots. Packed with vitamins, antioxidants, and grown sustainably, they’re perfect for snacking, cooking, or juicing!
                    </p>
                    <ul className="list-disc pl-4 mb-4 text-xs md:text-sm lg:text-base">
                        <li>100% organic and pesticide-free</li>
                        <li>Crisp, sweet, and naturally fresh</li>
                        <li>Versatile for salads, soups, stir-fries, and desserts</li>
                    </ul>
                    <div className="text-xl md:text-2xl font-semibold text-green-700 mb-4">
                        $24.00 - $57.00
                    </div>
                    <div className="text-red-600 font-bold text-xs md:text-sm mb-2">
                        Hurry Up! Sales Ends In:
                    </div>
                    <div className="bg-red-50 text-red-600 py-2 px-4 rounded-lg font-medium mb-4 text-xs md:text-sm border w-fit">
                        Sale Ends in 557D : 03H : 33M : 18S
                    </div>
                    <div className="text-green-600 font-bold text-sm md:text-base mb-4">In Stock</div>

                    {/* Weight Selector */}
                    <div className="mb-6">
                        <span className="font-bold mr-2 text-xs md:text-sm">Weight:</span>
                        <button className="border border-gray-300 px-2 py-1 rounded-lg hover:bg-gray-100 mr-2 text-xs md:text-sm">
                            1kg
                        </button>
                        <button className="border border-gray-300 px-2 py-1 rounded-lg hover:bg-gray-100 text-xs md:text-sm">
                            500gm
                        </button>
                    </div>

                    {/* Add to Cart and Buy Now Buttons */}
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex gap-4">
                            <div className="flex items-center border rounded-lg">
                                <span className="text-sm md:text-base font-bold px-6">{count}</span>
                                <div className="flex flex-col">
                                    <button
                                        className="border-l border-b border-gray-300 px-3 rounded-tr-lg text-sm md:text-base"
                                        onClick={() => setCount(count + 1)}>
                                        +
                                    </button>
                                    <button
                                        className="border-l border-gray-300 px-3 rounded-br-lg text-sm md:text-base"
                                        onClick={() => setCount(count > 1 ? count - 1 : 1)}>
                                        -
                                    </button>
                                </div>
                            </div>
                            <button className="bg-idl-green text-white px-6 py-2 rounded-lg hover:bg-green-700 text-sm md:text-base">
                                Add to Cart
                            </button>
                        </div>
                        <button className="bg-idl-yellow text-gray-900 px-6 py-2 rounded-lg hover:bg-yellow-500 text-sm md:text-base">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Additional Information */}
            <div className="mt-6 border-t pt-4">
                <p className="text-gray-500 text-xs md:text-sm lg:text-base">
                    SKU: <span className="text-gray-700">BG-1032</span> | Category:
                    <span className="text-gray-700"> Fresh vegetable</span>
                </p>
                {/* <p className="text-gray-500 text-xs md:text-sm lg:text-base">
                    Tags: <span className="text-gray-700">Sweet, Yogurt</span>
                </p> */}
                <p className="text-gray-500 text-xs md:text-sm lg:text-base">
                    MFG: <span className="text-gray-700">16/02/2025</span>
                </p>
            </div>

            {/* Sharing Section */}
            <span className='flex gap-2 mt-4'>
                <a href='#' className='bg-slate-100 hover:bg-idl-yellow text-idl-green hover:text-idl-text p-1.5 rounded-full lg:hover:-translate-y-1 transform transition text-sm'><FaFacebookF /></a>
                <a href='#' className='bg-slate-100 hover:bg-idl-yellow text-idl-green hover:text-idl-text p-1.5 rounded-full lg:hover:-translate-y-1 transform transition text-sm'><FaInstagram /></a>
            </span>
        </div>
    );
}

export default SingleProductDetail;
