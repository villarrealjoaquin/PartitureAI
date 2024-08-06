export const ComponentsList = ({
  currentStep,
  children,
}: {
  currentStep: number;
  children: React.ReactNode;
}) => {
  return (
    <div className="overflow-y-auto lg:h-[780px] w-[100%] lg:w-[90%]">
      <ul
        className="flex flex-wrap overflow-x-auto justify-center lg:justify-start gap-4 p-4 animate-fade-in"
        key={currentStep}
      >
        {children}
      </ul>
    </div>
  );
};
