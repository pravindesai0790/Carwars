'use client'

import { AiOutlineCar } from "react-icons/ai";
import { useParamsStore } from "../hooks/useParamsStore";

export default function logo() {
    const reset = useParamsStore(state => state.reset);

    return (
        <div onClick={reset} className='cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500'>
            <AiOutlineCar size={34}/>
            <div>Carwars Auctions</div>
        </div>
    )
}