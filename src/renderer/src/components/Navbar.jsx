import { Link, useLocation } from 'react-router-dom';

import '../styles/Navbar.css'
const Navbar = () => {
    const location = useLocation();
    return (
    <header>
                <nav class="navbar">
                    <div>
                        <h3 class="nav-title">Steamulator</h3>
                    </div>
                    <div className="nav-links">
                        <Link
                        className={"nav-link " + (location.pathname === '/' && 'nav-link-selected')}
                        id="Library" to="/">
                            <i className="bi bi-collection nav-link-icon" />
                            <h2>Library</h2>
                        </Link>
                        <Link 
                        className={"nav-link " + (location.pathname === '/settings' && 'nav-link-selected')}
                        id="Settings" to="/settings">
                            <i class='bi bi-gear-fill nav-link-icon' />
                            <h2>Settings</h2>
                        </Link>
                    </div>
                </nav>
            </header>
    )
}

export default Navbar;