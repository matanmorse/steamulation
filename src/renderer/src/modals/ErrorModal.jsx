const ErrorModal = ({message, hideModal, stack}) => {
    return (
    <div className="error-modal">
        <h2>Error from Electron</h2>
        <p>{message}</p>
        {stack && <pre>{stack}</pre>}
        <div className="modal-buttons">
            <button className="btn-primary" onClick={hideModal}>Close</button>
        </div>
    </div>
    )
}

export default ErrorModal;