import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        control, // Add control to destructuring
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Submitting the form", data);
        // data.Select will be inside the data object
    };

    return (
        <div className='bg-smoke-white rounded-sm p-2 md:p-6 lg:p-8 grid gap-4'>
            <h1 className='text-2xl font-bold'>Fill Up The Form If You Have Any Question</h1>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    {/* Row 1 */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            {...register('Name', { required: true })}
                            className="w-full lg:w-1/3 p-2.5 text-xs border rounded-sm focus:outline-none focus:ring-1 focus:ring-idl-green"
                        />
                        <input
                            type="email"
                            placeholder="E-mail"
                            {...register('Email', { required: true })}
                            className="w-full lg:w-1/3 p-2.5 text-xs border rounded-sm focus:outline-none focus:ring-1 focus:ring-idl-green"
                        />
                        <input
                            type="tel"
                            placeholder="Phone"
                            {...register('Phone', { required: true })}
                            className="w-full lg:w-1/3 p-2.5 text-xs border rounded-sm focus:outline-none focus:ring-1 focus:ring-idl-green"
                        />
                    </div>

                    {/* Row 2 */}
                    <div>
                        <input
                            type="text"
                            placeholder="Subject"
                            {...register('Subject', { required: true })}
                            className="w-full lg:w-1/2 p-2.5 text-xs border rounded-sm focus:outline-none focus:ring-1 focus:ring-idl-green"
                        />
                    </div>

                    {/* Row 3 */}
                    <div>
                        <textarea
                            placeholder="Your Message"
                            {...register('Message', { required: true })}
                            className="w-full p-2.5 text-xs border rounded-sm h-32 focus:outline-none focus:ring-1 focus:ring-idl-green"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full lg:w-auto px-6 py-3 text-sm bg-idl-green text-white font-semibold rounded-full hover:bg-idl-yellow hover:text-idl-text transition duration-300"
                        >
                            Send Us Message
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;
