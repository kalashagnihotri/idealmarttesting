import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchSingleProduct } from "@/features/products/productsSlice";

const ProductDetail = () => {
    // const { id } = useParams();
    // const dispatch = useDispatch();

    // const { singleProduct, status, error } = useSelector((state) => state.products);

    // useEffect(() => {
    //     dispatch(fetchSingleProduct(id));
    // }, [dispatch, id]);

    // if (status === "loading") {
    //     return <p>Loading product details...</p>;
    // }

    // if (status === "failed") {
    //     return <p>Error: {error}</p>;
    // }

    // if (!singleProduct) {
    //     return <p>Product not found.</p>;
    // }

    // const { name, description, price, discountPrice, rating, image, discount_percentage } = singleProduct;

    return (
        <div className="container mx-auto p-4">
            {/* single product */}
            {/* <Link to="/shop" className="text-idl-green font-semibold text-sm">Back to Shop</Link>
            <div className="flex flex-col lg:flex-row gap-6 mt-4">
                <img
                    src={image}
                    alt={name}
                    className="w-full lg:w-1/2 object-contain rounded shadow"
                />
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold">{name}</h1>
                    <p className="text-sm text-gray-600 mt-2">{description}</p>
                    <div className="mt-4 flex items-center gap-4">
                        <div className="text-lg font-bold text-black">
                            ${discountPrice || price}
                        </div>
                        {discountPrice && discountPrice < price && (
                            <div>
                                <span className="text-sm line-through text-gray-500">
                                    ${price}
                                </span>
                                {discount_percentage > 0 && (
                                    <span className="text-xs bg-red-500 text-white px-2 ml-2">
                                        {discount_percentage}% OFF
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="mt-4">
                        <p>Rating: {rating} ★</p>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default ProductDetail;
