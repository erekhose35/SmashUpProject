console.log('Script démarré à', new Date().toLocaleString());

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;

async function scrapeFactions() {
  try {
    // Étape 1 : Récupérer le HTML
    console.log('Récupération de la page wiki...');
    const response = await axios.get('https://smash-up-custom-factions.fandom.com/wiki/Factions', {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    console.log('Page récupérée, longueur HTML :', response.data.length);

    // Étape 2 : Parser le HTML
    console.log('Analyse de la table HTML...');
    const $ = cheerio.load(response.data);
    const dataSetMap = new Map();
    let factionCount = 0;

    // Tester plusieurs sélecteurs
    const selectors = ['table.fandom-table', 'table.wikitable', 'table.sortable', 'table'];
    let table = null;
    for (const selector of selectors) {
      table = $(selector);
      if (table.length > 0) {
        console.log(`Table trouvée avec le sélecteur : ${selector}`);
        break;
      }
    }

    if (!table || table.length === 0) {
      console.error('Aucune table trouvée. Sélecteurs testés :', selectors);
      await fs.writeFile('debug.html', response.data);
      console.log('HTML brut sauvegardé dans debug.html pour inspection');
      return new Map();
    }

    // Étape 3 : Extraire les factions
    console.log('Extraction des factions...');
    $(table).find('tr').each((index, element) => {
      if (index === 0) return; // Ignorer l'en-tête
      const columns = $(element).find('td');
      console.log(`Ligne ${index}: ${columns.length} colonnes trouvées`);

      if (columns.length < 4) {
        console.warn(`Ligne ${index} ignorée : pas assez de colonnes (${columns.length})`);
        return;
      }

      const name = $(columns[0]).text().trim();
      const author = $(columns[3]).text().trim() || 'Unknown';

      if (name) {
        if (!dataSetMap.has(author)) {
          dataSetMap.set(author, []);
        }
        dataSetMap.get(author).push(name);
        factionCount++;
        console.log(`Faction ajoutée : ${name} (Auteur : ${author})`);
      } else {
        console.warn(`Ligne ${index} ignorée : nom de faction vide`);
      }
    });

    console.log(`Total : ${factionCount} factions pour ${dataSetMap.size} auteurs`);

    if (factionCount === 0) {
      console.error('Aucune faction trouvée. Vérifiez la structure HTML.');
      await fs.writeFile('debug.html', response.data);
      console.log('HTML brut sauvegardé dans debug.html pour inspection');
      return new Map();
    }

    // Étape 4 : Générer le fichier
    console.log('Génération de dataCustom.js...');
    let jsContent = 'const dataSet = new Map();\n';
    for (const [author, factionNames] of dataSetMap) {
      const escapedAuthor = author.replace(/'/g, "\\'");
      jsContent += `dataSet.set('${escapedAuthor}', ${JSON.stringify(factionNames)});\n`;
    }
    jsContent += '\nmodule.exports = dataSet;';

    // Étape 5 : Écrire le fichier
    console.log('Écriture de dataCustom.js...');
    await fs.writeFile('dataCustom.js', jsContent);
    console.log('dataCustom.js généré avec succès dans', process.cwd());
    return dataSetMap;
  } catch (error) {
    console.error('Erreur lors du scraping :', error.message);
    if (error.response) {
      console.error('Code HTTP :', error.response.status);
      console.error('Détails :', error.response.statusText);
    }
    await fs.writeFile('debug.html', response.data);
    console.log('HTML brut sauvegardé dans debug.html pour inspection');
    return new Map();
  }
}

scrapeFactions();