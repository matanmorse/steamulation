import '../styles/TitleBar.css'
import appIcon from '../public/static/images/app-icon.png'
const TitleBar = () => {
    return (
    <div className="title-bar">
        <div className="title-box">
            <img src={appIcon} className='app-icon'/>
            <div className="title">Steamulator v1.0</div>
        </div>
      <div className="window-controls">
        <button onClick={() => window.windowService.minimize()}>–</button>
        <button onClick={() => window.windowService.maximize()}>□</button>
        <button onClick={() => window.windowService.close()}>×</button>
      </div>
    </div>
  );
}

export default TitleBar