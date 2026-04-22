import { createContext, useContext } from 'react';

const EmulatorContext = createContext(null);

export function EmulatorProvider({ children }) {
    return (
        <EmulatorContext.Provider>
            {children}
        </EmulatorContext.Provider>
    );
}

export const useEmulator = () => useContext(EmulatorContext);
