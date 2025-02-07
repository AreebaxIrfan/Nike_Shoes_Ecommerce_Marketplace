'use client'
import { SignIn, useUser } from '@clerk/nextjs'


export default function Page() {
    const { user } = useUser()
    if (!user) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen '>
                <SignIn />
            </div>
        )
    }
    return <div>Already signed in</div>
}