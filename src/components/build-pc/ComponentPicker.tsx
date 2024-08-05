import { componentNames, COMPONENTS } from "@/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ComponentValues } from "@/types";

export const ComponentPicker = ({
  currentComponent,
  onNavigateToComponent,
}: {
  currentComponent: string;
  onNavigateToComponent: (i: number) => void;
}) => {
  return (
    <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 gap-3 h-[65vh] border-r border-[#B94CED] overflow-auto">
      <TooltipProvider>
        {Object.entries(COMPONENTS).map(([key, Value], i: number) => {
          const condition = key === currentComponent ? "#B94CED" : "#fff";
          const componentKey = key as ComponentValues;
          return (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onNavigateToComponent(i)}
                  className="cursor-pointer"
                >
                  <Value color={condition} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                {componentNames[componentKey]}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
};
