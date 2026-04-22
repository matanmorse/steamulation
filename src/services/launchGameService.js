import {spawn} from 'child_process'
import config, {getEmulatorPath, getRomFolderPath, hasEmulator} from './configService.js'

/* Launches a game given ROM path (emulator is inferred from supported file types in the emulators config */
const launchGame = async (romPath) => {
    return new Promise(resolve => {
        const fullPath = getRomFolderPath() + '\\' + romPath;

        const fileType = romPath.split('.')[1]
        const emulators = getEmulatorsFromExtension(fileType)
        console.log(`Launching game with rom path ${romPath} emulator path ${getEmulatorPath(emulators[0])}`)

        const game = spawn(getEmulatorPath(emulators[0]), [fullPath])
            
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

/* Returns all configured emulators that can run this extension*/
const getEmulatorsFromExtension = (extension) => {
    const emulators = [];
    for (const element of config.emulators) {
        if (!element.fileFormats) continue;
        for (const format of element.fileFormats) {
            if (format === extension) {
                emulators.push(element.name);
            }
        }
    }
    return emulators;
}


export {launchGame}