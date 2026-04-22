import EmulatorNameAndIcon from "../EmulatorNameAndIcon";

const AutoInstallWindow = ({selectedEmulator, setUserConfigureManually}) => { 
    return (
        <div className="no-emulator-configured">
            <div className="emulator-header-surface">
                <EmulatorNameAndIcon emulatorName={selectedEmulator} size={3} />
            </div>
            <p>No path configured for {selectedEmulator}.</p>
            <div className="auto-install-buttons-wrapper">
                <button className="auto-install-button" onClick={() => console.log("Auto-installing " + selectedEmulator)}>
                    Auto Install/Configure</button>
                <button className="configure-manually-button" onClick={() => setUserConfigureManually(true)}>
                    Configure Manually
                </button>
            </div>
        </div>
     )    
}

export default AutoInstallWindow;