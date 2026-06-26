import React, { ReactNode } from 'react'

import Sidebar from '@/components/Sidebar'

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className='relative'>
            <div className='flex'>
                <Sidebar />
                <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-6 max-sm:pt-16 sm:px-14'>
                    <div className='w-full'>
                        {children}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default HomeLayout