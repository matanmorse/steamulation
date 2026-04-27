import { useState, useEffect, use } from 'react'
import {Link} from 'react-router-dom'
import {Clock, Star, Gamepad2} from 'lucide-react'
import {Library as LibraryIcon} from 'lucide-react'
import '../styles/Library.css'
import GameCard from '../components/GameCard'
import LibraryTopbar from '../components/library/LibraryTopbar'

function App() {
  const [games, setGames] = useState([])
  const [libraryFilter, setLibraryFilter] = useState('all')

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
        <LibraryTopbar 
          setLibraryFilter={setLibraryFilter}
          libraryFilter={libraryFilter}
        />
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
