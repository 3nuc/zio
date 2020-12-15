import { Project, Employee, Training } from "@/mock-server";
import { apiRoot } from "@/utils/api-root";

export const getSingleProject = (id: string) => apiRoot.get(`projekt/${id}`).json<Project>();
export const getProjects = () => apiRoot.get("projekt").json<Project[]>();

export const getProjectCategories = () => apiRoot.get("katProjektu").json<any>();
export const getProjectCategory = (id: string) => apiRoot.get(`katProjektu/${id}`).json<any>();
export const addProject = (project: any) => apiRoot.post("projekt", { json: project }).json<any>();

export const getSingleEmployee = (id: string) => apiRoot.get(`employee/${id}`).json<Employee>();
export const getEmployees = () => apiRoot.get("employees").json<Employee[]>();

export const getSingleTraining = (id: string) => apiRoot.get(`trainings/${id}`).json<Training>();
export const getTrainings = () => apiRoot.get("trainings").json<Training[]>();
