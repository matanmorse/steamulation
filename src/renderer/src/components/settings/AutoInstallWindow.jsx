import { useState } from "react";
import EmulatorNameAndIcon from "../EmulatorNameAndIcon";
import { BarLoader } from "react-spinners";
const AutoInstallWindow = ({selectedEmulator, setUserConfigureManually, fetchEmulatorConfig}) => { 
    const [isInstalling, setIsInstalling] = useState(false);

    const DoAutoInstallation = async () => {    
        setIsInstalling(true);
        await window.autoInstallService.autoInstallAndConfigure(selectedEmulator)
        await fetchEmulatorConfig();
        setIsInstalling(false);
    }

    return (
        <div className="no-emulator-configured">
            <div className="emulator-header-surface">
                <EmulatorNameAndIcon emulatorName={selectedEmulator} size={3} />
            </div>
            <p>No path configured for {selectedEmulator}.</p>
            <div className="auto-install-buttons-wrapper">
                <button className="auto-install-button" onClick={() => DoAutoInstallation()}>
                    Auto Install/Configure</button>
                <button className="configure-manually-button" onClick={() => setUserConfigureManually(true)}>
                    Configure Manually
                </button>
            </div>
            {isInstalling && 
            <div className="auto-install-progress">
                <p>Installing and configuring {selectedEmulator}...</p>
                <BarLoader color="#36d7b7" />
            </div>}
        </div>
     )    
}

export default AutoInstallWindow;