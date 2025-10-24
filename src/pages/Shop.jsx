import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, setFilters } from "@/features/products/productsSlice";
import { addToCart, removeFromCart } from "@/features/cart/cartSlice";
import { Card, CardContent } from "@/components/ui/card";
import { RatingStars } from "@/components";
import { CiHeart } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import { RiEqualizer3Line } from "react-icons/ri";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { IoBagHandleSharp } from "react-icons/io5";

const Shop = () => {
    const dispatch = useDispatch();

    const { products, filteredProducts, filters, status, error } = useSelector(
        (state) => state.products
    );
    const cart = useSelector((state) => state.cart.items);

    const [searchTerm, setSearchTerm] = useState("");
    const [visibleCount, setVisibleCount] = useState(16);
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

    const handleFilterChange = (key, value) => {
        const updatedFilters = { ...filters, [key]: value };
        dispatch(setFilters(updatedFilters));
    };

    const handleCartToggle = (product) => {
        if (cart.some((item) => item.id === product.id)) {
            dispatch(removeFromCart(product.id));
        } else {
            dispatch(addToCart(product));
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        dispatch(
            setFilters({
                ...filters,
                searchTerm: e.target.value,
            })
        );
    };

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 8);
    };

    if (status === "loading") {
        return <p>Loading products...</p>;
    }

    if (status === "failed") {
        return <p>Error: {error}</p>;
    }

    const filteredBySearch = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-2 lg:p-0 lg:py-6 overflow-x-auto">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Sidebar */}
                <aside
                    className={`w-full lg:w-1/4 border p-4 rounded lg:static ${isSidebarVisible ? "block" : "hidden"
                        } lg:block`}
                >
                    <button
                        className="lg:hidden mb-4 text-sm font-semibold text-idl-green"
                        onClick={() => setSidebarVisible(false)}
                    >
                        Close Filters
                    </button>
                    <h2 className="text-lg font-semibold mb-4">Filters</h2>
                    {/* Search Bar */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search products"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full px-4 py-2 border rounded-full text-xs placeholder:text-xs focus:border-green-500 focus:outline-none"
                        />
                    </div>
                    {/* Category Filter */}
                    <div className="mb-4">
                        <label className="block text-xs font-medium mb-1 text-gray-600">Category</label>
                        <div className="relative">
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange("category", e.target.value)}
                                className="w-full p-2 pr-6 border rounded text-xs text-gray-700 bg-white focus:border-green-500 focus:ring-1 focus:outline-none appearance-none"
                            >
                                <option value="">All</option>
                                {[...new Set(products.map((p) => p.category))].map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            {/* Down arrow icon */}
                            <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-400">
                                <MdOutlineKeyboardArrowDown />
                            </span>
                        </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className="mb-4">
                        <label className="block text-xs font-medium mb-2 text-gray-600">
                            Price Range
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            step="1"
                            value={filters.priceRange[1]}
                            onChange={(e) =>
                                handleFilterChange("priceRange", [
                                    0,
                                    parseFloat(e.target.value),
                                ])
                            }
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none accent-idl-green"
                            style={{
                                background: `linear-gradient(to right, #10b981 0%, #10b981 ${((filters.priceRange[1] - 1) / (50 - 1)) * 100
                                    }%, #e5e7eb ${((filters.priceRange[1] - 1) / (50 - 1)) * 100
                                    }%, #e5e7eb 100%)`,
                            }}
                        />
                        <p className="text-xs text-gray-600">
                            Up to: ${filters.priceRange[1]}
                        </p>
                    </div>
                    {/* Rating Filter */}
                    <div className="mb-4">
                        <label className="block text-xs font-medium mb-2 text-gray-600">Rating</label>
                        <input
                            type="number"
                            min="0"
                            max="5"
                            step="0.1"
                            value={filters.rating}
                            onChange={(e) =>
                                handleFilterChange("rating", parseFloat(e.target.value))
                            }
                            className="w-full p-2 border rounded text-xs focus:ring-0 focus:outline-none"
                        />
                    </div>
                </aside>
                <div>
                    <button
                        className="lg:hidden px-4 py-2 bg-gray-100 text-gray-500 font-semibold rounded"
                        onClick={() => setSidebarVisible(true)}
                    >
                        <RiEqualizer3Line />
                    </button>
                </div>

                {/* Product Grid */}
                <section className="flex-1">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                        {filteredBySearch.slice(0, visibleCount).map((product) => (
                            <Link to={`/product/${product.id}`} key={product.id}>
                                <Card className="h-[300px]">
                                    <CardContent className="p-2 flex flex-col justify-between h-full">
                                        <div className="flex items-center gap-2 text-lg">
                                            <CiHeart />
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleCartToggle(product);
                                                }}
                                                className={`text-lg ${cart.some((item) => item.id === product.id)
                                                    ? "text-green-500"
                                                    : "text-gray-500"
                                                    }`}
                                            >
                                                <GiShoppingCart />
                                            </button>
                                        </div>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-20 sm:h-32 object-contain mb-1"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <RatingStars />
                                            <h3 className="text-[12px] font-medium text-ellipsis overflow-hidden whitespace-nowrap">
                                                {product.name}
                                            </h3>
                                            <div className="flex gap-1 items-center">
                                                {product.discountPrice &&
                                                    product.discountPrice < product.price ? (
                                                    <>
                                                        <span className="text-[12px] md:text-xs font-bold line-through text-gray-500">
                                                            ${product.price}
                                                        </span>
                                                        <span className="text-[12px] md:text-xs font-bold text-idl-green">
                                                            ${product.discountPrice}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-[12px] md:text-xs font-bold text-black">
                                                        ${product.price}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                    {/* Load More Button */}
                    {visibleCount < filteredBySearch.length && (
                        <div className="text-center mt-4">
                            <button
                                onClick={handleLoadMore}
                                className="px-4 py-2 text-xs bg-gray-300 text-gray-500 font-semibold rounded-full hover:bg-idl-yellow hover:text-idl-text"
                            >
                                Load More ...
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Shop;
