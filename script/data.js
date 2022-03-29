const playersData = new Map();
playersData.set("titlePlayer1", document.getElementById("title-p1"));
playersData.set("titlePlayer2", document.getElementById("title-p2"));
playersData.set("titlePlayer3", document.getElementById("title-p3"));
playersData.set("titlePlayer4", document.getElementById("title-p4"));
playersData.set("player1", document.getElementById("player1"));
playersData.set("player2", document.getElementById("player2"));
playersData.set("player3", document.getElementById("player3"));
playersData.set("player4", document.getElementById("player4"));

const dataSet = new Map();
dataSet.set("baseSet", [
  "Zombie",
  "Aliens",
  "Ninjas",
  "Dinosaures",
  "Pirates",
  "Sorciers",
  "Petit Peuple",
  "Robots",
]);
dataSet.set("munchkin", [
  "Mages",
  "Prêtres",
  "Guerriers",
  "Nains",
  "Elfes",
  "Voleurs",
  "Halefelins",
  "Orques",
]);
dataSet.set("marvel", [
  "Avengers",
  "Spider Verse",
  "Ultimates",
  "S.H.I.E.L.D",
  "Hydra",
  "Sinistre 6",
  "Maîtres du mal",
  "Krees",
]);
dataSet.set("memePasMort", [
  "Fantômes",
  "Steampunk",
  "Plantes Carnivores",
  "Cavalerie Ours",
]);
dataSet.set("minion", ["Princesses", "Chatons", "Poneys Magiques", "Fées"]);
dataSet.set("japan", [
  "Monstrapoches",
  "Petites Magiciennes",
  "Supers Combattants",
  "Kaiju",
]);
dataSet.set("cthulhu", [
  "Grands Anciens",
  "Université Miskatonic",
  "Innsmouth",
  "Serviteurs de Cthulhu",
]);
dataSet.set("vousLAurezVoulu", [
  "Requins",
  "Mythologies Grecs",
  "Supers Héros",
  "Dragons",
  "Tornades",
]);
dataSet.set("ressemblancesF", [
  "Chevaliers des étoiles",
  "Voyageurs de L'Espace",
  "Squatteurs de Trône",
  "Changeformers",
]);
dataSet.set("generation", [
  "Rockstars",
  "Oursons",
  "Grands-Mères",
  "Explorateurs",
]);
dataSet.set("serieB", [
  "Voyageurs du temps",
  "Métamorphes",
  "Supers Espions",
  "Singes Cyborg",
]);
dataSet.set("monstreSacre", [
  "Savants Fous",
  "Vampires",
  "Fourmis Géantes",
  "Loups-Garous",
]);
dataSet.set("year70th", [
  "Justiciers",
  "Danseurs Disco",
  "Routiers",
  "Maîtres Kung-Fu",
]);
dataSet.set("vousEnVoulezEncore", [
  "Ancients Egyptiens",
  "Samouraï",
  "Cow-Boys",
  "Vikings",
]);
dataSet.set("wT1", ["Sumo", "Luchadores", "Mousquetaires", "Mounties"]);
dataSet.set("wT2", [
  "Anansi",
  "Ancients Incas",
  "Voyageurs Polynésiens",
  "Contes de Grimm",
  "Contes Russes",
]);
dataSet.set("geek", ["Geeks"]);
dataSet.set("mouton", ["Moutons"]);
dataSet.set("dreamTeam", ["Dream Team"]);
dataSet.set("penguin", ["Manchots"]);
dataSet.set("goblins", ["Gobelins"]);
dataSet.set("roundTable", ["Chevaliers de la Table Ronde"]);
