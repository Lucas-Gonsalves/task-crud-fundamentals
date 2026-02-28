import { database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build.route.path.js";

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const filters = {};

      if (req.query.title) filters.title = req.query.title;
      if (req.query.description) filters.description = req.query.description;

      const tasks = database.select(
        "tasks",
        Object.keys(filters).length ? filters : null,
      );

      return res.end(JSON.stringify(tasks));
    },
  },

  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const tasks = database.insert("tasks", task);

      res.writeHead(201).end(JSON.stringify(tasks));
    },
  },
];
