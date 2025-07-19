import EmulatorNameAndIcon from "../EmulatorNameAndIcon";

const SettingsWindow = ({selectedEmulator, emulators, ResetEmulator, SetEmulator, isLoading, SetRomFolder, ResetRomFolder}) => {
    const SelectedEmulatorExePath = () => emulators.find(x=>x.name===selectedEmulator).exePath
    const RomFolderPath = () => emulators.find(x=>x.name==='Rom Folder').folderPath
    

    return (
        <div class="emulator-settings">
                <div className="emulator-settings-wrapper">
                    <div className="settings-title-wrapper">
                        <i className="bi bi-gear-fill settings-gear"></i>
                        <h2>Emulator Configuration</h2>
                    </div>
                    <form className="settings-form">
                        <EmulatorNameAndIcon emulatorName={selectedEmulator} size={4.5} bold={true} otherText={"Emulator Settings"}/>
                        <div className="exe-path-form-wrapper">
                            {selectedEmulator != 'Rom Folder' ?
                            <>
                            <label>Emulator Executable Path:</label>
                            <div className="exe-input-wrapper">
                                {!isLoading &&
                                    <div className="input-wrapper">
                                        <input type="text" readOnly class={"current-exe-path " + (SelectedEmulatorExePath() === undefined && "gray-text")}
                                        placeholder={ SelectedEmulatorExePath() ?? "No emulator selected"}
                                        >
                                        </input>
                                        <i className="bi bi-x-lg" onClick={(e) => ResetEmulator(e, selectedEmulator)}></i>
                                    </div>
                                }
                                <button class="exe-input-button" onClick={(e) => SetEmulator(e, selectedEmulator) }><i class="bi bi-folder" style={{fontSize: '16pt'}}></i> Browse</button>
                            </div>
                            <p class="text-info">Select the main executable file for this emulator.</p>
                            </> : 
                            /* Special window for rom folder*/
                            <>
                              <label>Folder path containing ROMs:</label>
                              <div className="exe-input-wrapper">
                                <div className="input-wrapper">
                                    <input type="text" readOnly class={"current-exe-path " + (RomFolderPath() === undefined && "gray-text")}
                                    placeholder={RomFolderPath() ?? "No ROMs Selected"}
                                    >
                                    
                                    </input>
                                    <i className="bi bi-x-lg" onClick={(e) => ResetRomFolder(e)}></i>
                                </div>
                                <button class="exe-input-button" onClick={(e) => SetRomFolder(e) }><i class="bi bi-folder" style={{fontSize: '16pt'}}></i> Browse</button>
                            </div>
                            <p class="text-info">Select the folder where your ROMs are located (for best experience, put all roms in one folder).</p>
                            </>
                            } 
                            
                          
                        </div>
                        
                    </form>
                </div>
            </div>
    )
}

export default SettingsWindow;