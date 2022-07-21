import fs from 'fs';
import path from 'path';

import connection from '../models/connection';

async function recreateDatabase() {
  try {
    const importPath = path.resolve(__dirname, 'DesafioTecnico.sql');
    const seedDBContent = fs.readFileSync(importPath).toString();
    const queries = seedDBContent.split(';').filter((p) => p.trim());
    for (let i = 0; i < queries.length; i += 1) {
      const query = queries[i];
      await connection.query(query); /* eslint-disable-line*/
    }
  } catch (error) {
    console.log('Banco Falha em restaurar o Banco', error); /* eslint-disable-line*/
  }
}

recreateDatabase()
  .then(async () => {
    console.log('Banco Restaurado com sucesso'); /* eslint-disable-line*/
    process.exit(0);
  });
