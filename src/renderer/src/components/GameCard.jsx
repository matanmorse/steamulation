import { useState } from 'react'
import '../styles/GameCard.css'
import {MoonLoader} from 'react-spinners'

const GameCard = ({title, romPath}) => {
    const [isLoading, setIsLoading] = useState(false)

    const launchGame = async () => {
        setIsLoading(true)
        console.log(romPath);
        const res = await window.launchGameService.launchGame('MelonDS', romPath)
        setIsLoading(false)
    }

    return (
    <>
        <div className="game-card-wrapper" onClick={launchGame}>
            <div className="game-card-image">
                {isLoading && <MoonLoader class="game-card-loader" size={60} color='blue'/>}
                <h6 className="game-card-title">
                    {title}
                </h6>
            </div>
        </div>
    </>
    )
}

export default GameCard;