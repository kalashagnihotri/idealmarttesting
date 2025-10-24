import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// card icons
import card1 from '@/assets/games-img/memory/card1.svg';
import card2 from '@/assets/games-img/memory/card2.svg';
import card3 from '@/assets/games-img/memory/card3.svg';
import card4 from '@/assets/games-img/memory/card4.svg';
import card5 from '@/assets/games-img/memory/card5.svg';
import card6 from '@/assets/games-img/memory/card6.svg';
import card7 from '@/assets/games-img/memory/card7.svg';
import card8 from '@/assets/games-img/memory/card8.svg';
import Clock from '@/assets/games-img/memory/alarm-clock.gif';
import MemoryCard from './MemoryCard';
import { GamePopup, WarningPopup } from '@/components';
const BaseUrl = import.meta.env.VITE_BACKEND_API_URL;

const MemoryCards = () => {
    const [accessDenied, setAccessDenied] = useState(false);
    const [accessMessage, setAccessMessage] = useState("");
    const [items, setItems] = useState([
        { id: 1, img: card1, stat: "" }, { id: 1, img: card1, stat: "" },
        { id: 2, img: card2, stat: "" }, { id: 2, img: card2, stat: "" },
        { id: 3, img: card3, stat: "" }, { id: 3, img: card3, stat: "" },
        { id: 4, img: card4, stat: "" }, { id: 4, img: card4, stat: "" },
        { id: 5, img: card5, stat: "" }, { id: 5, img: card5, stat: "" },
        { id: 6, img: card6, stat: "" }, { id: 6, img: card6, stat: "" },
        { id: 7, img: card7, stat: "" }, { id: 7, img: card7, stat: "" },
        { id: 8, img: card8, stat: "" }, { id: 8, img: card8, stat: "" },
    ].sort(() => Math.random() - 0.5));

    const [prev, setPrev] = useState(-1);
    const [isCheckingMatch, setIsCheckingMatch] = useState(false);
    const [matchedCount, setMatchedCount] = useState(0);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(50);
    const [timeEnded, setTimeEnded] = useState(false);

    const [gameId, setGameId] = useState(null);
    const [labelData, setLabelData] = useState([]);
    const [randomPrize, setRandomPrize] = useState(null);

    const prizeId = randomPrize?.id;
    const rewardSent = useRef(false);

    useEffect(() => {
        const apiError = localStorage.getItem("apiError");
        if (apiError) {
            const { message, timestamp } = JSON.parse(apiError);
            const errorTime = new Date(timestamp);
            const currentTime = new Date();
            const timeDifference = currentTime - errorTime;

            if (timeDifference < 60000) {
                setAccessDenied(true);
                setAccessMessage(message || "You have already won a prize in this game.");
            } else {
                localStorage.removeItem("apiError");
                setAccessDenied(false);
            }
        }
    }, []);

    if (accessDenied) return <WarningPopup message={accessMessage} />;

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/games/games-with-prizes/`);
                const data = response.data;
                const memoryGame = data.find(game => game.game_type?.toLowerCase() === "memory");
                if (memoryGame) {
                    setGameId(memoryGame.id);
                    const filteredLabels = memoryGame.prizes.filter(p => p.remaining_quantity > 0).map(p => ({ name: p.name, id: p.id }));
                    setLabelData(filteredLabels);
                }
            } catch (error) {
                console.error("Error fetching game data:", error);
            }
        };
        fetchGameData();
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        if (gameCompleted && gameId && randomPrize && token && !rewardSent.current) {
            rewardSent.current = true;
            sendTokenToAPI(token);
        }
    }, [gameCompleted, gameId, randomPrize]);

    const sendTokenToAPI = async (token) => {
        if (!gameId || !prizeId) return;
        const payload = { game_id: gameId, prize_id: prizeId };
        try {
            const response = await fetch(`${BaseUrl}/api/games/post-reward/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const errorText = await response.text();
                let errorMsg;
                try {
                    errorMsg = JSON.parse(errorText);
                } catch {
                    errorMsg = { detail: "Unknown error" };
                }
                if (response.status === 403) {
                    localStorage.setItem("apiError", JSON.stringify({ message: errorMsg.detail, timestamp: new Date().toISOString() }));
                }
            }
        } catch (error) {
            console.error("Failed to send token to API:", error);
        }
    };

    useEffect(() => {
        if (timeLeft > 0 && !gameCompleted) {
            const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !gameCompleted) {
            const fallbackPrize = { id: "5fc8a115-1c1d-4a72-8b1c-1b6a7e29e05a", name: "Better Luck Next Time" };
            setRandomPrize(fallbackPrize);
            setGameCompleted(true);
            setTimeEnded(true);
        }
    }, [timeLeft, gameCompleted]);

    const check = (current) => {
        setIsCheckingMatch(true);
        const newItems = [...items];
        if (newItems[current].id === newItems[prev].id) {
            newItems[current].stat = "correct";
            newItems[prev].stat = "correct";
            setItems(newItems);
            setPrev(-1);
            setIsCheckingMatch(false);
            setMatchedCount(prevCount => {
                const newCount = prevCount + 1;
                if (newCount === 8) {
                    const randomIndex = Math.floor(Math.random() * labelData.length);
                    setRandomPrize(labelData[randomIndex]);
                    setGameCompleted(true);
                }
                return newCount;
            });
        } else {
            newItems[current].stat = "wrong";
            newItems[prev].stat = "wrong";
            setItems(newItems);
            setTimeout(() => {
                newItems[current].stat = "";
                newItems[prev].stat = "";
                setItems(newItems);
                setPrev(-1);
                setIsCheckingMatch(false);
            }, 1000);
        }
    };

    const handleClick = (id) => {
        if (items[id].stat === "active" || items[id].stat === "correct" || isCheckingMatch) return;
        const newItems = [...items];
        newItems[id].stat = "active";
        setItems(newItems);
        if (prev === -1) {
            setPrev(id);
        } else {
            check(id);
        }
    };

    return (
        <>
            {gameCompleted && randomPrize && (
                <GamePopup message={randomPrize.name} onClose={() => setGameCompleted(false)} />
            )}
            {timeEnded && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-9/12 rounded-lg shadow-lg p-6 text-center z-60">
                        <h2 className="text-2xl font-bold mb-4">Time's Up!</h2>
                        <p className="text-sm">You didn't match all the cards in time.</p>
                        <button
                            className="px-6 py-2 text-xs mt-4 font-semibold bg-white text-purple-700 rounded-full shadow-md shadow-slate-400 border focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-transform duration-300"
                            onClick={() => setTimeEnded(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="flex justify-center items-center text-center text-xl text-[rgb(49, 49, 49)] font-bold mb-2 font-Quicksand">
                <img src={Clock} alt='clock' className='w-14' />
                Time Left: {timeLeft}s
            </div>
            <div className="w-[90%] h-[70%] mx-auto grid grid-cols-4 gap-2">
                {items.map((item, index) => (
                    <MemoryCard key={index} item={item} id={index} handleClick={handleClick} />
                ))}
            </div>
        </>
    );
};

export default MemoryCards;