import {Outlet} from 'react-router-dom'
import settingsIcon from '../../static/icons/settings-cogwheel-button.svg'
import TitleBar from '../components/TitleBar'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useModal } from '../contexts/ModalContext'
import ErrorModal from '../modals/ErrorModal'

const Layout = () => {
    const { showModal, hideModal } = useModal();

    window.addEventListener('unhandledrejection', (event) => {
        showModal(<ErrorModal message={event.reason.message} hideModal={hideModal} stack={event.reason.stack} />);
    });

    return (
        <>
            <TitleBar />
            <Navbar />
            <div id="root">
                <Outlet />
            </div>
        </>
    )
  
    
}

export default Layout