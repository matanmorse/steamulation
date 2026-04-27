import { useState } from "react";
import { useEmulator } from "../../../contexts/SharedContext";
import EmulatorNameAndIcon from "../../EmulatorNameAndIcon";
import EditSettingsWindow from "./EditSettingsWindow";

const EmulatorsSettings = ({submenu, resetEmulator, setEmulator, selectedEmulatorExePath}) => {
    const {emulators} = useEmulator();
    const [selectedEmulator, setSelectedEmulator] = useState('Ares');

    return (
        <div className="emulators-settings">
            <div className="emulators-list">
                {emulators
                .filter(emulator => emulator.prettyName !== 'Rom Folder')
                .sort((a,b) => a.prettyName.localeCompare(b.prettyName))
                .map((emulator, key) => {return (
                <div key={key}
                className={"emulator-select-wrapper "
                + (submenu === emulator.prettyName ?
                "emulator-select-selected" : "emulator-select-hover")}
                onClick={() => setSelectedEmulator(emulator.name)}
                >
                    <EmulatorNameAndIcon
                        key={key}
                        emulatorName={emulator.prettyName}
                        size={3.6}
                    />
                </div>
            )})}
        </div>
        <EditSettingsWindow 
        selectedEmulator={selectedEmulator}
        ResetEmulator={resetEmulator}
        SetEmulator={setEmulator}
        SelectedEmulatorExePath={selectedEmulatorExePath}/>
    </div>
    )
}

export default EmulatorsSettings;