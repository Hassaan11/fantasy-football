import React from 'react';
import DownArrowIcon from '@/app/assets/icons/down-icon.svg';

type Props = {
   label?: string;
   options: string[];
   value: string;
   onChange: (value: string) => void;
   className?: string;
}

const Dropdown: React.FC<Props> = ({ label, options, value, onChange, className, }) => {
   return (
      <div className={`relative`}>
         <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white">
            <DownArrowIcon />
         </div>

         <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full bg-[#1c1c1c] text-white py-3 px-4 mr-3 rounded justify-between ${className}`}
         >
            <option value="">{label}</option>
            {options?.map((opt, ind) => <option key={opt + ind} value={opt}>{opt}</option>)}
         </select>
      </div>
   );
}

export default Dropdown;
