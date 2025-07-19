
const EmulatorNameAndIcon = ({emulatorName, size=3, bold=false, otherText} ) => {
    const logos = import.meta.glob('/src/public/static/icons/*.svg', { eager: true });
    const path = `/src/public/static/icons/${emulatorName}-icon.svg`;
    const logo = logos[path]?.default || null;

    return (
        <>
            <div class="label-wrapper">
                <img class='citra-logo' src={logo} style={{height: size * 7.5 + 'px'}} /> 
                <p style={{fontSize: size * 5 + 'pt', fontWeight: bold && '500', margin:'0rem'}}>{emulatorName} {otherText}</p>
            </div>
{/*             
            <button onClick={(e) => { SetEmulator(e, emulatorName)}} disabled={hasSettings[emulatorName.toLowerCase()]}> Select your emulator </button> 
            <button onClick={SetRomFolder} disabled={hasSettings.romFolder}>Select ROMs</button>
            <div>
                 {hasSettings[emulatorName.toLowerCase()]  && <button className='reset-button' onClick={(e) => ResetEmulator(e, emulatorName)}>Reset</button>}
            </div> */}
        </>
    )
}

export default EmulatorNameAndIcon;