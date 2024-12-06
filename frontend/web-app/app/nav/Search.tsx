/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { FaSearch } from "react-icons/fa";
import { useParamsStore } from "../hooks/useParamsStore";
import { usePathname, useRouter } from "next/navigation";

export default function Search() {
    const router = useRouter();
    const pathname = usePathname();
    const setParams = useParamsStore(state => state.setParams);
    const setSearchValue = useParamsStore(state => state.setSearchValue);
    const searchValue = useParamsStore(state => state.searchValue);

    function onChange(event: any) {
        if(pathname !== '/') router.push('/');
        setSearchValue(event.target.value);
    }

    function search() {
        setParams({searchTerm: searchValue});
    }

    return (
        <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'>
            <input 
                onKeyDown={(e: any) => {
                    if(e.key === 'Enter') search()
                }}
                onChange={onChange}
                value={searchValue}
                type="text"
                placeholder='Search for cars by make, model or color'
                className='
                    input-custom
                    text-sm
                    text-gray-600
                '
            />
            <button onClick={search}>
                <FaSearch size={32} className='bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2' />
            </button>
        </div>
    )
}