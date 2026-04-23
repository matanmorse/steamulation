import { createContext } from 'react';
import '../styles/Modal.css'
import { useContext } from 'react';
import { useState } from 'react';
const ModalContext = createContext(null);

export function ModalProvider({ children }) {
    const [modal, setModal] = useState(null);

    const showModal = (component) => setModal(component);
    const hideModal = () => setModal(null);

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}
            {modal && (
                <div className="modal-overlay" onClick={hideModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        {modal}
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
}

export const useModal = () => useContext(ModalContext);