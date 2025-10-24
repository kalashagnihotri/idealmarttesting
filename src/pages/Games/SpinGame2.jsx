import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import { GamePopup, WarningPopup } from "@/components";
import Sound from "@/assets/games-img/spin/spin.mp3";
import CoinSound from "@/assets/games-img/spin/coin.mp3";
const BaseUrl = import.meta.env.VITE_BACKEND_API_URL;

const SpinGame2 = () => {
    const canvasRef = useRef(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [deg, setDeg] = useState(Math.random() * 360);
    const [result, setResult] = useState(null);
    const [prizesData, setPrizesData] = useState([]);
    const [labelData, setLabelData] = useState([]);
    const [gameId, setGameId] = useState(null);
    const [prizeId, setPrizeId] = useState(null);
    const [isLimitReached, setIsLimitReached] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [history, setHistory] = useState([]);

    const colorData = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
    const sliceDeg = 360 / colorData.length;
    const canvasSize = 500;
    const center = canvasSize / 2;
    const radius = center - 8;
    const borderWidth = 12;

    const token = sessionStorage.getItem("authToken");

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await axios.get(`https://api-dev.idealmart.ca/api/games/games-with-prizes/`);
                const data = response.data;
                data.forEach((game) => {
                    if (game.game_type?.toLowerCase() === "spinner") {
                        setGameId(game.id);
                        setPrizesData(game.prizes);
                        setLabelData(game.prizes.map((p) => ({ text: p.name })));
                    }
                });
            } catch (error) {
                console.error("Error fetching game data:", error);
            }
        };
        fetchGameData();
    }, []);

    useEffect(() => {
        if (gameId && prizeId && token) sendTokenToAPI(token);
    }, [gameId, prizeId]);

    const sendTokenToAPI = async (token) => {
        try {
            await fetch(`https://api-dev.idealmart.ca/api/games/post-reward/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({ game_id: gameId, prize_id: prizeId }),
            });
        } catch (err) {
            console.error("Error sending prize info:", err);
        }
    };

    useEffect(() => {
        const lastSpinTime = localStorage.getItem("lastSpinTime");
        const persistedError = localStorage.getItem("errorMessage");
        setErrorMessage(persistedError || null);
        if (lastSpinTime && Date.now() - lastSpinTime < 60000) setIsLimitReached(true);
    }, []);

    const deg2rad = (deg) => deg * (Math.PI / 180);

    const drawWheel = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(center, center, radius + borderWidth / 2, 0, Math.PI * 2);
        ctx.lineWidth = borderWidth;
        ctx.strokeStyle = "#e5e7eb";
        ctx.stroke();

        let currentDeg = deg;
        colorData.forEach((color, i) => {
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.shadowColor = "rgba(0,0,0,0.2)";
            ctx.shadowBlur = 8;
            ctx.moveTo(center, center);
            ctx.arc(center, center, radius, deg2rad(currentDeg), deg2rad(currentDeg + sliceDeg));
            ctx.lineTo(center, center);
            ctx.fill();
            ctx.shadowBlur = 0;

            const textAngle = currentDeg + sliceDeg / 2;
            ctx.save();
            ctx.translate(center, center);
            ctx.rotate(deg2rad(textAngle));
            ctx.textAlign = "center";
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 20px sans-serif";

            const text = labelData[i]?.text || "";
            const shortText = text.length > 18 ? text.slice(0, 18) + "…" : text;
            ctx.fillText(shortText, radius * 0.62, 0);
            ctx.restore();

            currentDeg += sliceDeg;
        });
    };

    useEffect(() => {
        drawWheel();
    }, [deg, labelData]);

    const audioRef = useRef(new Audio(Sound));

    const spin = () => {
        if (isSpinning || isLimitReached) return setShowPopup(true);
        setIsSpinning(true);
        setResult(null);
        audioRef.current.play();
    
        const availablePrizes = prizesData.filter(p => p.remaining_quantity > 0);
        if (availablePrizes.length === 0) {
            setErrorMessage("All prizes are depleted.");
            setIsSpinning(false);
            return;
        }
    
        const duration = 3000;
        const totalRotation = 360 * 10;
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);
        const start = performance.now();
    
        // Randomly pick an available prize
        const winningPrize = availablePrizes[Math.floor(Math.random() * availablePrizes.length)];
        const winningIndex = prizesData.findIndex(p => p.name === winningPrize.name);
    
        // Compute angle that will put the selected slice under the arrow (270°)
        const sliceAngle = 360 / prizesData.length;
        const targetAngle = 270 - (winningIndex * sliceAngle) - sliceAngle / 2;
        const finalRotation = 360 * 5 + (360 + targetAngle) % 360;
    
        const initialDeg = deg;
    
        const animate = (timestamp) => {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOut(progress);
            const angle = initialDeg + (finalRotation - initialDeg) * eased;
            setDeg(angle % 360);
    
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                const resultPrize = labelData[winningIndex];
                setResult(resultPrize?.text || "");
                setHistory((prev) => [...prev, resultPrize?.text || ""]);
                setIsSpinning(false);
    
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ["#ff0", "#0f0", "#f0f", "#0ff"]
                });
    
                const prize = prizesData.find((p) => p.name === resultPrize?.text);
                if (prize) setPrizeId(prize.id);
    
                new Audio(CoinSound).play();
                setIsLimitReached(true);
                setShowPopup(true);
                localStorage.setItem("lastSpinTime", Date.now());
            }
        };
    
        requestAnimationFrame(animate);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-sky-800 via-blue-900 to-slate-800 relative overflow-hidden p-4">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl z-0 rounded-xl" />
            {showPopup && <GamePopup message={result} />}
            {errorMessage && <WarningPopup message={errorMessage} />}
            <h1 className="text-4xl md:text-5xl font-bold text-white z-10 mb-6 animate-pulse">Spin to Win!</h1>
            <h2 className="text-yellow-300 text-xs font-semibold drop-shadow-[0_0_6px_rgba(255,215,0,0.8)]">powered by Royal Paan</h2>
            <br/>
            <div className="relative z-10 w-full max-w-[90vw] sm:max-w-[420px]">
                <div className="relative w-full aspect-square">
                    <canvas
                        ref={canvasRef}
                        width={canvasSize}
                        height={canvasSize}
                        className="w-full h-full object-contain rounded-full shadow-xl border-4 border-white"
                    />
                    {/* Downward-pointing arrow at the top */}
                    <svg
                        className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 animate-bounce rotate-180"
                        width="40"
                        height="40"
                        viewBox="0 0 100 100"
                    >
                        <polygon points="50,0 90,100 10,100" fill="#facc15" stroke="#000" strokeWidth="2" />
                    </svg>
                </div>
            </div>
            <div className="mt-6 text-center z-10">
                <button
                    onClick={spin}
                    disabled={isSpinning || isLimitReached}
                    className={`px-6 py-3 text-lg font-bold rounded-md transition-all ${
                        isLimitReached ? "bg-gray-500 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-500 text-black"
                    }`}
                >
                    {isLimitReached ? "Come Back Later" : "Play Now"}
                </button>
                <p className="mt-4 text-xl font-semibold text-white">
                    {result ? `🎉 You won: ${result}` : "Give it a spin!"}
                </p>
            </div>
            <div className="mt-6 w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-4 text-white text-left">
                <h2 className="text-lg font-bold mb-2">How Gamification Works? <a href="https://idealmart.ca/faqs.html#gamification" rel="noreferrer" className="underline">FAQs</a>
                </h2>
            </div>
        </div>
    );
};

export default SpinGame2;
