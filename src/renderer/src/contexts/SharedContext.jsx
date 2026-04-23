import { createContext, useContext, useEffect, useState } from 'react';

const EmulatorContext = createContext(null);

export function EmulatorProvider({ children }) {
    const [emulators, setEmulators] = useState([]);

    const refetchEmulators = async () => {
        const emulatorsData = await window.configService.getEmulatorsConfig();
        setEmulators(emulatorsData);
    }

    // fetch on mount
    useEffect(() => {
        window.configService.getEmulatorsConfig().then(setEmulators);
    }, [])

    return (
        <EmulatorContext.Provider value={{ emulators, refetchEmulators }}>
            {children}
        </EmulatorContext.Provider>
    );
}

export const useEmulator = () => useContext(EmulatorContext);
