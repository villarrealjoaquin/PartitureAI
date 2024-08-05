export type Component = {
  id: number;
  name: string;
  manufacturer: string;
  base_clock: string;
  boost_clock: string;
  memory: string;
  power_consumption: string;
  price: number;
  image: string;
  type_component: string;
  quantity: number;
};

export type ComponentValues =
  | "cpu"
  | "motherboards"
  | "cooler"
  | "cases"
  | "gpu"
  | "power_supplies"
  | "memory_ram"
  | "storage_drives";

export type ComponentType = Record<ComponentValues, Component>;

export type ComponentKeys = keyof ComponentType;

export type Analysis = {
  type: string;
  text: string;
  value: number | string;
  condition: boolean;
};

type Message = {
  name: string;
};

export type Messages = {
  [key: string]: Message;
};
