import { EmployeeProper } from "@/mock-server";
import { apiRoot } from "@/utils/api-root";

export function getPracownik() {
  return apiRoot.get("pracownicy").json<EmployeeProper[]>();
}

export function getPracownikById(id: string) {
  return apiRoot.get(`pracownicy/${id}`).json<EmployeeProper>();
}

export function addPracownik(pracownik: Omit<EmployeeProper, "id">) {
  return apiRoot.post(`pracownicy`, { json: pracownik });
}

export function deletePracownik(id: string) {
  return apiRoot.delete(`pracownicy/${id}`);
}

export function editPracownik(id: string, pracownik: Omit<EmployeeProper, "id">) {
  return apiRoot.put(`pracownicy/${id}`, { json: pracownik });
}
