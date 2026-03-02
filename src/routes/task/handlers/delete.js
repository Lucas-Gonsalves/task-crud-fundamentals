import { database } from "../../../database/index.js";

export function handlerDeleteTask(req, res) {
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
}
