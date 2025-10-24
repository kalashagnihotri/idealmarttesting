import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function SurpriseGift() {
  const [revealed, setRevealed] = useState(false);
  const [prize, setPrize] = useState(null);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  const triggerFireworks = () => {
    const duration = 2000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
      } else {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { x: Math.random(), y: Math.random() * 0.5 },
          shapes: ['star'],
        });
      }
    }, 200);
  };

  const revealPrize = async () => {
    setLoading(true);
    try {
      //const response = await fetch('/api/get-surprise-prize');
      const response = '{ "name": "12 FREE Deliveries", "image": "/src/assets/about-img/delivery1.png" }';
      const data = JSON.parse(response);
      setPrize(data);
      setRevealed(true);
      audioRef.current?.play();
      triggerFireworks();
    } catch (err) {
      console.error('Failed to fetch prize', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 flex flex-col items-center justify-center p-4 overflow-hidden">
      <audio ref={audioRef} src="/src/assets/games-img/spin/clap.mp3" preload="auto" />
      <AnimatePresence>
        {!revealed && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="text-center"
          >
            <motion.img
              src="/src/assets/about-img/surprise.jpg"
              alt="Gift"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-99 h-99 mx-auto mb-1 cursor-pointer rounded-xl drop-shadow-xl"
              onClick={revealPrize}
            />
          </motion.div>
        )}

        {revealed && prize && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <motion.h2
              className="text-2xl font-bold text-green-600 mb-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              🎉 You won: {prize.name} 🎉
            </motion.h2>
            <motion.img
              src={prize.image || 'https://via.placeholder.com/150'}
              alt={prize.name}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-99 h-99 mx-auto rounded-xl shadow-lg"
            />
          </motion.div>
        )}

        {loading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-lg font-semibold text-gray-600">
            Revealing...
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}