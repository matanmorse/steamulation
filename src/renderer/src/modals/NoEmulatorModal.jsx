import { useNavigate } from "react-router-dom";

const NoEmulatorModal = ({fileExtension, hideModal}) => {
    const navigate= useNavigate();
    return (
    <div className="no-emulator-modal">
        <h2>No emulator configured</h2>
        <p>No configured emulator was found for <strong>.{fileExtension}</strong> files. Set one up to launch this game.</p>
        <div className="modal-buttons">
            <button className="btn-secondary" onClick={hideModal}>Cancel</button>
            <button className="btn-primary" onClick={() => {hideModal(); navigate('/settings');  }}>
                Go to Settings
            </button>
        </div>
    </div>
    )
}

export default NoEmulatorModal;