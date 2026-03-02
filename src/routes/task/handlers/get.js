import { database } from "../../../database/index.js";

export function handlerGetTask(req, res) {
  const filters = {
    ...(req.query.title && { title: req.query.title }),
    ...(req.query.description && { description: req.query.description }),
  };

  const tasks = database.select(
    "tasks",
    Object.keys(filters).length ? filters : null,
  );

  return res.end(JSON.stringify(tasks));
};
