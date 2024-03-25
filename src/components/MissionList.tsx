import MissionItem from './MissionItem';
import './Mission.scss';
import type {Launch, LaunchPad} from './types';

type MissionListProps = {
  launchs: Array<Launch>;
  launchPads: Array<LaunchPad>;
}

export default function MissionList({launchs, launchPads}: MissionListProps) {
  const missionCount = launchs.length;

  //console.log(launchs);
  const displayMissionItems = launchs.map((launch, index)=>{
    let comp;
    if (index < missionCount - 1){
      comp = (<>
        <MissionItem 
          key={launch.flight_number} 
          mission={launch} 
          launchPads={launchPads}
        />
        <div className='mi-spacer'/>
      </>)
    }else{
      comp = (<>
        <MissionItem 
          key={launch.flight_number} 
          mission={launch}
          launchPads={launchPads}
        />
      </>)
    }
    return comp;
  })
  
  return(
    <div className="missionlist-container" id='missionlist-container'>
      <div className='mi-count'>Showing {missionCount} Missions</div>
      {displayMissionItems}
    </div>
  )
}