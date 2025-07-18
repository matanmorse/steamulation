import { useRef } from 'react'
import '../styles/Settings.css'
import { useState } from 'react'
import { useEffect } from 'react'
import EmulatorNameAndIcon from '../components/EmulatorSettings'

const Settings = () => {
    const [hasSettings, setHasSettings] = useState({})
    const [isLoadingSettings, setisLoadingSettings] = useState(true)
    const [selectedEmulator, setSelectedEmulator] = useState('Citra')

    const [isLoading, setisLoading] = useState(true)
    const [emulators, setEmulators] = useState({})

    const logos = import.meta.glob('/src/public/static/icons/*.svg', { eager: true });

    useEffect(() => {
        fetchAll()
    }, [])

    const fetchEmulatorConfigs = async () => {
        const res = await window.configService.getEmulatorsConfig()
        console.log(res)
        setEmulators(res)
        setisLoading(false)
    }

    const fetchSettings = async () => {
        const res = await window.configService.hasSettings() 
        setHasSettings(res)
        setisLoadingSettings(false)
    }

    const ResetEmulator = async(e, emulatorName) => {
        e.preventDefault()
        await window.configService.resetSettings(emulatorName)
        fetchAll()
    }

    const SetEmulator = async (e, emulatorName) => {
        e.preventDefault();
        const res = await window.fileService.selectExe(emulatorName)    
        fetchAll()
    }

    const fetchAll = async () => {
        fetchSettings()
        fetchEmulatorConfigs()
    }

    const SetRomFolder = async(e) => {
        e.preventDefault()
        const res = await window.fileService.selectRomFolder()
        fetchAll()
    }


    return (
        <div class='settings-main'>
            <div class="sidebar">
                <div className="sidebar-title-wrapper">
                    <i class="bi bi-gear settings-gear"></i>
                    <h1 class="sidebar-title">App Settings</h1>
                </div>
                <div className="emulators-list">
                    {!isLoading && emulators.map((emulator, key) => {return (
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
            <div class="emulator-settings">
                <div className="emulator-settings-wrapper">
                    <div className="settings-title-wrapper">
                        <i className="bi bi-gear-fill settings-gear"></i>
                        <h2>Emulator Configuration</h2>
                    </div>
                    <form className="settings-form">
                        <EmulatorNameAndIcon emulatorName={selectedEmulator} size={4.5} bold={true} otherText={"Emulator Settings"}/>
                        <div className="exe-path-form-wrapper">
                            <label for="exePath">Emulator Executable Path:</label>
                            <div className="exe-input-wrapper">
                                {!isLoading &&
                                    <input type="text" readOnly class="current-exe-path" placeholder={emulators.find(x=>x.name===selectedEmulator).exePath}></input>
                                }
                                <button class="exe-input-button" onClick={(e) => SetEmulator(e, selectedEmulator) }><i class="bi bi-folder" style={{fontSize: '16pt'}}></i> Browse</button>
                            </div>
                            <p class="text-info">Select the main executable file for this emulator.</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
       
    )
}

export default Settings;
