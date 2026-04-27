const Debug = () => {
    return (
        <div>
            <button className="btn btn-primary" onClick={() => window.debugService.clearCache('metadata')}>Clear Metadata Cache</button>
            <button className="btn btn-primary" onClick={() => window.debugService.clearCache('gameLists')}>Clear Game Lists</button>
            <button className="btn btn-primary" onClick={() => window.debugService.clearRoms()}>Clear Roms</button>
        </div>

    )
}

export default Debug;
