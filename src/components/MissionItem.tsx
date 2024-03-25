import './Mission.scss'
import MatchMediaWrapper from './atom/MatchMediaWrapper';
import type {Launch, LaunchPad} from './types';

const linksLabel = {
  mission_patch: null, // Not displaying
  reddit_campaign: 'Reddit Campaign',
  reddit_launch: 'Reddit Launch',
  reddit_recovery: 'Reddit Recovery',
  reddit_media: 'Reddit Media',
  presskit: 'Rress Kit',
  article_link: 'Article',
  video_link: 'Watch Video'
};

type MissionItemProps = {
  mission: Launch;
  launchPads: Array<LaunchPad>; 
}

export default function MissionItem({mission, launchPads}: MissionItemProps){
  const imgAlt = mission.rocket.rocket_name + ' Logo';
  const success = (mission.launch_success && mission.land_success) ? 
                  '' : (<i>Failed Mission</i>);
  const payloadIds = mission.payloads.reduce((a,c)=> a? a+' - '+c.payload_id : c.payload_id, '');
  const title = mission.rocket.rocket_name + ' - ' + payloadIds + (success ? ' - ':'');
  const launchDate = new Date (mission.launch_date_local);
  const dateTimeFormat: Intl.DateTimeFormatOptions  = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };
  const displayDate = (<b>{launchDate.toLocaleDateString('en-US', dateTimeFormat)}</b>);
  const displayTime = (<b>{launchDate.toLocaleTimeString()}</b>);
  let launchPadName: React.ReactElement | null = null;
  for (let pad of launchPads){
    if (pad.id === mission.launch_site.site_id){
      launchPadName = (<b>{pad.full_name}</b>);
      break;
    }
  }
  const createLinksButton = (linksObject: Launch["links"]) => {
    const links = [];
    let foundLabel = false; 
    for (const [linkKey, linkContent] of Object.entries(linksObject)){
      foundLabel = false;
      for (const [labelKey, labelContent] of Object.entries(linksLabel)){
        if (linkKey === labelKey){
          if (labelContent && linkContent){
            links.push(<a href={linkContent}>
              <div className="mi-button">
                {labelContent}
              </div>
            </a>)
          }
          foundLabel = true;
          break;
        }
      }
      if (!foundLabel) {
        links.push(<a href={linkContent}>
          <div className="mi-button">
            {linkKey}
          </div>
        </a>)
      }
    }
    return links;
  }
  const linkButtons = createLinksButton (mission.links);
  const flightNumber = '#' + mission.flight_number;
  const wideScreenContent = (
    <div className='missionitem-container'>
      <div className='missionitem-icon'>
        <img alt={imgAlt} src={mission.links.mission_patch}/>
      </div>
      <div className="missionitem-info">
        <div className="mi-title">{title} {success}</div>
        <div className="mi-subtitle">
          Launched on {displayDate} at {displayTime} from {launchPadName}
        </div>
        <div className="mi-links">
          {linkButtons}
        </div>
      </div>
      <div className="missionitem-id">
        {flightNumber}
      </div>
    </div>
  );
  const narrowScreenContent = (
    <div className='missionitem-container-s'>
      <div className='missionitem-icon-id-container-s'>
        <div className='missionitem-icon-s'>
          <img alt={imgAlt} src={mission.links.mission_patch}/>
        </div>      
        <div className="missionitem-id-s">
          {flightNumber}
        </div>
      </div>
      <div className="missionitem-info-s">
        <div className="mi-title">{title} {success}</div>
        <div className="mi-subtitle">Launched on {displayDate} at {displayTime} from {launchPadName}</div>
        <div className="mi-links">
          {linkButtons}
        </div>
      </div>
    </div>
  )
  return <MatchMediaWrapper 
    mobileContent={narrowScreenContent} 
    desktopContent={wideScreenContent}
  />
}
