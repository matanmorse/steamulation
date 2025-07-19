import '../../styles/Settings.css'
import EmulatorNameAndIcon from '../EmulatorNameAndIcon'
const SettingsSidebar = ({emulators, isLoading, selectedEmulator, setSelectedEmulator}) => {
    return (
        <div class="sidebar">
                <div className="sidebar-title-wrapper">
                    <i class="bi bi-gear settings-gear"></i>
                    <h1 class="sidebar-title">App Settings</h1>
                </div>
                <div className="emulators-list">
                        {/* <div 
                        className={"emulator-select-wrapper " 
                        + (selectedEmulator === 'RomFolder' ? 
                        "emulator-select-selected" : "emulator-select-hover")}
                        onClick={() => setSelectedEmulator('Rom Folder')}>                    
                            <EmulatorNameAndIcon
                                emulatorName={"Rom Folder"}
                            />                        
                        </div> */}

                        {!isLoading && 
                        emulators.map((emulator, key) => {return (
                        <div key={key} 
                        className={"emulator-select-wrapper " 
                        + (selectedEmulator === emulator.prettyName ? 
                        "emulator-select-selected" : "emulator-select-hover")}
                        onClick={() => setSelectedEmulator(emulator.prettyName)}>

                            <EmulatorNameAndIcon
                                key={key}
                                emulatorName={emulator.prettyName}
                            />
                        </div>
                    
                    )})}
                </div>
            </div>
    )
}

export default SettingsSidebar