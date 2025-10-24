import React from 'react';
import { useForm } from 'react-hook-form'; // Import the useForm hook from react-hook-form
import axios from 'axios'; // Import axios for making API requests
import ContactImg from '@/assets/contact-img/contact-2.png';
const BaseUrl = import.meta.env.VITE_BACKEND_API_URL
const Contact = () => {
    // Using react-hook-form for managing form state
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    // Handle form submission
    const onSubmit = async (data) => {
        console.log(data);
        try {
            // Post form data to your API endpoint
            const response = await axios.post(`${BaseUrl}/api/surveys/contact`, data);

            // Check for a successful response
            if (response.status === 200) {
                alert('Message sent successfully!');
                reset(); // Reset form after successful submission
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="pt-[80px] md:pt-[70px] xl:pt-[90px] px-2 md:px-8 lg:px-10 lg:grid grid-cols-3 items-center justify-between pb-6">
            <div className="p-4 col-span-2">
                <div className="mb-6 grid gap-2 font-Quicksand">
                    <span className="text-[#275f61] text-lg font-semibold">Contact & Support</span>
                    <h2 className="text-[#253d4e] text-3xl font-bold">Need Assistance?</h2>
                    <span className="text-gray-500 text-xs">Your email address will not be published.</span>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
                    {/* First Name */}
                    <div className="sm:col-span-1">
                        <input
                            type="text"
                            placeholder="First Name"
                            className={`w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md placeholder:text-xs focus:outline-none text-xs`}
                            {...register('firstName', { required: 'First name is required' })}
                        />
                        {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
                    </div>

                    {/* Last Name */}
                    <div className="sm:col-span-1">
                        <input
                            type="text"
                            placeholder="Last Name"
                            className={`w-full p-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md placeholder:text-xs focus:outline-none text-xs`}
                            {...register('lastName', { required: 'Last name is required' })}
                        />
                        {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-1">
                        <input
                            type="email"
                            placeholder="Email"
                            className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md placeholder:text-xs focus:outline-none text-xs`}
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' } })}
                        />
                        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                    </div>

                    {/* Subject */}
                    <div className="sm:col-span-1">
                        <input
                            type="text"
                            placeholder="Subject"
                            className={`w-full p-3 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md placeholder:text-xs focus:outline-none text-xs`}
                            {...register('subject', { required: 'Subject is required' })}
                        />
                        {errors.subject && <span className="text-red-500 text-xs">{errors.subject.message}</span>}
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                        <textarea
                            placeholder="Message..."
                            rows="4"
                            className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md placeholder:text-xs focus:outline-none text-xs`}
                            {...register('message', { required: 'Message is required' })}
                        />
                        {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full p-2 bg-idl-green text-white font-Quicksand font-semibold rounded-md hover:bg-[#275f61] transform transition duration-500 hover:scale-105"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>

            {/* Image Section */}
            <div className="hidden lg:grid justify-end items-center col-span-1 p-4">
                <img src={ContactImg} alt="Contact" className="rounded-lg shadow-lg w-80 transform transition duration-500 hover:scale-105 hover:rotate-1" />
            </div>
        </div>
    );
};

export default Contact;
