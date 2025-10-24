import { VscMail } from "react-icons/vsc";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const DiscountNav = () => {
    return (
        <div className='w-full bg-idl-green hidden xl:block'>
            <div className='container mx-auto'>
                <div className="flex justify-between items-center py-1.5 px-2 lg:px-0">
                    {/* Left Section */}
                    <div className="flex items-center gap-1 sm:gap-2 text-xs text-white">
                        {/* <div className="flex items-center gap-0.5 sm:gap-1">
                            <CiLocationOn className="text-sm" />
                            <span className="truncate">23/A Mark Street Road, Newyork City</span>
                        </div> */}
                        {/* <span>|</span> */}
                        <div className="flex items-center gap-0.5 sm:gap-1">
                            <VscMail className="text-sm" />
                            <span className="truncate">info@idealmart.com</span>
                        </div>
                    </div>

                    {/* Right Section (Slider) */}
                    <div className="w-[618px]">
                        <div className="flex items-center justify-between text-white">
                            <button>
                                <MdOutlineKeyboardArrowLeft className="text-[16px] md:text-[18px]" />
                            </button>
                            <div className="flex items-center">
                                <span className="text-xs md:text-sm lg:text-base font-medium pr-1 md:pr-2">
                                    Try idealmart for free
                                </span>
                                <a href='#' className="text-xs text-idl-yellow">
                                    Click And Copy Code:
                                </a>
                            </div>
                            <button>
                                <MdOutlineKeyboardArrowRight className="text-[16px] md:text-[18px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountNav;
