import { useState } from 'react'
import '../styles/GameCard.css'
import {BeatLoader, ClipLoader, MoonLoader} from 'react-spinners'
import { Loader, PlayCircleIcon } from 'lucide-react'
import { useEffect } from 'react'
import EmulatorIconList from './library/EmulatorIconList'
import { useModal } from '../contexts/ModalContext'
import NoEmulatorModal from '../modals/NoEmulatorModal'

const GameCard = ({game}) => {
    const [isLoading, setIsLoading] = useState(false)
    const fileExtension = game.path.split('.').at(-1);
    const [supportedEmulators, setSupportedEmulators] = useState([]);
    const [hasConfiguredEmulator, setHasConfiguredEmulator] = useState(true); /* has an exe been properly configured for an emulator that supports this? */
    const { showModal, hideModal } = useModal();

    const launchGame = async () => {
        if (!hasConfiguredEmulator) {    
            showModal(
            <NoEmulatorModal 
                fileExtension={fileExtension}
                hideModal={hideModal}
            />); 
            return;
        }
        setIsLoading(true);    
        await window.launchGameService.launchGame(game.path)
        setIsLoading(false);
    }

    /* Get supported emulators based on file extension from configService */
    useEffect(() => {
        window.configService.getSupportedEmulators(fileExtension).then((emulators) => {
            setSupportedEmulators(emulators);
        });
    }, [fileExtension]);

    useEffect(() => {
        if (supportedEmulators.length === 0) return;

        /* Check if any of the supported emulators are properly configured */
        window.configService.getEmulatorsConfig().then((emulatorsConfig) => {
            const supportedEmulatorsConfig = emulatorsConfig.filter(emulator => supportedEmulators.includes(emulator.name));
            const hasConfigured = supportedEmulatorsConfig.some(emulator => emulator.exePath);
            setHasConfiguredEmulator(hasConfigured);
        });
    }, [supportedEmulators])
    
    if (!game) return; // don't render until game has finished fetching
    else return (
    <>
        <div className="game-card-wrapper">
            <EmulatorIconList emulatorNameList={supportedEmulators}/>
            <div className="game-card-image-wrapper" style={{backgroundImage: `url(${game.coverArt})`}}>
                {isLoading && <ClipLoader class="game-card-loader" size={60} color='blue'/>}
                <div className="game-info"> 
                    <button className="btn btn-primary btn-icon" onClick={launchGame}>
                        <PlayCircleIcon/>
                    </button>
                </div>
            {!game.name && <p style={{textWrap:'wrap', wordBreak: 'break-word'}}>{game.path}</p>}
            </div>
        </div>
    </>
    )
}

export default GameCard;