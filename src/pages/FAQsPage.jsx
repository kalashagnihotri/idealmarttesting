import React from 'react';
import { Link } from 'react-router-dom';

const FAQsPage = () => {
    return (
        <div className="pt-[80px] md:pt-[90px] px-4 md:px-8 lg:px-10">
            <div className="xl:my-4 font-Quicksand">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb:1 md:mb-4 text-center animate__animated animate__bounceInDown">Frequently Asked Questions</h1>
                <p className="text-gray-500 mb-4 text-center text-[10px] md:text-xs animate__animated animate__fadeInUp">By <Link to='/' className='text-idl-green'>!DealMart </Link><span className='text-gray-300'>•</span> 1 Aug 2024 <span className='text-gray-300'>•</span> 8 mins read</p>

                <section className="mb-4 md:mb-8 animate__animated animate__fadeInUp">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">1. How can I start saving with !DealMart?</h2>
                    <p className="text-gray-600 leading-relaxed text-xs md:text-sm">
                        To start saving with !DealMart, simply download our app from the App Store or Google Play, create an account, and browse the latest deals from your favorite desi grocery stores. Add your preferred deals to your shopping list and enjoy instant savings on quality products.
                    </p>
                </section>

                <section className="mb-4 md:mb-8 animate__animated animate__fadeInUp">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">2. What types of deals can I find on !DealMart?</h2>
                    <p className="text-gray-600 leading-relaxed text-xs md:text-sm">
                        !DealMart offers exclusive deals on a wide range of products including fresh produce, spices, pantry staples, snacks, beverages, and specialty items from trusted desi grocery stores. Our carefully curated selection ensures you get the best value for your money, with discounts and offers you won't want to miss.
                    </p>
                </section>

                <section className="mb-4 md:mb-8 animate__animated animate__fadeInUp">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">3. Is there a cost to use !DealMart?</h2>
                    <p className="text-gray-600 leading-relaxed text-xs md:text-sm">
                        !DealMart is free to browse for deals & specials. You can enjoy all our features with a paid monthly subscription at just $4.99.
                    </p>
                </section>

                <section className="mb-4 md:mb-8 animate__animated animate__fadeInUp">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">5. How does !DealMart ensure the quality of the products?</h2>
                    <p className="text-gray-600 leading-relaxed text-xs md:text-sm">
                        At !DealMart, we partner with only the most trusted desi stores known for their quality products. We carefully vet all our partners to ensure they meet our high standards, providing you with peace of mind when shopping for groceries.
                    </p>
                </section>

                <section className="mb-4 md:mb-8 animate__animated animate__fadeInUp">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">6. Which desi stores will be available to shop at on the platform?</h2>
                    <p className="text-gray-600 leading-relaxed text-xs md:text-sm">
                        We will add Indian, Pakistani, Bangladeshi, and Sri Lankan desi stores to our platform to provide you with the biggest selection of products.
                    </p>
                </section>

                <section className="mb-4 md:mb-8 animate__animated animate__fadeInUp">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-4">7. Do you offer reward points?</h2>
                    <p className="text-gray-600 leading-relaxed text-xs md:text-sm">
                        Yes, you earn rewards when you shop once you subscribe to one of our reasonably priced payment plans.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default FAQsPage;
