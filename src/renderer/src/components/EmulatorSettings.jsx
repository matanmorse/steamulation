const EmulatorSettings = ({hasSettings, emulatorName, SetEmulator, SetRomFolder, ResetEmulator, logoPath}) => {
    console.log(hasSettings)
    console.log(hasSettings[emulatorName.toLowerCase()])
    return (
        <>
            <div class="label-wrapper">
                <img class='citra-logo' src={logoPath} /> 
                <label htmlFor="EmulatorPathUpload">{emulatorName}</label>
            </div>
            
            <button onClick={(e) => { SetEmulator(e, emulatorName)}} disabled={hasSettings[emulatorName.toLowerCase()]}> Select your emulator </button> 
            <button onClick={SetRomFolder} disabled={hasSettings.romFolder}>Select ROMs</button>
            <div>
                 {hasSettings[emulatorName.toLowerCase()]  && <button className='reset-button' onClick={(e) => ResetEmulator(e, emulatorName)}>Reset</button>}
            </div>
           
            
        </>
    )
}

export default EmulatorSettings;