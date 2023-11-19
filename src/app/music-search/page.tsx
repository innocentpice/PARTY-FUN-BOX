import { SearchIcon } from "lucide-react";

export default function MusicSearchPage() {
    return <div className="flex flex-col w-full">
        <div className="flex relative w-full content-center text-center items-center">
            <SearchIcon className="absolute ml-3 p-1" />
            <input type="text" placeholder="ค้นหาเพลง" className="bg-slate-600/20 rounded-full placeholder:text-white text-sm px-10 w-full" />
        </div>
    </div>
}