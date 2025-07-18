import { useRef } from 'react'
import '../styles/Settings.css'
import { useState } from 'react'
import { useEffect } from 'react'
import EmulatorSettings from './EmulatorSettings'

const Settings = () => {
    const [hasSettings, setHasSettings] = useState({})
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        fetchSettings();
    }, [])

    const fetchSettings = async () => {
        const res = await window.configService.hasSettings() 
        setHasSettings(res)
        setisLoading(false)
    }

    const ResetEmulator = async(e, emulatorName) => {
        e.preventDefault();
        await window.configService.resetSettings(emulatorName)
        fetchSettings()
    }

    const SetEmulator = async (e, emulatorName) => {
        e.preventDefault();
        console.log('setting emulator for ' + emulatorName)
        const res = await window.fileService.selectExe(emulatorName)    
        fetchSettings()
    }

    const SetRomFolder = async(e) => {
        e.preventDefault()
        const res = await window.fileService.selectRomFolder()
        fetchSettings()
    }

    return (
        <>
            <h1>Settings</h1>
            <form className="settings-form">
                <strong>Emulator</strong>
                <strong>Exe Path</strong>
                <strong>ROM Folder</strong>
                <strong></strong>

                 {!isLoading && 
                <>
                    <EmulatorSettings 
                    hasSettings={hasSettings}
                    emulatorName={"Citra"}
                    SetRomFolder={SetRomFolder}
                    SetEmulator={SetEmulator}
                    ResetEmulator={ResetEmulator}
                    logoPath={"https://upload.wikimedia.org/wikipedia/commons/d/d4/Citra_Logo.svg"}
                    />
                    <EmulatorSettings
                    hasSettings={hasSettings}
                    emulatorName={"MelonDS"}
                    SetRomFolder={SetRomFolder}
                    SetEmulator={SetEmulator}
                    ResetEmulator={ResetEmulator} 
                    logoPath={"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/MelonDS_Logo.svg/1200px-MelonDS_Logo.svg.png?20231023190404"}
                    />
                </>
             
                }
            </form>
        </>
       
    )
}

export default Settings;
