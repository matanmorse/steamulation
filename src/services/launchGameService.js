import {spawn} from 'child_process'
import config, {getEmulatorPath, getRomFolderPath, hasEmulator} from './configService.js'

/* Launches a game given ROM path (emulator is inferred from supported file types in the emulators config */
const launchGame = async (romPath) => {
    return new Promise(resolve => {
        // TODO: add more advanced emulator picking logic in case multiple emulators support the same file type (ex: .bin supported by melonDS and Citra)
        const fileType = romPath.split('.')[1]
        const emulators = getEmulatorsFromExtension(fileType)
        const emulator = emulators.find(e => hasEmulator(e)); // pick first configured emulator

        const perEmulatorCLIArgs = config.emulators.find(x => x.name === emulator).cliArgs || []

        console.log(`Launching game with rom path ${romPath} command ${getEmulatorPath(emulator).split('\\').slice(-1)[0]} ${perEmulatorCLIArgs.join(' ')} ${romPath}`)
        const game = spawn(getEmulatorPath(emulator), [...perEmulatorCLIArgs, romPath])
            
        game.stdout.setEncoding('utf8')

        game.addListener('close', () => {
            console.log(`[From ${emulator}] Game closed`)
        })

        game.on('spawn', () => {
            console.log(`[From ${emulator}] Game opened`)
            resolve()
        });

        game.stdout.on('data', (data) => console.log(`[From ${emulator}] ${data}`));
        game.stderr.on('data', (data) => console.error(`[From ${emulator}] ${data}`));


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