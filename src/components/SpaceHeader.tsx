
import './SpaceHeader.scss';
import {ReactComponent as Chevron} from '../down-chevron.svg';

export default function SpaceHeader() {
  return (
    <header className="header-container">
      <div className='header-title1'>
        <h3>SPACE SAVVY</h3>
      </div>
      <div className='header-title2'>
        <h1>Discover Space Missions</h1>
      </div>
      <div className='header-footer'>
        <a href='#mission-container'><Chevron className='chevron'/></a>
      </div>
    </header>
  )
}