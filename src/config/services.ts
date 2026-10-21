import serviceData from "./services.json";

type Service = {
  id: string;
  title: string;
  copy: string;
  image: string | null;
};

export const services: readonly Service[] = serviceData;

export const formatServiceNumber = (index: number) => String(index + 1).padStart(2, "0");
