import { useState } from "react";
import DropDown from './atom/DropDown';
import type {DropDownOption} from './atom/DropDown';
import type {LaunchPad} from './types';
import './Mission.scss';

type MSProps = {
  lPads: Array<LaunchPad>;
  years: Array<string>;
  onApply: (keywords: string, 
            lPad: string, 
            minY: string, 
            maxY: string) => void;
};

export default function MissionSearch ({lPads, years, onApply}: MSProps) {
  const [keywords, setKeywords] = useState ('');
  const [launchPad, setLaunchPad] = useState({label: 'Any', value: 'Any'});
  const [minYear, setMinYear] = useState ({label: 'Any', value: 'Any'});
  const [maxYear, setMaxYear] = useState ({label: 'Any', value: 'Any'});

  const lpOptions = lPads ? lPads.map(pad=>({label: pad.full_name, value: pad.id})) : [];
  lpOptions.unshift ({label: 'Any', value: 'Any'})
  //console.log(lpOptions);
  const yearOptions = years ? years.map(year=>({label: year+'', value: year})) : [];
  yearOptions.unshift ({label: 'Any', value: 'Any'})
  //console.log(yearOptions); 

  const handleKeywords = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setKeywords (e.target.value);
  }
  const handleLaunchPad = (option: DropDownOption) =>{
    setLaunchPad (option);
  }
  const handleMinYear = (option: DropDownOption) =>{
    setMinYear (option);
  }
  const handleMaxYear = (option: DropDownOption) =>{
    setMaxYear (option);
  }
  const handleApply = ()=>{
    if ((minYear.value !== 'Any' || maxYear.value !== 'Any') && 
         parseInt(minYear.value) > parseInt(maxYear.value)){
      alert(" The year range is invalid, please double check it!");
    }else{
      onApply(keywords, launchPad.value, minYear.value, maxYear.value);
    }
  }
  return (
    <div className="Search-container">
      <div className='keyworks'>
        <div className="searchLabel">Keywords</div>
        <input type='text' value={keywords} placeholder='eg Falcon' onChange={handleKeywords}></input>
      </div>
      <div className='launchPad'>
        <div className="searchLabel">Launch Pad</div>
        <DropDown options={lpOptions} currentOption={launchPad} onChange={handleLaunchPad} />
      </div>
      <div className='minYear'>
        <div className="searchLabel">Min Year</div>
        <DropDown options={yearOptions} currentOption={minYear} onChange={handleMinYear} />
      </div>
      <div className='maxYear'>
        <div className="searchLabel">Max Year</div>
        <DropDown options={yearOptions} currentOption={maxYear} onChange={handleMaxYear} />
      </div>
      <div className='apply'>
        <div className="searchLabel">&nbsp;&nbsp;&nbsp;</div>
        <button className='button' onClick={handleApply}>Apply</button>
      </div>
    </div>
  )
}
