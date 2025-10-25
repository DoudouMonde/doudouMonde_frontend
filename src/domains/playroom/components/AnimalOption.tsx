import { RadioTrue, RadioFalse } from "@/assets/icons";

type AnimalOptionProps = {
  name: string;
  active: boolean;
  HeadIcon: React.ComponentType<{ className?: string }>;
};

export const AnimalOption = ({ name, active, HeadIcon }: AnimalOptionProps) => {
  return (
    <div className="transition-all duration-200 cursor-pointer">
      <div className="flex flex-col items-center">
        <div className="flex-shrink-0">
          <HeadIcon className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40" />
        </div>
        <div className="flex gap-2 items-center mt-[-12px]">
          {active ? (
            <RadioTrue className="w-6 h-6" />
          ) : (
            <RadioFalse className="w-6 h-6" />
          )}
          <h3 className="text-sm text-gray-900 body-hak-r">{name}</h3>
        </div>
      </div>
    </div>
  );
};
