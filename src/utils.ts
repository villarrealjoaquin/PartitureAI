export const checkAllComponentsExist = (components: any) => {
  const fields = [
    "cpu",
    "motherboards",
    "cooler",
    "cases",
    "gpu",
    "power_supplies",
    "memory_ram",
    "storage_drives",
  ];
  return fields.every((field) => components[field]);
};
