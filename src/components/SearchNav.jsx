import { Link } from 'react-router-dom';
import Logo from '@/assets/navbar-img/logo.png';
import { BiMenuAltLeft } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { SlRefresh } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import { LuUser } from "react-icons/lu";
import { RiMenu2Line } from "react-icons/ri";

const SearchNav = ({ click, cartItem }) => {
    return (
        <div className='w-full bg-white hidden xl:block'>
            <div className='container mx-auto py-6'>
                <div className='flex justify-between gap-6'>
                    {/* -----Logo----- */}
                    <div>
                        <Link to='/'><img src={Logo} alt="Logo" className='h-10 object' /></Link>
                    </div>
                    {/* -----Drop down----- */}
                    {/* <div className="relative inline-block text-left group"> */}
                    {/* Dropdown Button */}
                    {/* <button
                            className="flex items-center px-4 py-3 text-idl-text border rounded-full focus:outline-none"
                        >
                            <BiMenuAltLeft className="mr-2 text-lg text-idl-green" />
                            <span className='text-xs font-semibold'>All Categories</span>
                            <MdKeyboardArrowDown className="ml-2 text-lg text-idl-green" />
                        </button> */}

                    {/* Dropdown Menu */}
                    {/* <div className="absolute -right-3 w-48 bg-white border border-gray-200 rounded-md shadow-lg transform scale-y-0 translate-y-[-10px] opacity-0 group-hover:scale-y-100 group-hover:translate-y-0 group-hover:opacity-100 origin-top transition-all duration-300 ease-in-out z-[51]">
                            <ul>
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <a href="#option1" className="text-gray-700 block">Option 1</a>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <a href="#option2" className="text-gray-700 block">Option 2</a>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <a href="#option3" className="text-gray-700 block">Option 3</a>
                                </li>
                            </ul>
                        </div>
                    </div> */}

                    {/* Search bar */}
                    <div className="flex items-center flex-1 relative text-xs">
                        <input
                            type="text"
                            placeholder="Type Your Products ..."
                            className="w-full bg-smoke-white py-3 px-4 pr-20 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                        <button className="absolute flex items-center gap-1 right-1 top-1 bottom-1 transform translate-y-0 bg-yellow-400 text-black px-4 py-2 rounded-r-full hover:bg-idl-green hover:text-white focus:outline-none">
                            <span className='text-sm font-semibold'>Search</span>
                            <CiSearch className="font-semibold text-lg" />
                        </button>
                    </div>


                    {/* -----avatar and icons----- */}
                    <div className="flex items-center ml-6 gap-4">
                        {/* Profile Icon */}
                        <Link to='/register'>
                            <div className="w-8 h-8 rounded-full bg-green-100 flex justify-center items-center">
                                <LuUser className="text-idl-green text-base" />
                            </div>
                        </Link>

                        {/* Wishlist and Cart Icons */}
                        <div className="flex items-center gap-4">
                            {/* <div className="relative">
                                <span className="text-black text-xs absolute -top-2 right-2 bg-yellow-400 rounded-full px-1">0</span>
                                <SlRefresh className='text-idl-text text-[23px]' />
                            </div> */}
                            <div className="relative">
                                <span className="text-black text-xs absolute -top-2 right-2 bg-yellow-400 rounded-full px-1">0</span>
                                <CiHeart className='text-idl-text text-[28px]' />
                            </div>
                            <Link to='/cart'>
                                <div className="relative">
                                    <span className="text-black text-xs absolute -top-2 right-2 bg-yellow-400 rounded-full px-1">{cartItem}</span>
                                    <GiShoppingCart className='text-idl-text text-[28px]' />
                                </div>
                            </Link>
                            {/* nav menu */}
                            <div>
                                <RiMenu2Line onClick={click} className='text-idl-text text-[28px] cursor-pointer hover:text-idl-green' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchNav