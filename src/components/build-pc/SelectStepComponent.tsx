import { componentNames } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const SelectStepComponent = ({
  selectedValue,
  onSelectChange,
}: {
  selectedValue: string;
  onSelectChange: (value: string) => void;
}) => {
  return (
    <>
      <Select value={selectedValue} onValueChange={onSelectChange}>
        <SelectTrigger className="w-full bg-transparent border-[#B94CED] text-white">
          <SelectValue placeholder="Componentes" />
        </SelectTrigger>
        <SelectContent className="bg-[#111827] border-[#B94CED] text-white">
          {Object.entries(componentNames).map(([key, name]) => (
            <SelectItem key={key} value={key}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
