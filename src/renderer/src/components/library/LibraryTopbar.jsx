import { useRef, useState } from "react";

const LibraryTopbar = ({setLibraryFilter, libraryFilter}) => {
    const [searchValue, setSearchValue] = useState("")

    return (
    <div className="library-topbar">
        <div className="search-wrapper">
            <i className="bi bi-search" />
            <input value={searchValue} onChange={(e) => setSearchValue(setSearchValue(e))} type="text" className="games-search" placeholder="Search your library..." />
            {<i onClick={()=> setSearchValue('')} className={`bi bi-x ${searchValue==='' && 'transparent'}`}></i>}
        </div>
        <div className="library-filters">
            <button className={`btn ${libraryFilter === 'all' ? 'btn-primary selected' : 'btn-ghost'}`} onClick={() => setLibraryFilter('all')}>All</button>
            <button className={`btn ${libraryFilter === 'playable' ? 'btn-primary selected' : 'btn-ghost'}`} onClick={() => setLibraryFilter('playable')}>Playable</button>
            <button className={`btn ${libraryFilter === 'needs_config' ? 'btn-primary selected' : 'btn-ghost'}`} onClick={() => setLibraryFilter('needs_config')}>Needs Configuration</button>
        </div>
    </div>
    )
}

export default LibraryTopbar;