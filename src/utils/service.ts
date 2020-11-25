import { Project, Employee, Training } from "@/mock-server";
import { apiRoot } from "@/utils/api-root";

export const getSingleProject = (id: string) => apiRoot.get(`project/${id}`).json<Project>();
export const getProjects = () => apiRoot.get("projects").json<Project[]>();

export const getSingleEmployee = (id: string) => apiRoot.get(`employee/${id}`).json<Employee>();
export const getEmployees = () => apiRoot.get("employees").json<Employee[]>();

export const getSingleTraining = (id: string) => apiRoot.get(`trainings/${id}`).json<Training>();
export const getTrainings = () => apiRoot.get("trainings").json<Training[]>();
