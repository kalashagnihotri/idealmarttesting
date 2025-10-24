import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, updateQuantity } from "@/features/cart/cartSlice";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

const CartItems = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleQuantityChange = (id, quantity) => {
        if (quantity > 0) {
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    const totalAmount = cartItems.reduce(
        (total, item) => total + (item.discountPrice || item.price) * item.quantity,
        0
    );

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto p-4">
                <h2 className="text-xl font-bold text-center">Your Cart is Empty</h2>
                <div className="text-center mt-4">
                    <Link
                        to="/shop"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-lg md:text-xl font-bold mb-4">Shopping Cart</h2>

            <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between border-b pb-4"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div className="grid gap-2">
                                <h3 className="text-xs md:text-lg font-medium">{item.name}</h3>
                                <p className="text-gray-500 text-sm">
                                    {item.discountPrice && item.discountPrice < item.price ? (
                                        <>
                                            <span className="line-through">${item.price}</span>
                                            <span className="ml-2 text-green-500">
                                                ${item.discountPrice}
                                            </span>
                                        </>
                                    ) : (
                                        <span>${item.price}</span>
                                    )}
                                </p>
                                <div className="flex items-center border rounded-full px-2 w-fit">
                                    <button
                                        className="px-2 py-1"
                                        onClick={() =>
                                            handleQuantityChange(item.id, item.quantity - 1)
                                        }
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1">
                                        {item.quantity}
                                    </span>
                                    <button
                                        className="px-2 py-1"
                                        onClick={() =>
                                            handleQuantityChange(item.id, item.quantity + 1)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => handleRemove(item.id)}
                                className="text-red-500 hover:text-red-600 text-xl md:text-2xl"
                            >
                                <AiOutlineDelete />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
                <button
                    onClick={handleClearCart}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Clear Cart
                </button>
                <div className="text-lg font-bold">
                    Total: <span className="text-green-500">${totalAmount.toFixed(2)}</span>
                </div>
            </div>

            <div className="mt-6 text-center">
                <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartItems;
