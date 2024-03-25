import { useState, useEffect, useMemo } from 'react';
import MissionSearch from './MissionSearch';
import MissionList from './MissionList';
import { FetchLaunchPads, FetchLaunchs } from '../api/hapi';
import './Mission.scss';
import type {Launch, LaunchPad} from './types';

export default function Missions() {
  const [launchs, setLaunchs] = useState<Array<Launch>>([]);
  const [launchPads, setLaunchPads] = useState<Array<LaunchPad>>([]);
  const [displayLaunchs, setDisplayLaunchs] = useState<Array<Launch>>([]);

  const loadLaunches = async() => {
    const ls = await FetchLaunchs();
    if (ls) {
      setLaunchs (ls);
      setDisplayLaunchs (ls);
    }
  }

  const loadLaunchePads = async()=>{
    const lds = await FetchLaunchPads();
    if (lds) setLaunchPads (lds);
  }

  useEffect(()=>{
    loadLaunches();
  },[]);

  useEffect(()=>{
    loadLaunchePads();
  },[]);

  const getYearsReducer = (a: Set<string>, c: Launch)=>{
    const date = new Date(c.launch_date_local);
    a.add ( date.getFullYear().toString() );
    return a;
  }

  const availableYears = useMemo(()=>{
    const initSet: Set<string> = new Set();
    const yearSet = launchs.reduce (getYearsReducer, initSet);
    //const yearArray = Array.from (yearSet); // IE11 don't support Array.from 
    const years: Array<string> = [];
    yearSet.forEach (function(year) {
      years.push(year);
    });
    return years;
  }, [launchs]);

  const filterMissions = (keywords: string, 
                          lPad: string, 
                          minY: string, 
                          maxY: string) =>{

    keywords = keywords.trim();
    const keywordsIsNumber = !isNaN (Number(keywords)); // including '', ' '

    const filterM = launchs.filter ((mission) => {
      const flight_number = mission.flight_number; 
      const rocket_name = mission.rocket.rocket_name.toLowerCase(); 
      const payload_ids = mission.payloads.reduce((a,c)=> a+c.payload_id, '').toLowerCase();
      const launchPad_id = mission.launch_site.site_id;
      const date = new Date(mission.launch_date_local);
      const launch_year = date.getFullYear();
      
      let bKeywords, bLPad, bMinYear, bMaxYear = false;
      keywords = keywords.toLowerCase();
      // keywords matches flight numbers
      if (keywords === ''){
        bKeywords = true;
      }
      else if (keywordsIsNumber) {
        if (parseInt(keywords) === flight_number ) bKeywords = true;
      }
      else{
        // keywords have any word in rocket name OR in payload id.
        bKeywords = rocket_name.includes(keywords) || 
                    payload_ids.includes(keywords);
      }

      // missions launched from the selected launch pad.
      if (lPad === 'Any'){
        bLPad = true;
      }
      else{
        bLPad = (lPad === launchPad_id);
      }

      if (minY === 'Any'){
        bMinYear = true;
      } else{
        bMinYear = (launch_year >= parseInt(minY, 10)); 
      }
      if (maxY === 'Any'){
        bMaxYear = true;
      }else{
        bMaxYear = (launch_year <= parseInt(maxY, 10));
      }
      // console.log(keywords+'-'+lPad+ '-'+ minYear+'-'+ maxYear)
      // console.log(bKeywords)
      // console.log(bLPad )
      // console.log(bMinYear )
      // console.log(bMaxYear)
      return bKeywords && bLPad && bMinYear && bMaxYear;
    });
    // console.log('filterMissions: ');
    // console.log(filterM);
    setDisplayLaunchs (filterM);
  }

  return (
    <div className='Mission-container' id='mission-container'>
      <MissionSearch lPads={launchPads} years={availableYears} onApply={filterMissions}/>
      <MissionList launchs={displayLaunchs} launchPads={launchPads} />
    </div>
  )
}

