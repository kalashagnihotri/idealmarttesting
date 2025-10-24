import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeProducts } from "@/features/home/homeProductsSlice";
// import { ProductsData, RestaurantData } from '@/dummy-data/Data';
import { ProductSlide, RestaurantSlide, TopFoodOffersSlide } from '@/components';

const HomeProducts = () => {
    const dispatch = useDispatch();

    // Accessing the data and loading states from Redux store
    const {
        topOffers,
        topFoodOffers,
        meatOffers,
        sweetsOffers,
        limitedOffers,
        limitedFoodOffers,
        convenienceStoreDeals,
        loading,
        error,
    } = useSelector((state) => state.homeProducts);

    // Fetch data on component mount
    useEffect(() => {
        dispatch(fetchHomeProducts());
    }, [dispatch]);

    // Display loading or error messages
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const categories = ['All', 'Vegetables', 'Desserts', 'Fruits']; // Categories to pass
    const Restaurant = ['All', 'Indian', 'Italian', 'Chines']; // Restaurant Categories to pass

    return (
        <div className='py-6'>
            {/* Conditionally render slides if data exists */}
            {topOffers.length > 0 && (
                <ProductSlide
                    head="Top Groceries"
                    products={topOffers}
                    categories={categories}
                />
            )}
            {topFoodOffers.length > 0 && (
                <TopFoodOffersSlide
                    head='Top Food Offers'
                    products={topFoodOffers}
                    categories={categories}
                />
            )}
            {meatOffers.length > 0 && (
                <ProductSlide
                    head="Meat Offers"
                    products={meatOffers}
                    categories={categories}
                />
            )}
            {sweetsOffers.length > 0 && (
                <ProductSlide
                    head="Sweets Offers"
                    products={sweetsOffers}
                    categories={categories}
                />
            )}
            {limitedOffers.length > 0 && (
                <ProductSlide
                    head="limited Offers"
                    products={limitedOffers}
                    categories={categories}
                />
            )}
            {limitedFoodOffers.length > 0 && (
                <ProductSlide
                    head="Limited Food Offers"
                    products={limitedFoodOffers}
                    categories={categories}
                />
            )}
            {convenienceStoreDeals.length > 0 && (
                <ProductSlide
                    head="Convenience Store Deals"
                    products={convenienceStoreDeals}
                    categories={categories}
                />
            )}


            {/* We working on this slide letter when we have the restaurant data */}
            {/* <RestaurantSlide
                head='Restaurant'
                img='https://marketplace.canva.com/EAGFv9wbcDA/1/0/1600w/canva-orange-and-white-modern-asian-food-restaurant-outdoor-banner-kediZUS4TYY.jpg'
                products={RestaurantData}
                categories={Restaurant}
            /> */}
        </div >
    )
}

export default HomeProducts