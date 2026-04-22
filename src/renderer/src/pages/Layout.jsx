import {Link, Outlet} from 'react-router-dom'
import settingsIcon from '../../static/icons/settings-cogwheel-button.svg'
import '../styles/Navbar.css'
import TitleBar from '../components/TitleBar'
import { useState } from 'react'

const Layout = () => {
    const [selectedPage, setSelectedPage] = useState('Library')
    return (
        <>
            <TitleBar />
            <header>
                <nav class="navbar">
                    <div>
                        <h3 class="nav-title">Steamulator</h3>
                    </div>
                    <div className="nav-links">
                        <Link onClick={()=>setSelectedPage('Library')}
                        className={"nav-link " + (selectedPage === 'Library' && 'nav-link-selected')}
                        id="Library" to="/">
                            <i className="bi bi-collection nav-link-icon" />
                            <h2>Library</h2>
                        </Link>
                        <Link onClick={()=>setSelectedPage('Settings')}
                        className={"nav-link " + (selectedPage === 'Settings' && 'nav-link-selected')}
                        id="Settings" to="/settings">
                            <i class='bi bi-gear-fill nav-link-icon' />
                            <h2>Settings</h2>
                        </Link>
                    </div>
                </nav>
            </header>
            <div id="root">
                <Outlet />
            </div>
        </>
    )
  
    
}

export default Layout