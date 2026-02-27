import { database } from "./database.js";
import { randomUUID }  from "node:crypto";

export const routes = [
  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) => {
      res.end("Hello World");
    },
  },

  {
    method: "POST",
    path: "/tasks",
    handler: (req, res) => {
      const { title, description } = req.body

      const task ={
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const tsaks = database.insert("tasks", task);

      res.writeHead(201).end(JSON.stringify(tsaks));
    },
  },
];
