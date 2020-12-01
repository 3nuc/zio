import { Training } from "@/mock-server";
import { apiRoot } from "@/utils/api-root";

export function addSzkolenie(szkolenie: Omit<Training, "id">) {
  return apiRoot.get("szkolenia", { json: szkolenie }).json<Training>();
}
export function getSzkolenie(id: string) {
  return apiRoot.get(`szkolenia/${id}`).json<Training>();
}
export function getSzkolenia() {
  return apiRoot.get("szkolenia").json<Training[]>();
}
export function editSzkolenie(id: string) {
  return apiRoot.put(`szkolenia/${id}`);
}
export function removeSzkolenie(id: string) {
  return apiRoot.delete(`szkolenia/${id}`);
}
export function findSzkolenieByNazwa() {
  return apiRoot.get("szkolenia").json<Training>();
}
export function findSzkolenieByRodzaj() {
  return apiRoot.get("szkolenia").json<Training>();
}
