import { redirect } from "next/navigation"

export default function MainPage() {
    return redirect("/v3/music-search");
}