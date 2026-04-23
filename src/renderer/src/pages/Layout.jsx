import {Outlet} from 'react-router-dom'
import settingsIcon from '../../static/icons/settings-cogwheel-button.svg'
import TitleBar from '../components/TitleBar'
import { useState } from 'react'
import Navbar from '../components/Navbar'

const Layout = () => {
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