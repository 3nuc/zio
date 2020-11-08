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

export function makeServer() {
  const server = createServer({
    seeds(server) {
      server.db.loadData({
        projects,
      });
    },
    routes() {
      this.get("/api/projects", (schema) => schema.db.projects);
      this.get("/api/project/:id", (schema, request) => {
        const { id } = request.params;
        return schema.db.projects.find(id);
      });
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
