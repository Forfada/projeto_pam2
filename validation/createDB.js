import * as SQLite from 'expo-sqlite';

export async function createDB() {
  const db = await SQLite.openDatabaseAsync('FMBSFDPDSMDTNMB');
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS Animais (id INTEGER PRIMARY KEY NOT NULL, nome TEXT NOT NULL, preco TEXT NOT NULL, img TEXT);
  `);
  return db;
}

/* 
INSERT INTO Animais (nome, preco, img) 
    VALUES ('Macaco cretino', 'R$ 3400,00', '../assets/images/macaco.jpg'),
           ('Lindo Elefante', 'R$ 50000,00', '../assets/images/elefante.jpg'),
           ('Mauricio', 'R$ 30,00', '../assets/images/porqui.jpg'),
           ('Lontra cega', 'R$ 400,00', '../assets/images/lontra.jpg'),
           ('Macaco cretino', 'R$ 3400,00', '../assets/images/macaco.jpg'),
           ('Lindo Elefante', 'R$ 50000,00', '../assets/images/elefante.jpg'),
           ('Mauricio', 'R$ 30,00', '../assets/images/porqui.jpg'),
           ('Lontra cega', 'R$ 400,00', '../assets/images/lontra.jpg'),
           ('Macaco cretino', 'R$ 3400,00', '../assets/images/macaco.jpg'),
           ('Lindo Elefante', 'R$ 50000,00', '../assets/images/elefante.jpg'),
           ('Mauricio', 'R$ 30,00', '../assets/images/porqui.jpg'),
           ('Lontra cega', 'R$ 400,00', '../assets/images/lontra.jpg');
           */