import React, { useState, useEffect } from "react";
import "@/pages/Games/Quiz.css";
// import Clock from "@/assets/games-img/quiz/time.gif";

const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Madrid", "Rome"],
        answer: "Paris",
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4",
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Shakespeare", "Hemingway", "Tolkien", "Dickens"],
        answer: "Shakespeare",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars",
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: "Pacific",
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
        answer: "Da Vinci",
    },
    {
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        answer: "8",
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "NaCl"],
        answer: "H2O",
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "India", "Japan", "Korea"],
        answer: "Japan",
    },
    {
        question: "What is the fastest land animal?",
        options: ["Cheetah", "Lion", "Horse", "Eagle"],
        answer: "Cheetah",
    },
];

const QuizGame = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(600);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        } else {
            setGameOver(true);
        }
    }, [timer]);

    const handleAnswerSelect = (option) => {
        setSelectedAnswer(option);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
        setSelectedAnswer(null);

        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setGameOver(true);
        }
    };

    const handleResetGame = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setTimer(600);
        setGameOver(false);
    };

    return (
        <div className="relative">
            {/* Animated background */}
            <div className="area">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            {/* Centered Quiz Content */}
            <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6">
                <h1 className="text-white font-bold text-3xl p-4 mb-2">Brain Blitz</h1>
                {!gameOver ? (
                    <div className="w-full max-w-md p-6  bg-white/30 shadow rounded-lg">
                        <div className="text-center mb-4">
                            <p className="text-lg text-white sm:text-xl font-bold">Time left: {timer}s</p>
                        </div>
                        <h2 className="text-lg sm:text-xl text-white font-bold mb-4">
                            Question {currentQuestionIndex + 1} / {questions.length}
                        </h2>
                        <p className="text-white mb-4 text-sm font-semibold sm:text-base">
                            {questions[currentQuestionIndex].question}
                        </p>
                        <div className="mb-4">
                            {questions[currentQuestionIndex].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerSelect(option)}
                                    className={`w-full mb-2 py-2 px-4 text-left rounded-full border focus:outline-none transition
              ${selectedAnswer === option
                                            ? "bg-[#9da2fe] text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }
            `}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleNextQuestion}
                            className="btn"
                            disabled={!selectedAnswer}
                        >
                            Next Question
                        </button>
                    </div>
                ) : (
                    <div className="w-full max-w-md p-6 bg-white shadow rounded-lg text-center">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">
                            {timer > 0 ? "You Win!" : "Game Over"}
                        </h2>
                        <p className="text-gray-700 mb-4 text-sm sm:text-base">
                            Your Score: {score}/{questions.length}
                        </p>
                        <button
                            onClick={handleResetGame}
                            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        </div>


    );
};

export default QuizGame;
