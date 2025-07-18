import { useState, useEffect, use } from 'react'
import {Link} from 'react-router-dom'
import '../styles/App.css'
import GameCard from '../components/GameCard'

function App() {

  const [games, setGames] = useState([])

  useEffect(() => {
      fetchGames();  
    }, []
  )

  const fetchGames = async () => {
    const res = await window.fileService.getRomsFromFolder();
    setGames(res)
  }

  return (
    <>
     <h1>Library</h1>
     <div className="game-card-grid">
      {games.map((game, index) => (
        <GameCard key={index} title={game} romPath={game}/>
      ))}
     </div>

     {games.length == 0 && 
        <h4>Add an <Link to="/settings">emulator configuration</Link> to get started</h4>
     }
     
    </>
  )
}

export default App
