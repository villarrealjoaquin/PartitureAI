import { checkAllComponentsExist } from "@/utils";
import { Button } from "../ui/button";
import { ComponentType } from "@/types";

export const SummaryResponsive = ({
  selectedComponents,
  onOpenModal,
}: {
  selectedComponents: ComponentType;
  onOpenModal: (open: boolean) => void;
}) => {
  return (
    <div className="flex flex-col flex-grow border border-[#B94CED] mt-4 rounded-lg pt-2 ">
      <div
        className={`lg:grid ${Object.values(selectedComponents).length !== 0 ? "lg:grid-cols-2 gap-4" : "flex justify-center items-center"} text-[#A5A5A5] h-[175px] lg:h-[135px] w-full`}
      >
        {Object.values(selectedComponents).length !== 0 ? (
          Object.entries(selectedComponents).map(([key, component]) => (
            <div key={key} className="px-2">
              <p className="text-sm truncate ">
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
          className="bg-[#B94CED] truncate w-full mx-2 hover:bg-[#b065d2]"
          onClick={() => onOpenModal(true)}
        >
          Analizar compatibilidad de mis componentes
        </Button>
      </div>
    </div>
  );
};
