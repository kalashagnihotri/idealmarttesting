import React from 'react';
import { FaStar } from "react-icons/fa";

const RatingStars = ({ rating }) => {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const fillPercentage = Math.min(Math.max(rating - (star - 1), 0), 1) * 100; // Calculate fill percentage for each star

                return (
                    <div
                        key={star}
                        className="relative"
                        style={{ width: 15, height: 15 }}
                    >
                        {/* Empty Star */}
                        <FaStar className="text-gray-400 absolute top-0 left-0" size={15} />

                        {/* Filled Star */}
                        <FaStar
                            className="text-idl-yellow absolute top-0 left-0"
                            size={15}
                            style={{
                                clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default RatingStars;
