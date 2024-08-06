import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const ApiKeyVerify = ({
  hasApiKey,
  onSubmit,
  onApiKeyChange,
}: {
  hasApiKey: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onApiKeyChange: (value: string) => void;
}) => {
  return (
    <>
      {!hasApiKey && (
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-5 justify-center items-center w-full py-8"
        >
          <h2 className="text-center text-4xl font-bold text-white">
            Ingresar API KEY 🤖
          </h2>
          <p className="text-center text-white my-2 border border-[#B94CED] rounded-lg p-4">
            Bienvenido al portal de acceso de nuestra Inteligencia Artificial{" "}
            <span className="text-[#B94CED] font-bold">TeianAI</span>. Para
            comenzar a interactuar con nuestras herramientas avanzadas, es
            necesario que ingreses tu{" "}
            <span className="text-[#B94CED] font-bold">API KEY</span>
            personal. Este código único te permitirá realizar operaciones y
            acceder a funcionalidades exclusivas. Por favor, introduce tu
            <span className="text-[#B94CED] font-bold"> API KEY</span> en el
            campo de abajo y presiona{" "}
            <span className="text-[#B94CED] font-bold">Ingresar</span> para
            continuar.
          </p>
          <div className="w-full">
            <Input
              onChange={(e) => onApiKeyChange(e.target.value)}
              placeholder="Ingresa tu API KEY"
              name="apiKey"
              className="bg-transparent border-[#B94CED] w-full text-white"
            />
          </div>
          <Button className="w-36 bg-[#B94CED] hover:bg-[#b065d2] transition-all ease-in-out duration-300 flex self-end active:scale-95">
            Ingresar
          </Button>
        </form>
      )}
    </>
  );
};
