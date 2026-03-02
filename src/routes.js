import { database } from "./database/database.js";
import { buildRoutePath } from "./utils/build.route.path.js";

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const filters = {
        ...(req.query.title && { title: req.query.title }),
        ...(req.query.description && { description: req.query.description }),
      };

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
      if (!req.body?.title || !req.body?.description) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: "To create a new task, title and description is required.",
          }),
        );
      }

      const { title, description } = req.body;

      const taskTemplate = {
        title,
        description,
        completed_at: null,
      };

      const task = database.insert("tasks", taskTemplate);

      if (!task) {
        return res.writeHead(500).end(
          JSON.stringify({
            message: "Internal server error.",
          }),
        );
      }

      return res.writeHead(201).end(
        JSON.stringify({
          message: "Task created with success",
          task,
        }),
      );
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      if (!id) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: "Task not founded",
          }),
        );
      }

      if (!req.body?.title && !req.body?.description) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: "To update a task, title or description is required.",
          }),
        );
      }

      const taskFounded = database.select("tasks", { id })[0];

      if (!taskFounded) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: "Task not found.",
          }),
        );
      }

      const { title, description } = req.body;

      const taskUpdated = {
        title: title ?? taskFounded.title,
        description: description ?? taskFounded.description,
      };

      const updated = database.update("tasks", id, taskUpdated);

      if (!updated) {
        return res.writeHead(500).end(
          JSON.stringify({
            message: "Internal server error.",
          }),
        );
      }

      return res.writeHead(200).end(
        JSON.stringify({
          message: "Task updated with success.",
        }),
      );
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      if (!id) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: "Task not founded",
          }),
        );
      }

      const taskFounded = database.select("tasks", { id })[0];

      if (!taskFounded) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: "Task not found.",
          }),
        );
      }

      let taskUpdated = {
        completed_at: taskFounded.completed_at ? null : new Date(),
      };

      const updated = database.update("tasks", id, taskUpdated);

      if (!updated) {
        return res.writeHead(500).end(
          JSON.stringify({
            message: "Internal server error",
          }),
        );
      }

      return res.writeHead(200).end(
        JSON.stringify({
          message: "Task updated with success",
        }),
      );
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      if (!id) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: "Task not found",
          }),
        );
      }

      const deleted = database.delete("tasks", id);

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
