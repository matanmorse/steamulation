import { useState } from 'react'
import '../styles/GameCard.css'
import {BeatLoader, ClipLoader, MoonLoader} from 'react-spinners'
import { Loader, PlayCircleIcon } from 'lucide-react'
import { useEffect } from 'react'
import EmulatorIconList from './library/EmulatorIconList'
import { useModal } from '../contexts/ModalContext'
import NoEmulatorModal from '../modals/NoEmulatorModal'

const GameCard = ({title, romPath}) => {
    const [isLoading, setIsLoading] = useState(false)
    const fileExtension = title.split('.').slice(-1)[0]
    const [supportedEmulators, setSupportedEmulators] = useState([]);
    const [hasConfiguredEmulator, setHasConfiguredEmulator] = useState(true); /* has an exe been properly configured for an emulator that supports this? */
    const { showModal, hideModal } = useModal();

    const launchGame = async () => {
        console.log(hasConfiguredEmulator);
        if (!hasConfiguredEmulator) {openNoEmulatorModal(); return;}
        setIsLoading(true)
        console.log(romPath);
        const res = await window.launchGameService.launchGame(romPath)
        setIsLoading(false)
    }

    const openNoEmulatorModal = () => {
        showModal(
            <NoEmulatorModal 
                fileExtension={fileExtension}
                hideModal={hideModal}
            />
        )
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
            console.log(`has configured for ${title}: ${hasConfigured}`);
        });
    }, [supportedEmulators])
    return (
    <>
        <div className="game-card-wrapper" >
            <EmulatorIconList emulatorNameList={supportedEmulators}/>
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