import React from 'react'

const MemoryCard = ({ item, id, handleClick }) => {

    const itemClass = item.stat ? " active " + item.stat : ""

    return (
        <div className={`${'card' + itemClass} bg-white flex justify-center items-center rounded-sm`} onClick={() => handleClick(id)}>
            <img className='w-3/4 h-3/4' src={item.img} alt='image' />
        </div>
    )
}

export default MemoryCard