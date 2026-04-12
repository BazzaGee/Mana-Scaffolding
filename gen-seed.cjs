const Database = require('better-sqlite3');
const fs = require('fs');
const db = new Database('./data.db');

function escapeValue(v) {
  if (v === null) return 'NULL';
  if (typeof v === 'number') return v;
  return "'" + String(v).replace(/'/g, "''") + "'";
}

function escapeColumn(name) {
  const reserved = ['unique', 'order', 'group', 'key', 'index', 'table', 'column', 'default', 'values'];
  if (reserved.includes(name.toLowerCase())) {
    return '"' + name + '"';
  }
  return name;
}

// Generate INSERT statements for collections
const collections = db.prepare('SELECT * FROM _emdash_collections').all();
let sql = '-- Collections\n';
collections.forEach(c => {
  const cols = Object.keys(c).map(escapeColumn).join(', ');
  const vals = Object.values(c).map(escapeValue).join(', ');
  sql += "INSERT INTO _emdash_collections (" + cols + ") VALUES (" + vals + ");\n";
});

// Generate INSERT statements for fields
const fields = db.prepare('SELECT * FROM _emdash_fields').all();
sql += '\n-- Fields\n';
fields.forEach(f => {
  const cols = Object.keys(f).map(escapeColumn).join(', ');
  const vals = Object.values(f).map(escapeValue).join(', ');
  sql += "INSERT INTO _emdash_fields (" + cols + ") VALUES (" + vals + ");\n";
});

// Generate INSERT statements for menus
const menus = db.prepare('SELECT * FROM _emdash_menus').all();
sql += '\n-- Menus\n';
menus.forEach(m => {
  const cols = Object.keys(m).map(escapeColumn).join(', ');
  const vals = Object.values(m).map(escapeValue).join(', ');
  sql += "INSERT INTO _emdash_menus (" + cols + ") VALUES (" + vals + ");\n";
});

// Generate INSERT statements for menu items
const menuItems = db.prepare('SELECT * FROM _emdash_menu_items').all();
sql += '\n-- Menu Items\n';
menuItems.forEach(mi => {
  const cols = Object.keys(mi).map(escapeColumn).join(', ');
  const vals = Object.values(mi).map(escapeValue).join(', ');
  sql += "INSERT INTO _emdash_menu_items (" + cols + ") VALUES (" + vals + ");\n";
});

// Settings
const options = db.prepare('SELECT * FROM options').all();
sql += '\n-- Options\n';
options.forEach(o => {
  const cols = Object.keys(o).map(escapeColumn).join(', ');
  const vals = Object.values(o).map(escapeValue).join(', ');
  sql += "INSERT INTO options (" + cols + ") VALUES (" + vals + ");\n";
});

fs.writeFileSync('emdash-seed-data.sql', sql);
console.log('Generated seed data SQL');