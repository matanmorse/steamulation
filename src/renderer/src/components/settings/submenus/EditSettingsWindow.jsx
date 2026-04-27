import { useState } from "react";
import { useEmulator } from "../../../contexts/SharedContext";
import EmulatorNameAndIcon from "../../EmulatorNameAndIcon"
import ROMSettingsWindow from "./ROMSettingsWindow";

const EditSettingsWindow = ({selectedEmulator, ResetEmulator, SetEmulator, SelectedEmulatorExePath, setUserConfigureManually}) => {
    const {emulators} = useEmulator();
    const [isInstalling, setIsInstalling] = useState(false);
    const {refetchEmulators} = useEmulator();

    const DoAutoInstallation = async (e) => {    
        e.preventDefault();
        setIsInstalling(true);
        await window.autoInstallService.autoInstallAndConfigure(selectedEmulator)
        await refetchEmulators();
        setIsInstalling(false);
    }

    const DoAutoScan = async (e) => {
        e.preventDefault();
        await window.scanService.doEmulatorAutoScan(selectedEmulator)
        await refetchEmulators()
    }

    return (
    <form className="settings-form">
        <EmulatorNameAndIcon emulatorName={selectedEmulator} size={4.5} bold={true}/>
        <div className="exe-path-form-wrapper">
            <label>Emulator Executable Path:</label>
            <div className="flex-row">
                <div className="exe-input-wrapper">
                    <div className="input-wrapper">
                        <input type="text" readOnly className={"current-exe-path " + (SelectedEmulatorExePath(selectedEmulator) !== undefined && "text-highlight")}
                        placeholder={ SelectedEmulatorExePath(selectedEmulator) ?? "Click browse to manually configure path for " + selectedEmulator }
                        >
                        </input>
                        <i className="reset-emulator bi bi-x-lg" onClick={(e) => ResetEmulator(e, selectedEmulator)}></i>
                    </div>
                </div>
                <button className="exe-input-button btn btn-primary" onClick={(e) => SetEmulator(e, selectedEmulator) }><i className="bi bi-folder" style={{fontSize: '16pt'}}></i> Browse</button>
            </div>

            {SelectedEmulatorExePath(selectedEmulator) !== undefined ?
            (<p className="text-info">{selectedEmulator} is correctly configured.</p>) :
            <>
            <p className="text-highlight">{selectedEmulator} has not been configured yet. See below for configuration options: </p>
            <div className="buttons">
                <div className="button-label">
                    <button className="btn btn-primary btn-lg" onClick={(e) => {e.preventDefault(); DoAutoInstallation(e)}}>Auto Install</button>
                    <p className="text-info">Automatically install {selectedEmulator} from the internet</p>
                </div>
                <div className="button-label">
                    <button className="btn btn-primary btn-lg" onClick={DoAutoScan}>Scan for existing</button>
                    <p className="text-info">Check for an existing {selectedEmulator} executable on your system</p>
                </div>               
                <div className="button-label">
                    <button className="btn btn-primary btn-lg" onClick={(e) => SetEmulator(e, selectedEmulator) }>Select .exe manually</button>
                    <p className="text-info">Browse your filesystem and select the {selectedEmulator} executable file</p>
                </div>
            </div>
            </>}
        </div>
    </form>
    )
}

export default EditSettingsWindow