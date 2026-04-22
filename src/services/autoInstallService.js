import config, { getEmulatorPath } from "../services/configService.js";
import { setEmulatorPath } from "../services/configService.js";
import path from 'path'
import {app} from 'electron'
import fs from 'fs/promises'
import { createWriteStream } from "fs";
import AdmZip from 'adm-zip'
import https from 'https'
import { pipeline } from 'stream/promises';
import Seven from 'node-7z';
import sevenBin from '7zip-bin';
import { glob } from "glob";

const EMULATORS_DIR = path.join(app.getPath('userData'), 'emulators');

const AutoInstallAndConfigure = (async (emulatorName) => {

    // Get the emulator's download link from the config file
    const emulator = config.emulators.find(x => x.name === emulatorName)

    // check if emulator has install link
    if (!emulator || !emulator.installLinks || !emulator.installLinks.windows) {
        throw new Error(`No install link found for emulator ${emulatorName}`)
    }
    const downloadPath = emulator.installLinks.windows

    // Download
    const installDir = path.join(EMULATORS_DIR, emulatorName);
    await fs.mkdir(installDir, {recursive: true });
    const zipPath = path.join(installDir, `${emulatorName}.zip`);
    await downloadFile(downloadPath, zipPath);

    console.log((await fs.stat(zipPath)).size)
    // Extract
    // Special case for 7z files since adm-zip doesn't support them
    // For some reason dolphin source is labeled as zip but is actually a 7z file, so we also check the emulator name too
    if (zipPath.endsWith('.7z') || emulatorName === 'Dolphin' || emulatorName === 'RPCS3' || emulatorName === 'PCSX2') {
        await new Promise((resolve, reject) => {
            const stream = Seven.extractFull(zipPath, installDir, {
                $bin: sevenBin.path7za,
            });
            stream.on('end', resolve);
            stream.on('error', reject);
        });
    }
    else {
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(installDir, true);
    }
    await fs.unlink(zipPath);

    // Check final exe path is configured
    if (!emulator.finalExeName) {
        throw new Error(`No finalExeName specified for emulator ${emulatorName} in config file`)
    }

    console.log(`Looking for executable with name ${emulator.finalExeName} in folder ${installDir}`)
    // Save EXE Path to config
    const matches = await glob(path.join(installDir, '**/', emulator.finalExeName).replace(/\\/g, '/')); // **/ means find exe in all subfolders
    console.log(matches[0])
    setEmulatorPath(emulatorName, matches[0])
    console.log(`Emulator ${emulatorName} installed and configured at path: ${matches[0]}`)
    return matches[0];
})

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const follow = (u) => {
      https.get(u, { headers: { 'User-Agent': 'steamulator' } }, (res) => {
        if (res.statusCode === 302 || res.statusCode === 301) {
          return follow(res.headers.location);
        }
        const file = createWriteStream(dest);
        pipeline(res, file).then(resolve).catch(reject);
      }).on('error', reject);
    };
    follow(url);
  });
}

export { AutoInstallAndConfigure }