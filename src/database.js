class Database {
  #database = {};

  select(table) {
    const search = this.#database[table];
    return search;
  }

  insert(table, data) {
    if (!Array.isArray(this.#database[table])) {
      this.#database[table] = [];
    }

    this.#database[table].push(data);

    return this.#database[table];
  }
}

export const database = new Database();
