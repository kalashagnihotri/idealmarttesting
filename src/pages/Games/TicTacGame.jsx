import React, { useState, useEffect } from "react";
import Bg from "@/assets/games-img/TickToeBg.jpg";

const TicTacGame = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [status, setStatus] = useState("Next Player: X");

    // useEffect(() => {
    //     // const token = sessionStorage.getItem("authToken");
    //     const token = "232a056827f70ac8888ed36168491ca1c804305f";

    //     if (token) {
    //         console.log("Token retrieved from sessionStorage:", token);
    //         sendTokenToAPI(token);
    //     } else {
    //         console.log("No token found in sessionStorage.");
    //     }
    // }, []);

    // const sendTokenToAPI = async (token) => {
    //     const payload = {
    //         game_id: "7c01089f-b64c-4d1e-bf46-f670a1fc3d36",
    //         prize_id: "dff75485-4387-4bba-bddd-cac51ff3a567",
    //     };

    //     try {
    //         const response = await fetch("https://api.idm.internal.destion.in/api/games/post-reward/", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Token ${token}`,
    //             },
    //             body: JSON.stringify(payload), // Pass the JSON object here
    //         });

    //         if (!response.ok) {
    //             console.error("Failed to send token to API:", response.status, response.statusText);
    //             const errorDetails = await response.text();
    //             console.error("Error details:", errorDetails);
    //             return;
    //         }

    //         const contentType = response.headers.get("content-type");
    //         if (contentType && contentType.includes("application/json")) {
    //             const data = await response.json();
    //             console.log("Response from API:", data);
    //         } else {
    //             const text = await response.text();
    //             console.log("Response from API (non-JSON):", text);
    //         }
    //     } catch (error) {
    //         console.error("Error while sending token to API:", error);
    //     }
    // };

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (index) => {
        if (board[index] || calculateWinner(board)) return;

        const newBoard = board.slice();
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const winner = calculateWinner(newBoard);
        if (winner) {
            setStatus(`Winner: ${winner}`);
        } else {
            setStatus(`Next Player: ${!isXNext ? "X" : "O"}`);
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setStatus("Next Player: X");
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-black bg-cover bg-center"
            style={{
                backgroundImage: `url(${Bg})`,
            }}
        >
            <div className="bg-black bg-opacity-70 w-full h-full absolute top-0 left-0" />
            <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-blue-400 to-purple-500 neon-text">
                    Tic-Tac-Toe
                </h1>
                <div className="grid grid-cols-3 gap-4">
                    {board.map((square, index) => (
                        <button
                            key={index}
                            onClick={() => handleClick(index)}
                            className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] flex items-center justify-center border-4 border-teal-300 neon-border text-2xl md:text-3xl font-bold text-teal-200 bg-transparent shadow-lg transform transition-transform duration-200 hover:scale-110"
                        >
                            {square}
                        </button>
                    ))}
                </div>
                <p className="text-lg mt-6 text-lime-300 neon-text">{status}</p>
                <button
                    onClick={resetGame}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 hover:bg-blue-800 neon-border"
                >
                    Reset Game
                </button>
            </div>
        </div>
    );
};

export default TicTacGame;
