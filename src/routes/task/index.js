import { buildRoutePath } from "../../utils/build.route.path.js";

import { handlerDeleteTask } from "./handlers/delete.js";
import { handlerGetTask } from "./handlers/get.js";
import { handlerPatchTask } from "./handlers/patch.js";
import { handlerPostTask } from "./handlers/post.js";
import { handlerPutTask } from "./handlers/put.js";

export const taskRoutes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: handlerGetTask,
  },

  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: handlerPostTask,
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: handlerPutTask,
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: handlerPatchTask,
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: handlerDeleteTask,
  },
];
