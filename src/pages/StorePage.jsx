import icon1 from '@/assets/Home-Banner-img/icons/icon-1.svg';
import icon3 from '@/assets/Home-Banner-img/icons/icon-3.svg';



const data = [
    {
        src: icon1,
        heading: 'Deals Listing',
        description: 'We empower store owners to directly add and manage their deals on !DealMart. This autonomy allows you to control how your deals are presented and ensures that your latest offerings are always accessible to customers.'
    },
    {
        src: icon3,
        heading: 'Targeted Promotions',
        description: 'Take advantage of our targeted promotion feature to boost sales during special events and holidays. !DealMart provides promotional tools that help you attract more customers by offering timely discounts and special deals.'
    },
    {
        src: icon3,
        heading: 'Optimize Your Specials, Maximize Your Impact',
        description: '!DealMart provides your store with insights on competitor deals, allowing you to optimize your specials for maximum impact. Stay informed on the latest market trends to tailor your promotions to attract more customers and boost satisfaction.'
    },
]



const StorePage = () => {
    return (
        <div className='pt-[60px] md:pt-[70px] xl:pt-[90px] px-4 md:px-8 lg:px-10'>
            <div className='grid gap-8 font-Quicksand'>
                <div className='pt-6 pb-2 md:px-10 lg:px-20 grid gap-5 text-center'>
                    <h1 className='text-2xl md:text-4xl font-bold text-[#253d4e]'>Digitize your Marketing and Grow your <br className='hidden lg:flex' />Business with <span className='text-idl-green'>!DealMart</span> today</h1>
                    <div
                        className='grid gap-4 text-gray-600 text-sm md:text-base'
                    // style={{ textAlign: "justify", lineHeight: "1.6", textJustify: "inter-word", hyphens: "auto" }}
                    >
                        <span>Grow your business with !DealMart by expanding your reach and digitizing your marketing efforts. Our platform enables you to showcase your deals to a broader audience, helping you attract more customers and boost sales.
                        </span>
                        <span>
                            With !DealMart, you can seamlessly promote your offers and connect with shoppers who are eager to discover great savings at local South Asian stores.
                        </span>
                        <span>
                            Let us help you take your business to the next level by leveraging digital tools designed to enhance your visibility and customer engagement.
                        </span>
                    </div>
                </div>

                {/* card */}
                <div className='grid md:grid-cols-3 gap-5'>
                    {
                        data.map((data, index) => (
                            <div className='flex flex-col items-center text-center gap-4 border p-5 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg'>
                                <img src={data.src} />
                                <span className='text-xl font-bold text-[#253d4e]'>{data.heading}</span>
                                <span className='text-xs lg:text-sm text-gray-500'>{data.description}</span>
                            </div>
                        ))
                    }
                </div>

                {/* lower section */}
                <div className='grid gap-4'>
                    <div className='grid gap-4 pb-4'>
                        <span className='text-xl lg:text-3xl font-bold text-[#253d4e]'>1. Account Registration Request</span>
                        <span className='text-sm lg:text-base text-gray-600 '>Once you have submitted your request, our team will review your application and get in touch with you to discuss the next steps. We will provide you with the necessary information and guidance to help you get started on our platform.
                        </span>
                    </div>
                    <div className='grid gap-4 pb-4'>
                        <span className='text-xl lg:text-3xl font-bold text-[#253d4e]'>2. Add your Deals</span>
                        <span className='text-sm lg:text-base text-gray-600 '>Join !DealMart today and start selling your deals to a wider audience. Our platform makes it simple to upload your inventory, manage your listings, and connect with customers looking for great deals. Start reaching more shoppers and growing your business with just a few clicks.</span>
                    </div>
                    <div className='grid gap-4 pb-4'>
                        <span className='text-xl lg:text-3xl font-bold text-[#253d4e]'>3. Start selling</span>
                        <span className='text-sm lg:text-base text-gray-600 '>Join !DealMart today and start selling your deals to a wider audience. Our platform makes it simple to upload your inventory, manage your listings, and connect with customers looking for great deals. Start reaching more shoppers and growing your business with just a few clicks.</span>
                    </div>
                </div>

                {/* form */}
                <div className='pb-6 xl:pb-10 grid gap-5'>
                    <div className='grid'>
                        <span className='text-lg font-semibold text-[#275f61] mb-2'>Register with us online!</span>
                        <span className='text-2xl lg:text-3xl font-bold text-[#253d4e] mb-1'>We'd love to have you on board</span>
                        <span className='text-xs text-gray-600'>Your email address will not be published. *</span>
                    </div>
                    <form className="grid gap-4 sm:grid-cols-2 text-xs">
                        {/* Full Name */}
                        <div className="sm:col-span-1">
                            <input type="text" placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded-md placeholder:text-xs placeholder:text-gray-500 focus:outline-none" />
                        </div>

                        {/* Email */}
                        <div className="sm:col-span-1">
                            <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded-md placeholder:text-xs placeholder:text-gray-500 focus:outline-none" />
                        </div>

                        {/* Phone no */}
                        <div className="sm:col-span-1">
                            <input type="tel" placeholder="Phone (+1 2345678900)" className="w-full p-3 border border-gray-300 rounded-md placeholder:text-xs placeholder:text-gray-500 focus:outline-none" />
                        </div>

                        {/* Store Name */}
                        <div className="sm:col-span-1">
                            <input type="text" placeholder="Store Name" className="w-full p-3 border border-gray-300 rounded-md placeholder:text-xs placeholder:text-gray-500 focus:outline-none" />
                        </div>

                        {/* Postal Code */}
                        <div className="sm:col-span-1">
                            <input type="text" placeholder="Postal Code" className="w-full p-3 border border-gray-300 rounded-md placeholder:text-xs placeholder:text-gray-500 focus:outline-none" />
                        </div>

                        {/* Store Location */}
                        <div className="sm:col-span-1">
                            <input type="text" placeholder="Store Location Url(Google maps url)" className="w-full p-3 border border-gray-300 rounded-md placeholder:text-xs placeholder:text-gray-500 focus:outline-none" />
                        </div>

                        {/* Message */}
                        <div className="sm:col-span-2">
                            <textarea placeholder="Message..." rows="4" className="w-full p-3 border border-gray-300 rounded-md placeholder:text-xs placeholder:text-gray-500 focus:outline-none"></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="">
                            <button type="submit" className="w-full xl:w-2/5 px-2 py-3 bg-[#253d4e] text-white rounded-md hover:bg-[#275f61] transform transition duration-500 hover:scale-105">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default StorePage
