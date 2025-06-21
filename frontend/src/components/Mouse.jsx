import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
const Mouse = () => {
    
    const mouseRef = useRef(null)
    
    useEffect(() => {
        const pos = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }
        const handleMouseMove = (e) => {

            pos.x = e.clientX
            pos.y = e.clientY

            gsap.to(mouseRef.current, {
                x: pos.x,
                y: pos.y,
                duration: 0.4,
                delay: 0.1,
                ease: "back.out"
            })
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }

    })

    return (
    <div
    style={{
        transform: `translate(-50%, -50%)`,
        width: '25px',
        height: '25px',
        border: '2px solid white',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 1000,
    }}
        ref={mouseRef}
        className='w-10 h-10 border-[1px] border-white rounded-full'
    ></div>
  )
}

export default Mouse