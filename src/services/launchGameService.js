import {spawn} from 'child_process'
import config, {getEmulatorPath, getRomFolderPath} from './configService.js'

/* Launches a game given ROM path (emulator is inferred from supported file types in the emulators config */
const launchGame = async (emulatorName, romPath) => {
    return new Promise(resolve => {
        const fullPath = getRomFolderPath() + '\\' + romPath;

        const fileType = romPath.split('.')[1]
        const emulator = getEmulatorFromExtension(fileType)

        const game = spawn(getEmulatorPath(emulator), [fullPath, '--fullscreen'])
            
        game.stdout.setEncoding('utf8')

        game.addListener('close', () => {
            console.log('game closed')
        })

        game.on('spawn', () => {
            console.log('Game spawned');
            resolve()
        });

        game.unref();
    })
}

/* Returns the first configured emulator that can run this extension*/
const getEmulatorFromExtension = (extension) => {
     for (const element of config.emulators) {
        for (const format of element.fileFormats) {
            if (format === extension) {
                return element.name;
            }
        }
    }
}


export {launchGame}