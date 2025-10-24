import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

// Images
import GooglePlay from '@/assets/Home-Banner-img/google-play.jpg';
import AppStore from '@/assets/Home-Banner-img/app-store.jpg';
import Banner from '@/assets/Home-Banner-img/banner-12.png';

const DownloadPopUp = ({ onClose }) => {
    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent
                className="w-4/5 rounded-xl"
            >
                <DialogHeader>
                    <DialogTitle className="text-lg md:text-2xl font-bold font-Quicksand text-[#253d4e] mt-2">
                        Download the <span className='text-idl-green'>!DealMart</span> app for easy ordering & exclusive deals!
                    </DialogTitle>
                    <DialogDescription className="mt-2 text-[14px] md:text-sm md:font-medium">
                        Enjoy exclusive deals and convenient shopping with our app. Download now to explore seamless ordering and exciting offers!
                    </DialogDescription>
                </DialogHeader>

                <div className='flex flex-col md:mt-2'>
                    <span className='text-lg md:text-xl font-bold font-Quicksand text-[#253d4e]'>Install App</span>
                    <span className='text-xs md:text-sm font-semibold font-Quicksand text-[#406178]'>From App Store or Google Play</span>
                </div>

                <div className="flex items-center gap-4">
                    <a href='https://play.google.com/store/apps/details?id=com.idealmart.user'>
                        <img src={GooglePlay} alt='GooglePlay' className='w-24 md:w-28 lg:w-32 rounded-full' />
                    </a>
                    <a href='https://apps.apple.com/in/app/idealmart/id6736567166'>
                        <img src={AppStore} alt='AppStore' className='w-24 md:w-28 lg:w-32 rounded-full' />
                    </a>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DownloadPopUp;
