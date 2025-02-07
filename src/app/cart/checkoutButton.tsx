import { useAuth } from '@clerk/nextjs';
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function CheckoutButton() {
    const { isSignedIn } = useAuth(); // Check sign-in state

    console.log("User Signed In:", isSignedIn); // Debugging
    const { userId, isLoaded } = useAuth();
    const pathname = usePathname();

    if (!isLoaded) {
        return null;
    }
    return (
        <div>
            {!userId && (
                <Link href='/sign-in' className="w-full bg-gray-300 text-gray-800 px-6 py-3 rounded-md">
                    Login to Checkout
                </Link>
            )
            }
            {/* If user is NOT signed in, show a login button */}
            {userId && (
                <Link href='/checkout' className="w-full bg-black text-white px-6 py-3 rounded-md " >
                    Proceed to Checkout
                </Link>
            )
            }

           
        </div>
    );
}
