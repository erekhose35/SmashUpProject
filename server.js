// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./smashup.db');
const SECRET = process.env.JWT_SECRET || 'CHANGE_THIS_IN_PROD';

app.use(cors());
app.use(express.json());

// ─── INIT DB ────────────────────────────────────────────────────────────────
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    is_admin INTEGER DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS factions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    is_official INTEGER DEFAULT 1
  )`);

  // Listes personnelles (vanilla n’y figure PAS ici !)
  db.run(`CREATE TABLE IF NOT EXISTS user_lists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT CHECK(name IN ('custom')) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS list_factions (
    list_id INTEGER NOT NULL,
    faction_id INTEGER NOT NULL,
    PRIMARY KEY (list_id, faction_id),
    FOREIGN KEY (list_id) REFERENCES user_lists(id),
    FOREIGN KEY (faction_id) REFERENCES factions(id)
  )`);

  // --- Vanilla globale (1 seule liste) ---
  db.run(`CREATE TABLE IF NOT EXISTS vanilla_factions (
    faction_id INTEGER PRIMARY KEY,
    FOREIGN KEY (faction_id) REFERENCES factions(id)
  )`);

  // --- Custom suggérée globale (wiki) ---
  db.run(`CREATE TABLE IF NOT EXISTS suggested_factions (
    faction_id INTEGER PRIMARY KEY,
    FOREIGN KEY (faction_id) REFERENCES factions(id)
  )`);
});

// ─── AUTH ────────────────────────────────────────────────────────────────────
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.run(`INSERT INTO users (email, password_hash) VALUES (?, ?)`, [email, hash], function(err) {
    if (err) return res.status(400).json({ error: 'Utilisateur existant.' });
    const token = jwt.sign({ userId: this.lastID }, SECRET);
    res.json({ token });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Email ou mot de passe invalide' });
    }
    const token = jwt.sign({ userId: user.id, isAdmin: user.is_admin }, SECRET);
    res.json({ token });
  });
});

function authenticate(req, res, next) {
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.status(401).json({ error: 'Token manquant' });
  jwt.verify(auth, SECRET, (err, payload) => {
    if (err) return res.status(403).json({ error: 'Token invalide' });
    req.userId = payload.userId;
    req.isAdmin = payload.isAdmin;
    next();
  });
}

function authenticateAdmin(req, res, next) {
  if (!req.isAdmin) return res.status(403).json({ error: 'Accès admin uniquement' });
  next();
}

// ─── ROUTES FACTIONS ─────────────────────────────────────────────────────────
// Ajouter faction perso
app.post('/api/faction', authenticate, (req, res) => {
  db.run(`INSERT INTO factions (name, is_official) VALUES (?, 0)`,
         [req.body.name], function(err) {
    if (err) return res.status(400).json({ error: 'Faction existe peut‑être déjà' });
    res.json({ id: this.lastID, name: req.body.name });
  });
});

// Récupérer toutes factions
app.get('/api/factions', authenticate, (req, res) => {
  db.all(`SELECT * FROM factions`, [], (err, rows) => res.json(rows));
});

// ─── ROUTES LISTES GLOBALES ─────────────────────────────────────────────────
// --- Vanilla ---
app.get('/api/list/vanilla', authenticate, (req, res) => {
  db.all(`SELECT f.* 
          FROM vanilla_factions vf 
          JOIN factions f ON f.id = vf.faction_id`, [], (err, rows) => {
    res.json(rows);
  });
});

app.post('/api/list/vanilla', authenticate, authenticateAdmin, (req, res) => {
  const ids = req.body.factionIds; // array d’IDs
  db.serialize(() => {
    db.run(`DELETE FROM vanilla_factions`);
    const stmt = db.prepare(`INSERT INTO vanilla_factions (faction_id) VALUES (?)`);
    ids.forEach(id => stmt.run(id));
    stmt.finalize(() => res.json({ success: true }));
  });
});

// --- Custom suggérée ---
app.get('/api/list/custom/suggested', authenticate, (req, res) => {
  db.all(`SELECT f.* 
          FROM suggested_factions sf 
          JOIN factions f ON f.id = sf.faction_id`, [], (err, rows) => {
    res.json(rows);
  });
});

app.post('/api/list/custom/suggested', authenticate, authenticateAdmin, (req, res) => {
  const ids = req.body.factionIds;
  db.serialize(() => {
    db.run(`DELETE FROM suggested_factions`);
    const stmt = db.prepare(`INSERT INTO suggested_factions (faction_id) VALUES (?)`);
    ids.forEach(id => stmt.run(id));
    stmt.finalize(() => res.json({ success: true }));
  });
});

// ─── ROUTES LISTES UTILISATEUR ───────────────────────────────────────────────
// Créer / mettre à jour sa liste custom perso
app.post('/api/list/custom', authenticate, (req, res) => {
  const ids = req.body.factionIds;
  db.serialize(() => {
    // Supprime ancienne si existante
    db.run(`DELETE FROM user_lists WHERE user_id = ? AND name = 'custom'`, [req.userId], () => {
      db.run(`INSERT INTO user_lists (user_id, name) VALUES (?, 'custom')`, [req.userId], function(err) {
        if (err) return res.status(500).json({ error: 'Erreur création liste' });
        const listId = this.lastID;
        const stmt = db.prepare(`INSERT INTO list_factions (list_id, faction_id) VALUES (?, ?)`);
        ids.forEach(id => stmt.run(listId, id));
        stmt.finalize(() => res.json({ success: true }));
      });
    });
  });
});

// Récupérer sa liste custom perso
app.get('/api/list/custom', authenticate, (req, res) => {
  db.get(`SELECT id FROM user_lists WHERE user_id = ? AND name = 'custom'`, [req.userId], (err, row) => {
    if (!row) return res.json([]); 
    db.all(`SELECT f.* 
            FROM list_factions lf 
            JOIN factions f ON f.id = lf.faction_id
            WHERE lf.list_id = ?`, [row.id], (err, rows) => res.json(rows));
  });
});

// ─── DÉMARRAGE ───────────────────────────────────────────────────────────────
app.listen(3000, () => 
  console.log('API SmashUp Randomizer active sur http://localhost:3000')
);
