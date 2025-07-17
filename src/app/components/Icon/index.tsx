import { ComponentType, SVGProps } from "react";

type Props = {
   component: ComponentType<SVGProps<SVGSVGElement>>;
   ariaHidden?: boolean;
   className?: string;
};


const Icon: React.FC<Props> = ({
   component: Component,
   ariaHidden,
   className,
}) => {
   return (
      <span
         className={`flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full ${className}`}
      >
         <Component aria-hidden={ariaHidden} />
      </span>
   );
}

export default Icon;
