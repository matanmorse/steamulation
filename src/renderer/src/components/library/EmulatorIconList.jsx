import '../../styles/EmulatorIconList.css';
const EmulatorIconList = ({emulatorNameList}) => {
    return (
        <div className="emulator-icon-list">
            {emulatorNameList.map((emulatorName) => (
                    <img key={emulatorName} src={`../../../static/icons/${emulatorName}-icon.svg`} alt={`${emulatorName} icon`} className="emulator-icon" />
            ))}
        </div>
    );
}

export default EmulatorIconList;