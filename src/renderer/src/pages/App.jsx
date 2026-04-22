import { useState, useEffect, use } from 'react'
import {Link} from 'react-router-dom'
import {Library, Clock, Star, Gamepad2} from 'lucide-react'
import '../styles/App.css'
import GameCard from '../components/GameCard'

function App() {
  const [games, setGames] = useState([])
  const [selectedTab, setSelectedTab] = useState('All Games')
  useEffect(() => {
      fetchGames();  
    }, []
  )

  const fetchGames = async () => {
    const res = await window.fileService.getRomsFromFolder();
    setGames(res)
  }

  return (
    <div class="library-wrapper">
      <div className="sidebar">
        <div className="title-wrapper">
          <Gamepad2 color='var(--clr-primary-a20)'/>
          <h3 className="sidebar-title">Library</h3>
        </div>
        <div className="library-select-list">

          <div className={"select-title-wrapper " + (selectedTab === 'All Games' && 'library-select-title-selected')}
          onClick={() => setSelectedTab('All Games')}>
            <Library/>
            <h4 className="library-select-title">
              All Games</h4>
          </div>
          
          <div className={"select-title-wrapper " + (selectedTab === 'Recently Played' && 'library-select-title-selected')}
          onClick={() => setSelectedTab('Recently Played')}>
            <Clock/>
            <h4 className="library-select-title">
              Recently Played</h4>
          </div>

          <div className={"select-title-wrapper " + (selectedTab === 'Favorites' && 'library-select-title-selected')}
          onClick={() => setSelectedTab('Favorites')}>
            <Star/>
            <h4 className="library-select-title">
              Favorites</h4>
          </div>
        </div>
      </div>
      <div className="library">
        <div className="library-title-wrapper">
          <Library size={35}/>
          <h2 className='library-title'> Your Game Library </h2>
        </div>
        <div className="game-card-grid">
          {games.map((game, index) => (
            <GameCard key={index} title={game} romPath={game}/>
          ))}
        </div>
      </div>
      
     {/* <h1>Library</h1>
     <div className="game-card-grid">
      {games.map((game, index) => (
        <GameCard key={index} title={game} romPath={game}/>
      ))}
     </div>

     {games.length == 0 && 
        <h4>Add an <Link to="/settings">emulator configuration</Link> to get started</h4>
     } */}
     
    </div>
  )
}

export default App
