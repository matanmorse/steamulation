const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const pingpong = document.getElementById('pingpong')
const func = async () => {
    pingpong.innerText = await versions.ping();
}

const files = document.getElementById('files-list')
const populateFilesList = async () => {
    console.log(await fileService.readFiles())
    files.innerText = await fileService.readFiles()
}

populateFilesList();
func();

