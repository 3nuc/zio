import { Project, Employee } from "@/mock-server";
import { apiRoot } from "@/utils/api-root";

export const getSingleProject = (id: string) =>
  apiRoot.get(`project/${id}`).json<Project>();
export const getProjects = () => apiRoot.get("projects").json<Project[]>();

export const getSingleEmployee = (id: string) =>
  apiRoot.get(`employees/${id}`).json<Employee>();
export const getEmployees = () => apiRoot.get("employees").json<Employee[]>();
