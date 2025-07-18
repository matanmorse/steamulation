import {spawn} from 'child_process'
import config, {getEmulatorPath, getRomFolderPath} from './configService.js'
// const romPath = "C:\\Users\\Matan\\Downloads\\roms_Nintendo 3DS_North America_Legend Of Zelda, The - Ocarina Of Time 3D (U)\\Legend Of Zelda, The - Ocarina Of Time 3D (U).3ds"
// const citraPath = "C:\\Users\\Matan\\AppData\\Local\\Citra\\nightly-mingw\\citra-qt.exe"


const launchGame = async (emulatorName, romPath) => {
    return new Promise(resolve => {
        const fullPath = getRomFolderPath() + '\\' + romPath;

        const fileType = romPath.split('.')[1]
        const emulator = getEmulatorFromExtension(fileType)
        console.log(emulator)

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