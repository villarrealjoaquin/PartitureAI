import { Button } from "../ui/button";

export const ComponentSummary = ({ components, setOpenModal }: any) => {
  return (
    <>
      <div className="m-4 overflow-auto max-h-[68vh] h-[68vh]">
        {components?.length === 0 ? (
          <div className="text-center mt-[300px]">
            <span className="text-white">
              ¡Ups! Parece que no has colocado ningún componente aún 🛠️. ¡Vamos
              a construir esa máquina de ensueño!
            </span>
          </div>
        ) : (
          components?.map((e: any) => {
            return (
              <div className="flex items-center border rounded-md p-4 mb-4">
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
        )}
      </div>
      <div className="flex justify-center w-full my-2">
        <Button
          // disabled={!checkAllComponentsExist(selectedComponents)}
          onClick={() => setOpenModal(true)}
          className="bg-[#B94CED] truncate md:w-full mx-2 hover:bg-[#b065d2]"
        >
          Analizar compatibilidad de mis componentes
        </Button>
      </div>
    </>
  );
};
