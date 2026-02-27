import http from "node:http";
import { json } from "./middlewares/json.js";

const server = http.createServer( async (req, res) => {

  await json(req, res);

  if (req.url === "/tasks" && req.method === "GET") {
    console.log(
      "Hello World!",
    );
    return res.end("Hello");
  }

  return res.writeHead(404).end("Not found");
});

server.listen(3333);
