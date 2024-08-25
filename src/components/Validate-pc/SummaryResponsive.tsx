import { checkAllComponentsExist } from "@/utils";
import { Button } from "../ui/button";

export const SummaryResponsive = ({
  savedComponents,
  onOpenModal,
}: {
  savedComponents: any;
  onOpenModal: () => void;
}) => {
  return (
    <div className="flex flex-col flex-grow border border-[#B94CED] mt-4 rounded-lg pt-2 ">
      <div
        className={`flex flex-col ${savedComponents.length === 0 ? "h-[100px]" : ""} overflow-auto text-[#A5A5A5] max-h-[400px] w-full`}
      >
        {savedComponents.length !== 0 ? (
          savedComponents?.map((e: any) => {
            return (
              <div className="flex items-center border rounded-md p-4 m-4">
                <div className="flex-col mr-4">{e.image}</div>
                <div className="flex flex-col gap-4">
                  <span className="text-white uppercase font-bold">
                    {e.name}
                  </span>
                  <span className="text-white">{e.value}</span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center self-center mt-5 max-w-[30rem]">
            ¡Ups! Parece que no has elegido ningún componente aún 🛠️. ¡Vamos a
            construir esa máquina de ensueño!
          </p>
        )}
      </div>
      <div className="flex justify-center w-full my-2">
        <Button
          disabled={!checkAllComponentsExist(savedComponents)}
          className="bg-[#B94CED] truncate w-full mx-2 hover:bg-[#b065d2]"
          onClick={onOpenModal}
        >
          Analizar compatibilidad de mis componentes
        </Button>
      </div>
    </div>
  );
};
