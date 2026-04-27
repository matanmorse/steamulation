import { useState } from "react";
import EmulatorNameAndIcon from "../EmulatorNameAndIcon";
import EditSettingsWindow from "./submenus/EditSettingsWindow";
import { useEffect } from "react";
import { useEmulator } from "../../contexts/SharedContext";
import EmulatorsSettings from "./submenus/EmulatorsSettings";
import ROMSettingsWindow from "./submenus/ROMSettingsWindow";

const SettingsWindow = ({submenu, ResetEmulator, SetEmulator, SetRomFolder, ResetRomFolder, fetchEmulatorConfigs}) => {
    const SettingsWindowsRegistries = {
        roms: ROMSettingsWindow,
        emulators: EmulatorsSettings
    }

    const ActiveWindow = SettingsWindowsRegistries[submenu];
    const {emulators} = useEmulator();
    const SelectedEmulatorExePath = (emulatorName) => {
        if (!emulators.find(x=>x.name===emulatorName)) return undefined;
        return emulators.find(x=>x.name===emulatorName).exePath
    }

    const RomFolderPath = () => {
        if (!emulators.find(x=>x.name==='Rom Folder')) return undefined;
        return emulators.find(x=>x.name==='Rom Folder').folderPath
    }

    const [userConfigureManually, setUserConfigureManually] = useState(false);

    /* When changing emulator settings window, default to auto-install window if not configured */
    useEffect(() => {
        setUserConfigureManually(false);
    }, [submenu])

    return (
        <ActiveWindow 
            submenu={submenu}
            resetEmulator={ResetEmulator}
            SetRomFolder={SetRomFolder}
            setEmulator={SetEmulator}
            selectedEmulatorExePath={SelectedEmulatorExePath}
        />
    )
}

export default SettingsWindow;