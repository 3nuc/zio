import { apiRoot } from "@/utils/api-root";

export interface Stanowisko {
  id: number;
  nazwa: string;
  dzial: string;
}
export function getStanowiska() {
  return apiRoot.get("stanowisko").json<Stanowisko[]>();
}
export function findByDzial(dzial: string) {
  return apiRoot.get(`/stanowisko/dzial/${dzial}`).json<Stanowisko[]>();
}

export function getStanowisko(id: string) {
  return apiRoot.get(`/stanowisko/${id}`).json<Stanowisko>();
}

export function addStanowisko(stanowisko: Stanowisko) {
  return apiRoot.post(`/stanowisko`, { json: stanowisko });
}
export function deleteStanowisko(id: string) {
  return apiRoot.delete(`/stanowisko/${id}`);
}
