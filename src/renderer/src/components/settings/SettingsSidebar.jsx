import { useState } from 'react';
import { useEmulator } from '../../contexts/SharedContext'
import '../../styles/Settings.css'
import EmulatorNameAndIcon from '../EmulatorNameAndIcon'
const SettingsSidebar = ({isLoading, submenu, setSubmenu}) => {
    const {emulators} = useEmulator();
    
    return (
        <div className="emulator-settings-sidebar">
                <h6 className="sidebar-title">Settings</h6>
                <div className="option-icon-group" onClick={() => setSubmenu('emulators')}>
                    <i className="bi bi-controller"></i>
                    <h3 className="settings-sidebar-option">Emulators</h3>
                </div>
                <div className="option-icon-group" onClick={() => setSubmenu('roms')}>
                    <i className="bi bi-joystick"></i>
                    <h3 className="settings-sidebar-option">Rom Folder</h3>
                </div>
            </div>
    )
}

export default SettingsSidebar