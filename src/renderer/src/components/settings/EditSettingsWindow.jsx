import EmulatorNameAndIcon from "../EmulatorNameAndIcon"
import ROMSettingsWindow from "./ROMSettingsWindow";

const EditSettingsWindow = ({selectedEmulator, emulators, ResetEmulator, SetEmulator, SelectedEmulatorExePath, setUserConfigureManually}) => {
    return (
    <form className="settings-form">
        <EmulatorNameAndIcon emulatorName={selectedEmulator} size={4.5} bold={true} otherText={selectedEmulator != 'Rom Folder' ? "Emulator Settings" : "Settings"}/>
        <div className="exe-path-form-wrapper">
            {selectedEmulator != 'Rom Folder' ?
            <>
            <label>Emulator Executable Path:</label>
            <div className="exe-input-wrapper">
                <div className="input-wrapper">
                    <input type="text" readOnly class={"current-exe-path " + (SelectedEmulatorExePath() === undefined && "gray-text")}
                    placeholder={ SelectedEmulatorExePath() ?? "Click browse to manually configure path for " + selectedEmulator }
                    >
                    </input>
                    <i className="bi bi-x-lg" onClick={(e) => ResetEmulator(e, selectedEmulator)}></i>
                </div>
                <button class="exe-input-button" onClick={(e) => SetEmulator(e, selectedEmulator) }><i class="bi bi-folder" style={{fontSize: '16pt'}}></i> Browse</button>
            </div>
            {SelectedEmulatorExePath() !== undefined ? 
            (<p class="text-info">Select the main executable file for this emulator. </p>):
            (<p class="text-info">Select the main executable file for this emulator, or try <a
            className="auto-install-link"
            onClick={(e) => {e.preventDefault; setUserConfigureManually(false);}}
            >auto-install and configure</a>.</p>)}
            </> : 
            /* Special window for rom folder*/
                <ROMSettingsWindow 
                />
            } 
        </div>
    </form>
    )
}

export default EditSettingsWindow