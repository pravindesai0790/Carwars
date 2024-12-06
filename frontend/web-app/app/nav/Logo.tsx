/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { AiOutlineCar } from "react-icons/ai";
import { useParamsStore } from "../hooks/useParamsStore";
import { usePathname, useRouter } from "next/navigation";

export default function logo() {
    const router = useRouter();
    const pathname = usePathname();
    const reset = useParamsStore(state => state.reset);

    function doReset() {
        if(pathname !== '/') router.push('/');
        reset();
    }
    

    return (
        <div onClick={doReset} className='cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500'>
            <AiOutlineCar size={34}/>
            <div>Carwars Auctions</div>
        </div>
    )
}