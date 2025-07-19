import {Link, Outlet} from 'react-router-dom'
import settingsIcon from '../public/static/icons/settings-cogwheel-button.svg'
import '../styles/Navbar.css'
import TitleBar from '../components/TitleBar'

const Layout = () => {
    return (
        <>
            <TitleBar />
            <div className="main-wrapper">
                <header>
                    <nav class="navbar">
                        <div>
                            <h3 class="nav-title">Steamulator</h3>
                        </div>
                        <div className="nav-links">
                            <Link to="/">
                                <i className="bi bi-house-fill nav-link" />
                            </Link>
                            <Link to="/settings">
                                <i class='bi bi-gear-fill nav-link' />
                            </Link>
                        </div>
                    </nav>
                </header>
                <div id="root">
                    <Outlet />
                </div>
            </div>
        </>
    )
  
    
}

export default Layout