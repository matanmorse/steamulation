import { useRef } from 'react'
import '../styles/Settings.css'
import { useState } from 'react'
import { useEffect } from 'react'
import EmulatorNameAndIcon from '../components/EmulatorNameAndIcon'
import SettingsSidebar from '../components/settings/SettingsSidebar'
import SettingsWindow from '../components/settings/SettingsWindow'
import { useEmulator } from '../contexts/SharedContext'

const Settings = () => {
    const [selectedEmulator, setSelectedEmulator] = useState('Citra')
    const {emulators, refetchEmulators} = useEmulator();
    useEffect(() => {
        console.log('fetching configs')
        refetchEmulators()
    }, [])

    const ResetEmulator = async(e, emulatorName) => {
        e.preventDefault()
        await window.configService.resetSettings(emulatorName)
        refetchEmulators()
    }

    const SetEmulator = async (e, emulatorName) => {
        e.preventDefault();
        const res = await window.fileService.selectExe(emulatorName)    
        refetchEmulators()
    }

    const SetRomFolder = async (e) => {
        e.preventDefault()
        const res = await window.fileService.selectRomFolder()
        refetchEmulators()
    }

    const ResetRomFolder = async (e) => {
        e.preventDefault;
        await window.configService.resetRomFolder()
        refetchEmulators()
    }

    return (
        <>
            <SettingsSidebar
                emulators={emulators}
                selectedEmulator={selectedEmulator}
                setSelectedEmulator={setSelectedEmulator} 
            />
            <SettingsWindow
                SetEmulator={SetEmulator}
                ResetEmulator={ResetEmulator}
                selectedEmulator={selectedEmulator}
                SetRomFolder={SetRomFolder}
                ResetRomFolder={ResetRomFolder}
                />
        </>
       
    )
}

export default Settings;
