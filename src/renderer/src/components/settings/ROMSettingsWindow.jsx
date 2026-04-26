import { useEffect, useState } from "react";

const ROMSettingsWindow = () => {
    const [roms, setRoms] = useState([])
    
    useEffect(() => {
        const getRoms = async () => setRoms(await window.fileService.getRoms())
        getRoms();
    }, [])

    return (
        <>
            <label>Select folders containing ROMs yourself, or use the auto scan feature:</label>
            <div className="auto-install-buttons-wrapper">
                <button>Auto Scan</button>
                <button className="configure-manually-button">Select folder manually</button>
            </div>
            <h4>{roms.length} Loaded ROMs:</h4>
            <table className="loaded-roms-table">
                <thead>
                    <tr>
                        <td>Name</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default ROMSettingsWindow;