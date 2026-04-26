const Debug = () => {
    return (
        <div>
            <button onClick={() => window.debugService.clearCache('metadata')}>Clear Metadata Cache</button>
            <button onClick={() => window.debugService.clearCache('gameLists')}>Clear Game Lists</button>
            <button onClick={() => window.debugService.clearRoms()}>Clear Roms</button>
        </div>

    )
}

export default Debug;
