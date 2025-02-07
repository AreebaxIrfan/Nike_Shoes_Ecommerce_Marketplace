import { Suspense } from "react";
import Category from "@/components/Landing/Category";
import Hero from "@/components/Landing/Hero";
import Ender from "@/components/Landing/Ender";

export default function Home() {
   return (
      <>
         <Suspense>
            <Hero />
         </Suspense>
         <Suspense>
            <Category />
         </Suspense>
         <Suspense>
            <Ender />
         </Suspense>

      </>
   );
}
