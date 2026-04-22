import { useState } from "react";
import EmulatorNameAndIcon from "../EmulatorNameAndIcon";
import EditSettingsWindow from "./EditSettingsWindow";
import AutoInstallWindow from "./AutoInstallWindow";
import { useEffect } from "react";

const SettingsWindow = ({selectedEmulator, emulators, ResetEmulator, SetEmulator, isLoading, SetRomFolder, ResetRomFolder}) => {
    const SelectedEmulatorExePath = () => {
        if (!emulators.find(x=>x.name===selectedEmulator)) return undefined;
        return emulators.find(x=>x.name===selectedEmulator).exePath
    }
    const RomFolderPath = () => {
        if (!emulators.find(x=>x.name==='Rom Folder')) return undefined;
        return emulators.find(x=>x.name==='Rom Folder').folderPath
    }

    const [userConfigureManually, setUserConfigureManually] = useState(false);

    /* When changing emulator settings window, default to auto-install window if not configured */
    useEffect(() => {
        setUserConfigureManually(false);
    }, [selectedEmulator])

    return (
        <div class="emulator-settings">
                <div className="emulator-settings-wrapper">
                    <div className="settings-title-wrapper">
                        <i className="bi bi-gear-fill settings-gear"></i>
                        <h2>Emulator Configuration</h2>
                    </div>
                    {userConfigureManually || SelectedEmulatorExePath() !== undefined || (RomFolderPath() !== undefined && selectedEmulator === 'Rom Folder') ? (
                        <EditSettingsWindow 
                            selectedEmulator={selectedEmulator}
                            emulators={emulators}
                            ResetEmulator={ResetEmulator}
                            SetEmulator={SetEmulator}
                            isLoading={isLoading}
                            SetRomFolder={SetRomFolder}
                            ResetRomFolder={ResetRomFolder}
                            SelectedEmulatorExePath={SelectedEmulatorExePath}
                            RomFolderPath={RomFolderPath}
                            setUserConfigureManually={setUserConfigureManually}
                    />) : (
                        <AutoInstallWindow 
                        selectedEmulator={selectedEmulator} 
                        setUserConfigureManually={setUserConfigureManually}      
                        />
                    )}
                </div>
            </div>
    )
}

export default SettingsWindow;