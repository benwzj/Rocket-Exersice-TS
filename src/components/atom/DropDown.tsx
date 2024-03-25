
import { useEffect, useState, useRef } from "react";
import { ReactComponent as Chevron } from '../../down-chevron.svg';
import './DropDown.scss'

export type DropDownOption = {
  label: string; 
  value: string;
};
export type DropDownProps = {
  currentOption: DropDownOption;
  options: Array<DropDownOption>;
  onChange: (option: DropDownOption) => void;
};

export default function DropDown({currentOption, options, onChange}: DropDownProps){
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef<HTMLDivElement>(null);

  useEffect (() => {
    const handler = (event: MouseEvent) => {
      if (!divEl.current) {
        return;
      }
      if (event.target instanceof Element){
        if (!divEl.current.contains(event.target)) {
          setIsOpen(false);
        }
      }else{
        setIsOpen(false);
      }
      
    };

    document.addEventListener ('click', handler, true);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen (!isOpen);
  };

  const handleOptionClick = (option: DropDownOption) => {
    setIsOpen (false);
    onChange (option);
  };

  const renderedOptions = options.map((option: DropDownOption) => {
    return (
      <div
        className="dropdown-item"
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={divEl} className="dropdown-container">
      <div
        className="dropdown-bar"
        onClick={handleClick}
      >
        {/* {value?.label || 'Any'} */}
        {currentOption?.label || 'Any'}
        {isOpen? <Chevron className="chevron-up" /> : <Chevron className="chevron" /> }
      </div>
      {isOpen && <div className="dropdown-options">{renderedOptions}</div>}
    </div>
  );
}
