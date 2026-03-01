import { database } from "./database/database.js";
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

      return res.end(JSON.stringify({ tesks: tasks }));
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

      return res.writeHead(201).end(JSON.stringify({ tasks: tasks }));
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      const newTask = {
        title,
        description,
      };

      const updated = database.update("tasks", id, newTask);

      if (!updated) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: "Task not found.",
          }),
        );
      }

      return res.writeHead(200).end(JSON.stringify({
        message: "Task updated with success.",
      }));
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const deleted = database.delete("tasks", { id });

      if (!deleted) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: "Task not found.",
          }),
        );
      }

      return res.writeHead(204).end();
    },
  },
];
