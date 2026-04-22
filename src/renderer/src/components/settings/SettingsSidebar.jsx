import '../../styles/Settings.css'
import EmulatorNameAndIcon from '../EmulatorNameAndIcon'
const SettingsSidebar = ({emulators, isLoading, selectedEmulator, setSelectedEmulator}) => {
    return (
        <div class="sidebar">
                <div className="sidebar-title-wrapper">
                    <i class="bi bi-gear settings-gear"></i>
                    <h1 class="sidebar-title">App Settings</h1>
                </div>
                <h3>Emulators</h3>
                <hr/>
                <div className="emulators-list">
                        {!isLoading && 
                        emulators
                        .filter(emulator => emulator.prettyName !== 'Rom Folder')
                        .sort((a,b) => a.prettyName.localeCompare(b.prettyName))
                        .map((emulator, key) => {return (
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
                <h3>Rom Folder</h3>
                <hr/>
                <div className="romfolder-select">
                    <div
                        className={"emulator-select-wrapper " 
                        + (selectedEmulator === 'Rom Folder' ? 
                        "emulator-select-selected" : "emulator-select-hover")}
                        onClick={() => setSelectedEmulator('Rom Folder')}>
                            <EmulatorNameAndIcon
                                emulatorName={'Rom Folder'}
                            />
                        </div>
                </div>
            </div>
    )
}

export default SettingsSidebar