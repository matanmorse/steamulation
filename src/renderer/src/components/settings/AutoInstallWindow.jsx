import { useState } from "react";
import EmulatorNameAndIcon from "../EmulatorNameAndIcon";
import { BarLoader } from "react-spinners";
import { useEmulator } from "../../contexts/SharedContext";

const AutoInstallWindow = ({selectedEmulator, setUserConfigureManually}) => { 
    const [isInstalling, setIsInstalling] = useState(false);
    const {refetchEmulators} = useEmulator();
    
    const DoAutoInstallation = async () => {    
        setIsInstalling(true);
        await window.autoInstallService.autoInstallAndConfigure(selectedEmulator)
        await refetchEmulators();
        setIsInstalling(false);
    }

    return (
        <div className="no-emulator-configured">
            <div className="emulator-header-surface">
                <EmulatorNameAndIcon emulatorName={selectedEmulator} size={3} />
            </div>
            <p>No path configured for {selectedEmulator}.</p>
            <div className="auto-install-buttons-wrapper">
                {selectedEmulator !== 'Rom Folder' &&
                <button className="auto-install-button" onClick={() => DoAutoInstallation()}>
                    Auto Install/Configure</button>
                }
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