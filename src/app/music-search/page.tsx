import { SearchIcon, PlusCircleIcon } from "lucide-react";

export default function MusicSearchPage() {
    return <div className="flex flex-col h-full gap-3">
        <div className="flex relative w-full content-center text-center items-center gap-4">
            <SearchIcon className="absolute ml-3 p-1" />
            <input type="text" placeholder="ค้นหาเพลง" className="bg-slate-600/20 rounded-full placeholder:text-gray-400/50 text-sm px-10 w-full" />
        </div>

        <div className="flex flex-wrap overflow-y-scroll">
            {Array(50).fill(10).map((_, idx) => <div key={`result_${idx}`} className="flex flex-col w-1/2 @lg:w-1/3 @2xl:w-1/4 @5xl:w-1/5 gap-2 p-5 hover:bg-slate-700/50 rounded-lg">
                <div className="flex bg-red-500 w-full aspect-w-1 aspect-h-1 rounded-xl"></div>
                <div className="flex flex-col gap-1 text-sm">
                    This is Taylor Swift
                </div>
                <div className="flex text-xs items-center hover:underline hover:text-white cursor-pointer">
                    <PlusCircleIcon className="p-1" /> Add Queue
                </div>
            </div>)}
        </div>

    </div>
}