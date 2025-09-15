// db.js
import * as SQLite from "expo-sqlite";

let dbInstance = null;

// Garante que abre/cria o banco só uma vez
async function getDB() {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync("FMBSFDPDSMDTNMB");

    await dbInstance.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS Animais (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        nome TEXT NOT NULL,
        preco TEXT NOT NULL,
        img TEXT
      );
    `);
  }
  return dbInstance;
}

// Seleciona todos os registros
export async function select() {
  const db = await getDB();
  return db.getAllAsync("SELECT * FROM Animais ORDER BY id DESC;");
}

// Insere um novo animal
export async function insert(nome, preco, img) {
  if (!nome || !preco) {
    throw new Error("Nome e preço são obrigatórios.");
  }

  const db = await getDB();
  await db.runAsync(
    "INSERT INTO Animais (nome, preco, img) VALUES (?, ?, ?);",
    [nome.trim(), preco.trim(), img || ""]
  );
}

// Atualiza animal existente
export async function update(id, nome, preco, img) {
  if (!id) throw new Error("ID é obrigatório para atualizar.");
  if (!nome || !preco) throw new Error("Nome e preço são obrigatórios.");

  const db = await getDB();
  await db.runAsync(
    "UPDATE Animais SET nome = ?, preco = ?, img = ? WHERE id = ?;",
    [nome.trim(), preco.trim(), img || "", id]
  );
}

// Deleta um animal
export async function remove(id) {
  if (!id) throw new Error("ID é obrigatório para deletar.");

  const db = await getDB();
  await db.runAsync("DELETE FROM Animais WHERE id = ?;", [id]);
}
