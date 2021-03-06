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

export interface ProjectProper {
  id_projekt: number;
  nazwa: string;
  /**
   * id
   */
  kategoria_projektu: number;
}

export interface Employee {
  id: string;
  lastName: string;
  firstName: string;
  workTitle: string;
}

export interface EmployeeProper {
  id: string;
  imie: string;
  nazwisko: string;
  typ_konta: number;
  stanowisko: number;
}

export interface Training {
  id: string;
  nazwa: string;
  data_szkolenia: string;
  rodzaj_szkolenia: number; // category id
}

export interface Candidate {
  id: number;
  imie: string;
  nazwisko: string;
  /**
   * id
   */
  stanowisko: number;
  nazwa_pliku_CV: string;
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
      this.get("/api/project/:id", (schema, request) => schema.db.projects.find(request.params.id));

      this.get("/api/employees", (schema) => schema.db.employees);
      this.get("/api/employee/:id", (schema, request) => schema.db.employees.find(request.params.id));
      this.get("/api/trainings", (schema) => schema.db.trainings);
      this.get("/api/trainings/:id", (schema, request) => schema.db.trainings.find(request.params.id));
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
    data_szkolenia: new Date().toString(),
    id: "0",
    nazwa: "Legacy code w Sitecore i ASPX",
    rodzaj_szkolenia: 0,
  },
  {
    data_szkolenia: new Date().toString(),
    id: "1",
    nazwa: "Legacy code w Sitecore i ASPX",
    rodzaj_szkolenia: 0,
  },
  {
    data_szkolenia: new Date().toString(),
    id: "2",
    nazwa: "Legacy code w Sitecore i ASPX",
    rodzaj_szkolenia: 0,
  },
  {
    data_szkolenia: new Date().toString(),
    id: "3",
    nazwa: "Legacy code w Sitecore i ASPX",
    rodzaj_szkolenia: 0,
  },
  {
    data_szkolenia: new Date().toString(),
    id: "4",
    nazwa: "Legacy code w Sitecore i ASPX",
    rodzaj_szkolenia: 0,
  },
  {
    data_szkolenia: new Date().toString(),
    id: "5",
    nazwa: "Legacy code w Sitecore i ASPX",
    rodzaj_szkolenia: 0,
  },
];
