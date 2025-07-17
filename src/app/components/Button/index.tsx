import React from 'react'
import Icon from '../Icon'

type Props = {
   disabled: boolean;
   onClick: () => void;
   icon: React.ComponentType;
}

const Button: React.FC<Props> = ({ disabled, onClick, icon }) => {
   return (
      <button disabled={disabled} className="text-white p-1 rounded hover:bg-neutral-800" onClick={onClick}>
         {icon && (
            <Icon
               component={icon}
            />
         )}
      </button>
   )
}

export default Button