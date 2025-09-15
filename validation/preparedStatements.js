import * as SQLite from 'expo-sqlite';

export async function select() {
  const db = await SQLite.openDatabaseAsync('FMBSFDPDSMDTNMB');
  return db.getAllAsync('SELECT * FROM Animais;');
}

export async function insert(nome, preco, img) {
  const db = await SQLite.openDatabaseAsync('FMBSFDPDSMDTNMB');
  return db.execAsync('INSERT INTO Animais (nome, preco, img) VALUES (?, ?, ?);', [nome, preco, img]);
}

export async function update(id, nome, preco, img) {
  const db = await SQLite.openDatabaseAsync('FMBSFDPDSMDTNMB');
  return db.execAsync('UPDATE Animais SET nome = ?, preco = ?, img = ? WHERE id = ?;', [nome, preco, img, id]);
}

export async function remove(id) {
  const db = await SQLite.openDatabaseAsync('FMBSFDPDSMDTNMB');
  return db.execAsync('DELETE FROM Animais WHERE id = ?;', [id]);
}