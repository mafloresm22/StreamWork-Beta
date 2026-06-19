import React from 'react'
import Image from 'next/image'

const Navbar = () => {
    return (
        <nav className='sticky top-0 z-20 w-full h-15 flex justify-between items-center bg-white/90 backdrop-blur-md pl-1 pr-6 border-b border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]'>
            <div className='flex items-center'>
                <Image src="/icons/Connect.png" alt="StreamWork" width={193} height={40} />
            </div>
        </nav>
    )
}

export default Navbar