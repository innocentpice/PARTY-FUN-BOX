import YTSearch from "youtube-sr"

export default function MusicSearch() {

    const test = YTSearch.searchOne("mood lofi");

    return <div>{JSON.stringify(test, null, 2)}</div>
}