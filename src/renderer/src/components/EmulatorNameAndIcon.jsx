
const EmulatorNameAndIcon = ({emulatorName, size=3, bold=false, otherText} ) => {
    const logos = import.meta.glob('../../static/icons/*.svg', { eager: true });
    const path = `../../static/icons/${emulatorName}-icon.svg`;
    const logo = logos[path]?.default || null;

    return (
        <>
            <div className="label-wrapper">
                <img className='citra-logo' src={logo} style={{height: size * 7.5 + 'px', }} /> 
                <p className="emulator-title" style={{fontSize: size * 5 + 'px', margin:'0rem'}}>{emulatorName} {otherText}</p>
            </div>
        </>
    )
}

export default EmulatorNameAndIcon;