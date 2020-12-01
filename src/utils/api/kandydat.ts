import { Candidate } from "@/mock-server";
import { apiRoot } from "@/utils/api-root";

export function addKandydat(kandydat: Omit<Candidate, "id">) {
  return apiRoot.post("kandydaci", { json: kandydat });
}

export function getKandydaci() {
  return apiRoot.get("kandydaci").json<Candidate[]>();
}
export function getKandydat(id: string) {
  return apiRoot.get(`kandydaci/${id}`).json<Candidate>();
}
export function getKandydatSurname(nazwisko: string) {
  return apiRoot.get(`kandydaci/nazwisko/${nazwisko}`).json<Candidate>();
}
export function deleteKandydat(id: string) {
  return apiRoot.delete(`kandydaci/${id}`);
}
export function putKandydat(id: string, kandydat: Omit<Candidate, "id">) {
  return apiRoot.put(`kandydaci/${id}`, { json: kandydat });
}
