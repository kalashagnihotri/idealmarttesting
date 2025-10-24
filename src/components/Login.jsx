import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
const BaseUrl = import.meta.env.VITE_BACKEND_API_URL

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [loginError, setLoginError] = useState(""); // State for error message
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${BaseUrl}/api/accounts/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Invalid credentials or server error.");
            }

            const result = await response.json();
            console.log("Login Successful:", result);

            // Extract the required fields
            const { token, user_id, user_type } = result;

            // Save to localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user_id", user_id);
            localStorage.setItem("user_type", user_type);

            // Clear any previous error
            setLoginError("");

            // Redirect to dashboard
            navigate("/dashboard");
        } catch (error) {
            console.error("Login Failed:", error.message);
            // Set the error message to be displayed
            setLoginError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="container mx-auto h-screen px-2 py-10 lg:py-20 flex items-center justify-center">
            <div className="w-full border max-w-md bg-white md:shadow-lg rounded-lg p-2 pb-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Login</h2>

                {/* Error Message Display */}
                {loginError && (
                    <div className="mb-4 text-center text-red-500 text-sm">
                        {loginError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className={cn(
                                "mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-idl-green focus:border-idl-green text-xs md:text-sm",
                                errors.email && "border-red-500"
                            )}
                        />
                        {errors.email && (
                            <span className="text-xs md:text-sm text-red-500 mt-1">{errors.email.message}</span>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-xs md:text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className={cn(
                                "mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-idl-green focus:border-idl-green text-xs md:text-sm",
                                errors.password && "border-red-500"
                            )}
                        />
                        {errors.password && (
                            <span className="text-xs md:text-sm text-red-500 mt-1">{errors.password.message}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-idl-text bg-idl-green hover:bg-idl-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-idl-green"
                    >
                        Login
                    </button>

                    <div className="flex justify-end text-sm text-gray-600 font-medium">
                        <Link to="/">
                            <span>Back to Home</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
