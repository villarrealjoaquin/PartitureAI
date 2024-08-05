import type { ComponentType } from "@/types";
import { checkAllComponentsExist } from "@/utils";
import { Button } from "../ui/button";

export const ComponentSummary = ({
  selectedComponents,
  onOpenModal,
}: {
  selectedComponents: ComponentType;
  onOpenModal: (open: boolean) => void;
}) => {
  return (
    <div className="border-t border-r border-[#B94CED] pt-2">
      <div
        className={`grid ${Object.values(selectedComponents).length !== 0 ? "grid-cols-1 sm:grid-cols-2 gap-4" : "flex justify-center items-center"} text-[#A5A5A5] h-[135px] w-full`}
      >
        {Object.values(selectedComponents).length !== 0 ? (
          Object.entries(selectedComponents).map(([key, component]) => (
            <div key={key} className="px-2">
              <p className="text-sm truncate">
                {key}: {component.name}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center max-w-[30rem]">
            ¡Ups! Parece que no has elegido ningún componente aún 🛠️. ¡Vamos a
            construir esa máquina de ensueño!
          </p>
        )}
      </div>
      <div className="flex justify-center w-full my-2">
        <Button
          disabled={!checkAllComponentsExist(selectedComponents)}
          onClick={() => onOpenModal(true)}
          className="bg-[#B94CED] truncate md:w-full mx-2 hover:bg-[#b065d2]"
        >
          Analizar compatibilidad de mis componentes
        </Button>
      </div>
    </div>
  );
};
