import Link from 'next/link'
import React from 'react'


const Hello = () => {
    return (
        <div className='bg-secondary w-full justify-center items-center'>
            <div className="flex flex-col items-center py-4 text-center ">
                <h1 className="text-xl md:text-2xl font-semibold mb-3">Hello Nike App</h1>
                <div className='flex flex-row space-x-2'>
                    <p className="text-sm md:text-base mb-1">Download the app to access everything Nike.</p>
                    <Link href='/products' className="underline text-sm md:text-base">Get Your Great</Link>
                </div>
            </div>
        </div>
    )
}

export default Hello