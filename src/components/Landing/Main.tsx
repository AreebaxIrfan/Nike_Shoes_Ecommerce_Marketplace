import React from 'react'
import Image from 'next/image';
import Link from 'next/link';


const Main = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <section>
                <Image
                    src="/main.avif"
                    alt="Nike Air Max Pulse shoes"
                    width={1344}
                    height={700}
                    className='w-full'
                    priority
                />
            </section>

            <section className="text-center mb-12">
                <h2 className="text-lg font-bold mb-2">First Look</h2>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">NIKE AIR MAX PULSE</h1>
                <p className="max-w-2xl mx-auto mb-8">
                    Extreme comfort. Hyper durable. Max volume. Introducing the Air Max Pulse - designed to push you past your
                    limits and help you go to the max.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/sign-in" className="rounded-full bg-black text-white px-6 py-2 font-bold">
                        Notify Me
                    </Link>
                    <Link href="/snkrs" className="rounded-full bg-black text-white px-6 py-2 font-bold">
                        Shop Air Max
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Main