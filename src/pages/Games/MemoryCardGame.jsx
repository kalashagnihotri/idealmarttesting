import React from 'react';
import '@/pages/Games/Memory.css';
import MemoryCards from '@/components/games/MemoryCards';
import BG from '@/assets/games-img/memory/memory-game-bg.svg';


const MemoryCardGame = () => {
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center' style={{
            backgroundImage: `url(${BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
            <h1 className='heading'>Flip Fusion</h1>
            <MemoryCards />
        </div>
    )
}

export default MemoryCardGame