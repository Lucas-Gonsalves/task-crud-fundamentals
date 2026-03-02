import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";

const databasePath = new URL("db.json", import.meta.url);

class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  #getTable(table) {
    const dataTable = this.#database[table];

    if (!Array.isArray(dataTable)) {
      return null;
    }

    return dataTable;
  }

  #getTableRow(table, id) {
    const dataTable = this.#getTable(table);
    if (!dataTable) {
      return null;
    }

    const rowIndex = dataTable.findIndex((row) => row.id === id);
    if (rowIndex === -1) {
      return null;
    }

    return {
      rowContent: dataTable[rowIndex],
      rowIndex,
    };
  }

  select(table, search) {
    let data = this.#getTable(table) ?? [];

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    return data;
  }

  insert(table, data) {
    this.#database[table] ??= [];

    const dataFormated = {
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
      ...data,
    };

    this.#database[table].push(dataFormated);

    this.#persist();
    return dataFormated;
  }

  delete(table, id) {
    const dataTableFounded = this.#getTableRow(table, id);

    if (!dataTableFounded) {
      return false;
    }

    const { rowIndex } = dataTableFounded;

    this.#database[table].splice(rowIndex, 1);
    this.#persist();

    return true;
  }

  update(table, id, data = {}) {
    const dataTableFounded = this.#getTableRow(table, id);

    if (!dataTableFounded) {
      return false;
    }

    const { rowIndex, rowContent } = dataTableFounded;

    const newData = {
      ...rowContent,
      ...data,
      id: rowContent.id,
      updated_at: new Date(),
    };

    this.#database[table][rowIndex] = newData;
    this.#persist();

    return true;
  }
}

export const database = new Database();
