import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "@/assets/dashboard-img/logo.png";
import SmLogo from "@/assets/dashboard-img/sm-logo.png";
import { IoIosArrowDown } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { VscChromeClose } from "react-icons/vsc";
const BaseUrl = import.meta.env.VITE_BACKEND_API_URL
function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isOrderMenuOpen, setIsOrderMenuOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [error, setError] = useState("");

    useEffect(() => {
        // let intervalId;

        async function fetchOrders() {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Unauthorized: Token not found. Please log in again.");
                setOrders([]);
                return;
            }

            const url = `  ${BaseUrl}/api/orders/store`;

            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const responseData = await response.json();
                console.log(responseData);

                if (responseData && Array.isArray(responseData.orders)) {
                    setOrders(responseData.orders);
                } else {
                    console.error("Unexpected API response structure:", responseData);
                    setOrders([]);
                }
            } catch (error) {
                console.error("Error fetching orders:", error.message);
                setError("Failed to fetch orders. Please try again later.");
                setOrders([]);
            }
        }

        fetchOrders();
        // intervalId = setInterval(fetchOrders, 5000); // Adjusted interval to reduce server load

        // return () => clearInterval(intervalId);
    }, []);

    const filteredOrders = filterStatus === "all"
        ? orders
        : orders.filter(order => order.status === filterStatus);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-idl-green text-white w-40 md:w-64 transform transition-transform duration-300 ease-in-out z-50 lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex justify-between items-center p-3 md:p-4 border-b">
                    <h2 className="text-base md:text-xl font-bold">Dashboard</h2>
                    <button
                        className="text-white text-sm md:text-lg lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <VscChromeClose />
                    </button>
                </div>
                <div className="mt-2 md:mt-4 lg:mt-6">
                    <button
                        onClick={() => setIsOrderMenuOpen(!isOrderMenuOpen)}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-white hover:text-idl-text text-sm md:text-base lg:text-lg font-medium"
                    >
                        Order Section
                        <IoIosArrowDown
                            className={`h-4 w-4 lg:h-5 lg:w-5 ml-auto transform transition-transform ${isOrderMenuOpen ? "rotate-180" : "rotate-0"}`}
                        />
                    </button>
                    {isOrderMenuOpen && (
                        <div className="px-4">
                            <button
                                onClick={() => setFilterStatus("all")}
                                className="block px-2 py-1 text-xs md:text-sm lg:text-base font-normal hover:text-idl-yellow"
                            >
                                All Orders
                            </button>
                            <button
                                onClick={() => setFilterStatus("pending")}
                                className="block px-2 py-1 text-xs md:text-sm lg:text-base font-normal hover:text-idl-yellow"
                            >
                                Pending Orders
                            </button>
                            <button
                                onClick={() => setFilterStatus("confirmed")}
                                className="block px-2 py-1 text-xs md:text-sm lg:text-base font-normal hover:text-idl-yellow"
                            >
                                Confirmed Orders
                            </button>
                            <button
                                onClick={() => setFilterStatus("processing")}
                                className="block px-2 py-1 text-xs md:text-sm lg:text-base font-normal hover:text-idl-yellow"
                            >
                                Processing Orders
                            </button>
                            <button
                                onClick={() => setFilterStatus("completed")}
                                className="block px-2 py-1 text-xs md:text-sm lg:text-base font-normal hover:text-idl-yellow"
                            >
                                Completed Orders
                            </button>
                            <button
                                onClick={() => setFilterStatus("cancelled")}
                                className="block px-2 py-1 text-xs md:text-sm lg:text-base font-normal hover:text-idl-yellow"
                            >
                                Cancelled Orders
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-gray-100 transition-all duration-300 ease-in-out">
                <header className="bg-white shadow p-4 flex items-center sticky top-0 z-10">
                    <button
                        className="bg-gray-200 text-gray-500 p-1 rounded hover:bg-idl-yellow hover:text-idl-text focus:outline-none text-xl lg:hidden"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <CgMenuGridR />
                    </button>
                    <div className="ml-6 hidden md:flex">
                        <Link to='/'>
                            <img src={Logo} alt="Logo" className="h-7 object" />
                        </Link>
                    </div>
                    <div className="ml-4 flex md:hidden">
                        <Link to='/'>
                            <img src={SmLogo} alt="Logo" className="h-7 object" />
                        </Link>
                    </div>
                    <Link to="/" className="ml-auto text-gray-700 font-medium text-xs md:text-sm lg:text-base hover:text-idl-green">
                        Home
                    </Link>
                </header>
                <main className="p-2 md:p-4 overflow-y-auto flex-1">
                    <h2 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">Orders</h2>
                    {Array.isArray(filteredOrders) && filteredOrders.length > 0 ? (
                        <div className="space-y-4">
                            {filteredOrders.map(order => (
                                <div key={order.order_id} className="p-4 bg-white shadow rounded-md">
                                    <h3 className="text-xs md:text-base">Order ID: {order.order_id}</h3>
                                    <p className="text-xs">Status: {order.status}</p>
                                    <p className="text-xs">Order Date: {new Date(order.order_date).toLocaleString()}</p>
                                    <p className="text-xs">Shipping Address: {order.shipping_address}</p>
                                    <p className="text-xs">Total: ${order.total}</p>

                                    <div className="mt-2">
                                        <h4 className="font-medium text-sm">Products:</h4>
                                        {Array.isArray(order.products) && order.products.length > 0 ? (
                                            <ul className="mt-2">
                                                {order.products.map((product, index) => (
                                                    <li key={index} className="flex items-start space-x-4 mb-2">
                                                        <img
                                                            src={product.image_url}
                                                            alt={product.product_name}
                                                            className="w-16 h-16 object-cover rounded-md"
                                                        />
                                                        <div>
                                                            <p className="text-xs">Product Name: {product.product_name}</p>
                                                            <p className="text-xs">Quantity: {product.quantity}</p>
                                                            <p className="text-sm">Price: ${product.discount_price}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No products found.</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No orders found for the selected status.</p>
                    )}
                </main>
            </div >
        </div >
    );
}

export default Dashboard;

