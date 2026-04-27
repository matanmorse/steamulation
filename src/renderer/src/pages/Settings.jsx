import { useRef } from 'react'
import '../styles/Settings.css'
import { useState } from 'react'
import { useEffect } from 'react'
import EmulatorNameAndIcon from '../components/EmulatorNameAndIcon'
import SettingsSidebar from '../components/settings/SettingsSidebar'
import SettingsWindow from '../components/settings/SettingsWindow'
import { useEmulator } from '../contexts/SharedContext'
import { useModal } from '../contexts/ModalContext'

const Settings = () => {
    const [submenu, setSubMenu] = useState('emulators')
    const {emulators, refetchEmulators} = useEmulator();
    const {hideModal} = useModal();

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


    return (
        <div className="settings-modal">
            <SettingsSidebar
                emulators={emulators}
                submenu={submenu}
                setSubmenu={setSubMenu} 
            />
            <SettingsWindow
                SetEmulator={SetEmulator}
                ResetEmulator={ResetEmulator}
                submenu={submenu}
                SetRomFolder={SetRomFolder}
                />
            <i className="close-modal bi bi-x" onClick={() => hideModal()}></i>
        </div>
       
    )
}

export default Settings;
