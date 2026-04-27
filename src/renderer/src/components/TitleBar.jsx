import '../styles/TitleBar.css'
import appIcon from '../../static/images/app-icon.png'
import PrismIcon from './PrismIcon';
const TitleBar = () => {
    return (
    <div className="title-bar">
        <div className="title-box">
            <PrismIcon size={1.25} />
            <div className="title">Prism v1.0</div>
        </div>
      <div className="window-controls">
        <button className="btn" onClick={() => window.windowService.minimize()}>–</button>
        <button className="btn" onClick={() => window.windowService.maximize()}>□</button>
        <button className="btn" onClick={() => window.windowService.close()}>×</button>
      </div>
    </div>
  );
}

export default TitleBar