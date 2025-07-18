import {Link, Outlet} from 'react-router-dom'
import settingsIcon from '../public/static/icons/settings-cogwheel-button.svg'
import '../styles/Navbar.css'

const Layout = () => {
    return (
        <>
            <header>
                <nav class="navbar">
                    <Link to="/">
                        <i className="bi bi-house-fill nav-link" />
                    </Link>
                    <Link to="/settings">
                        <i class='bi bi-gear-fill nav-link' /> 
                    </Link>
                </nav>
            </header>
            <div id="root">
                <Outlet />
            </div>
        </>
    )
  
    
}

export default Layout