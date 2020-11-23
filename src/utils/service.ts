import { Project, Employee, Training } from "@/mock-server";
import { apiRoot } from "@/utils/api-root";

type GetById = (id: string) => Promise<unknown>;

export const getSingleProject: GetById = (id) =>
  apiRoot.get(`project/${id}`).json<Project>();
export const getProjects = () => apiRoot.get("projects").json<Project[]>();

export const getSingleEmployee: GetById = (id) =>
  apiRoot.get(`employee/${id}`).json<Employee>();
export const getEmployees = () => apiRoot.get("employees").json<Employee[]>();

export const getSingleTraining: GetById = (id) =>
  apiRoot.get(`trainings/${id}`).json<Training>();
export const getTrainings = () => apiRoot.get("trainings").json<Training[]>();
