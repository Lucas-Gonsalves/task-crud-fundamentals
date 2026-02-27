class Database {
  #database = {};

  insert(table, data) {
    if (!Array.isArray(this.#database[table])) {
      this.#database[table] = [];
    }

    this.#database[table].push(data);

    return this.#database[table];
  }
}

export const database = new Database();
