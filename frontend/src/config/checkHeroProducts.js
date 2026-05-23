const db = require('../../backend/src/db');

async function checkHeroProducts() {
  const terms = ['HMD', 'Daikin', 'Motorola', 'Sony Bravia', 'Realme 12 Pro', 'edge 70 fusion'];
  for (const term of terms) {
    const res = await db.query('SELECT id, name FROM products WHERE name ILIKE $1 LIMIT 5', [`%${term}%`]);
    console.log(`\nMatches for "${term}":`);
    res.rows.forEach(r => console.log(` - [${r.id}] ${r.name}`));
  }
  process.exit();
}

checkHeroProducts();
