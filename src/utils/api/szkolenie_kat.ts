import { apiRoot } from "@/utils/api-root";

export const getSzkoleniaKategorie = () => {
  return apiRoot.get("szkolenie_kat").json<any>();
};
