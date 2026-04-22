import { useRef } from 'react'
import '../styles/Settings.css'
import { useState } from 'react'
import { useEffect } from 'react'
import EmulatorNameAndIcon from '../components/EmulatorNameAndIcon'
import SettingsSidebar from '../components/settings/SettingsSidebar'
import SettingsWindow from '../components/settings/SettingsWindow'

const Settings = () => {
    const [selectedEmulator, setSelectedEmulator] = useState('Citra')
    const [isLoading, setisLoading] = useState(true)
    const [emulators, setEmulators] = useState(['abc'])

    useEffect(() => {
        fetchAll()
    }, [])

    const fetchEmulatorConfigs = async () => {
        const res = await window.configService.getEmulatorsConfig()
        console.log(res)
        setEmulators(res)
        setisLoading(false)
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
        fetchEmulatorConfigs()
    }

    const SetRomFolder = async (e) => {
        e.preventDefault()
        const res = await window.fileService.selectRomFolder()
        fetchAll()
    }

    const ResetRomFolder = async (e) => {
        e.preventDefault;
        await window.configService.resetRomFolder()
        fetchAll()
    }


    return (
        <>
            <SettingsSidebar
                emulators={emulators}
                isLoading={isLoading}
                selectedEmulator={selectedEmulator}
                setSelectedEmulator={setSelectedEmulator} 
            />
            <SettingsWindow
                emulators={emulators}
                isLoading={isLoading}
                SetEmulator={SetEmulator}
                ResetEmulator={ResetEmulator}
                selectedEmulator={selectedEmulator}
                SetRomFolder={SetRomFolder}
                ResetRomFolder={ResetRomFolder}
                fetchEmulatorConfigs={fetchEmulatorConfigs}
                />
        </>
       
    )
}

export default Settings;
