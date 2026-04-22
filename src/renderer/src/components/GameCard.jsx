import { useState } from 'react'
import '../styles/GameCard.css'
import {BeatLoader, ClipLoader, MoonLoader} from 'react-spinners'
import { Loader, PlayCircleIcon } from 'lucide-react'
const GameCard = ({title, romPath}) => {
    const [isLoading, setIsLoading] = useState(false)

    const launchGame = async () => {
        setIsLoading(true)
        console.log(romPath);
        const res = await window.launchGameService.launchGame(romPath)
        setIsLoading(false)
    }

    return (
    <>
        <div className="game-card-wrapper" >
            <div className="game-card-image-wrapper">
                <img className="game-card-image" src={`https://placehold.co/25x25/3c1a2b/ffffff?text=${title}`}>
                </img>
                {isLoading && <ClipLoader class="game-card-loader" size={60} color='blue'/>}
            </div>
            <div className="game-info">
                <h6 className="game-card-title">
                        {title}
                </h6>
                <button className="game-card-launch-button" onClick={launchGame}>
                    <PlayCircleIcon/>
                    Launch
                </button>
            </div>
        </div>
    </>
    )
}

export default GameCard;