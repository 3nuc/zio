import { createServer } from "miragejs";

export interface Project {
  id: string;
  name: string;
  client: { name: string };
  projectManager: { name: string };
  memberCount: number;
  startDate: Date;
  endDate: Date;
}

export interface Employee {
  id: string;
  lastName: string;
  firstName: string;
  workTitle: string;
}

export interface Training {
  id: string;
  nazwa: string;
  data_szkolenia: Date;
  rodzaj_szkolenia: number; // category id
}

export function makeServer() {
  const server = createServer({
    seeds(server) {
      server.db.loadData({
        projects,
        employees,
        trainings,
      });
    },
    routes() {
      this.get("/api/projects", (schema) => schema.db.projects);
      this.get("/api/project/:id", (schema, request) =>
        schema.db.projects.find(request.params.id)
      );

      this.get("/api/employees", (schema) => schema.db.employees);
      this.get("/api/employee/:id", (schema, request) =>
        schema.db.employees.find(request.params.id)
      );
      this.get("/api/trainings", (schema) => schema.db.trainings);
      this.get("/api/trainings/:id", (schema, request) =>
        schema.db.trainings.find(request.params.id)
      );
    },
  });
  return server;
}

const projects: Project[] = [
  {
    id: "1",
    name: "Skoczna w Villingen",
    client: { name: "Adam Małysz" },
    projectManager: { name: "Jane Ahonen" },
    memberCount: 15,
    startDate: new Date(Date.now() - 1_000_000),
    endDate: new Date(Date.now() + 1_000_000),
  },
  {
    id: "2",
    name: "Vistula RED",
    client: { name: "Artur Tagisow" },
    projectManager: { name: "Paweł Halicki" },
    memberCount: 7,
    startDate: new Date(Date.now() - 1_000_000),
    endDate: new Date(Date.now() + 1_000_000),
  },
];

const employees: Employee[] = [
  {
    id: "1",
    firstName: "Adam",
    lastName: "Cozack",
    workTitle: "QA Specialist",
  },
  {
    id: "2",
    firstName: "John",
    lastName: "Braun",
    workTitle: "Frontend Developer",
  },
  {
    id: "3",
    firstName: "Adam",
    lastName: "Małysz",
    workTitle: "Skoczek narciarski",
  },
  {
    id: "4",
    firstName: "Janusz",
    lastName: "Laskowski",
    workTitle: "Mąż stanu",
  },
];

const trainings: Training[] = [
  {
    data_szkolenia: new Date(),
    id: "0",
    nazwa: "Legacy code w Sitecore i ASPX",
    rodzaj_szkolenia: 0,
  },
  {
    data_szkolenia: new Date(),
    id: "1",
    nazwa: "Legacy code w Sitecore i ASPX",
    rodzaj_szkolenia: 0,
  },
  {
    data_szkolenia: new Date(),
    id: "2",
    nazwa: "Legacy code w Sitecore i ASPX",
    rodzaj_szkolenia: 0,
  },
  {
    data_szkolenia: new Date(),
    id: "3",
    nazwa: "Legacy code w Sitecore i ASPX",
    rodzaj_szkolenia: 0,
  },
  {
    data_szkolenia: new Date(),
    id: "4",
    nazwa: "Legacy code w Sitecore i ASPX",
    rodzaj_szkolenia: 0,
  },
  {
    data_szkolenia: new Date(),
    id: "5",
    nazwa: "Legacy code w Sitecore i ASPX",
    rodzaj_szkolenia: 0,
  },
];
