import fs from "node:fs";
import { parse } from "csv-parse";

const csvPath = new URL("./database/tasks.csv", import.meta.url);

async function run() {
  const parser = fs.createReadStream(csvPath).pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
    }),
  );

  for await (const record of parser) {
    const { title, description } = record;

    await fetch("http://localhost:3333/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    console.log(`Task ${title} created.`);
  }
}

run();
