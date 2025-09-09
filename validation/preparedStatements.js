import * as SQLite from 'expo-sqlite';

export async function select() {
  const db = await SQLite.openDatabaseAsync('FMBSFDPDSMDTNMB');
  return db.getAllAsync('SELECT * FROM Animais;');
}

export async function insert(nome, preco, img) {
  const db = await SQLite.openDatabaseAsync('FMBSFDPDSMDTNMB');
  return db.execAsync('INSERT INTO Animais (nome, preco, img) VALUES (?, ?, ?);', [nome, preco, img]);
}