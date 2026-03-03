import { database } from "../../../database/index.js";

export function handlerPatchTask(req, res) {
  const { id } = req.params;

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
}
