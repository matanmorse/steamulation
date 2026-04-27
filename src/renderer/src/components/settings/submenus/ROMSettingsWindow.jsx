import { useEffect, useState } from "react";

const ROMSettingsWindow = () => {
    const [roms, setRoms] = useState([])
    
    useEffect(() => {
        const getRoms = async () => setRoms(await window.fileService.getGames())
        getRoms();
    }, [])

    return (
        <div className="rom-settings">
            <label>Select folders containing ROMs yourself, or use the auto scan feature:</label>
            <div className="auto-install-buttons-wrapper">
                <button className="btn btn-primary btn-lg" onClick={(e) => {e.preventDefault(); window.scanService.doRomAutoScan()}}>Auto Scan</button>
                <button className="btn btn-ghost btn-lg">Select folder manually</button>
            </div>
            <h4>{roms.length} Loaded ROMs:</h4>
            <table className="loaded-roms-table">
                <thead>
                    <tr>
                        <td>Name</td>
                    </tr>
                </thead>
                <tbody>
                    {roms.map((rom, key) => {
                        return (
                        <tr key={key}>
                            <td>{rom.path}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        <div/>
        </div>
    )
}

export default ROMSettingsWindow;