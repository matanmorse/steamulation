import { useState, useEffect, use } from 'react'
import {Link} from 'react-router-dom'
import {Clock, Star, Gamepad2} from 'lucide-react'
import {Library as LibraryIcon} from 'lucide-react'
import '../styles/App.css'
import GameCard from '../components/GameCard'

function App() {
  const [games, setGames] = useState([])
  const [selectedTab, setSelectedTab] = useState('All Games')

  useEffect(() => {
      fetchGames();
    }, []
  );

  const fetchGames = async () => {
    const res = await window.fileService.getGames();
    console.log(res);
    setGames(res)
  }

  return (
    <>
      <div className="library">
        <div className="library-title-wrapper">
          <LibraryIcon size={35}/>
          <h2 className='library-title'> Your Game Library </h2>
        </div>
        <div className="game-card-grid">
          {games.map((game, index) => (
            <GameCard key={index} game={game}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
