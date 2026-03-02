import { database } from "../../../database/index.js";

export function handlerPutTask(req, res) {
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
}
