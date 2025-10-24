import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Trophy from '@/assets/games-img/spin/Trophy.gif';

const GamePopup = ({ message, onClose }) => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const handleClose = () => {
        setIsOpen(false);
        if (onClose) onClose();
        navigate('/games/blank');
    };


    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div
                    className="animate-fadeIn scale-100 transform transition-all duration-300 bg-gradient-to-r from-[#2980b9] to-[#2c3e50] rounded-lg shadow-2xl p-6 w-4/5 max-w-sm text-center font-Quicksand"
                >
                    {message !== "Better Luck Next Time" ? (
                        <>
                            <h2 className="text-xl font-bold text-white mb-4">Congratulations!</h2>
                            <img
                                src={Trophy}
                                alt="Trophy"
                                className="mx-auto h-20 mb-2 animate-bounce"
                            />
                            <p className="text-white text-sm font-semibold mb-4">
                                {`You Won ${message}`}
                            </p>
                            <p className="text-yellow-300 text-xs font-semibold drop-shadow-[0_0_6px_rgba(255,215,0,0.8)]">
                                Free with $20 purchase
                            </p>
                        </>
                    ) : (
                        <p className="text-white text-sm font-semibold mb-4">
                            {message}
                        </p>
                    )}
                    <button
                        className="px-6 py-2 font-semibold bg-white text-purple-700 rounded-full shadow-md shadow-slate-400 border focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-transform duration-300"
                        onClick={handleClose}
                    >
                        Close
                    </button>

                    {message !== "Better Luck Next Time" ? (
                        <>
                            <p className="text-yellow-400 text-sm font-semibold mb-4">
                                <br />
                                <b>Need help claiming your prize?</b>
                                <br />
                                Check the Rewards section under your Profile or call +1 (437) 214-9266 for assistance.
                            </p>
                        </>
                    ) : (
                        <p className="text-white text-sm font-semibold mb-4">
                            <br />
                            <b>⏰ Come back & play every day at breakfast 🍳, lunch 🥪 & dinner 🍕 — your next win's waiting! 🎉🛒</b>
                        </p>
                    )}



                    
                </div>
            </div>
        )
    );
};

export default GamePopup;