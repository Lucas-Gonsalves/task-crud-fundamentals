import { database } from "../../../database/index.js";

export function handlerPostTask(req, res) {
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
}
