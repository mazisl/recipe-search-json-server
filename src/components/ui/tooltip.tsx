import { ReactNode, useRef } from "react";

interface TooltipProps {
  children: ReactNode;
  tooltip?: string
}

export const Tooltip = ({children, tooltip}: TooltipProps) => {

  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  const onMouseEnter = ({clientX}: React.MouseEvent<HTMLDivElement>) => {
    if (!tooltipRef.current || !container.current) return;
    const rect = container.current?.getBoundingClientRect();
    tooltipRef.current.style.left = clientX - rect.left + "px";
  }

  return (
    <div ref={container} onMouseEnter={onMouseEnter} className="tooltip-container">
      {children}
      {tooltip ? 
        <span ref={tooltipRef} className="tooltip">
          {tooltip}
          <span className="tooltip-arrow" />
        </span> : null}
    </div>
  )
}