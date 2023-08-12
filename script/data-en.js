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
  "Zombies",
  "Aliens",
  "Ninjas",
  "Dinosaurs",
  "Pirates",
  "Wizards",
  "Tricksters",
  "Robots",
]);
dataSet.set("munchkin", [
  "Mages",
  "Clerics",
  "Warriors",
  "Dwarves",
  "Elves",
  "Thieves",
  "Halflings",
  "Orcs",
]);
dataSet.set("marvel", [
  "Avengers",
  "Spider-Verse",
  "Ultimates",
  "S.H.I.E.L.D",
  "Hydra",
  "Sinistre 6",
  "Masters of Evil",
  "Kree",
]);
dataSet.set("disney", [
  "Frozen",
  "Big Hero 6",
  "The Lion King",
  "Mulan",
  "Aladdin",
  "Wreck-It Ralph",
  "The Nightmare Before Christmas",
  "Beauty & the Beast",
]);
dataSet.set("memePasMort", [
  "Ghosts",
  "Steampunks",
  "Killer Plants",
  "Bear Cavalry",
]);
dataSet.set("minion", ["Princesses", "Kitty Cats", "Mythic Horses", "Fairies"]);
dataSet.set("japan", [
  "Itty Critters",
  "Magical Girls",
  "Mega Troopers",
  "Kaiju",
]);
dataSet.set("cthulhu", [
  "Elder Things",
  "Miskatonic University",
  "Innsmouth",
  "Minions of Cthulhu",
]);
dataSet.set("vousLAurezVoulu", [
  "Sharks",
  "Mythic Greeks",
  "Superheroes",
  "Dragons",
  "Tornados",
]);
dataSet.set("ressemblancesF", [
  "Astroknights",
  "Star Roamers",
  "Ignobles",
  "Changerbots",
]);
dataSet.set("generation", [
  "Rock Stars",
  "Teddy Bears",
  "Grannies",
  "Explorers",
]);
dataSet.set("serieB", [
  "Time Travelers",
  "Shapeshifters",
  "Supers Spies",
  "Cyborg Apes",
]);
dataSet.set("monstreSacre", [
  "Mad scientists",
  "Vampires",
  "Giant Ants",
  "Werewolves",
]);
dataSet.set("year70th", [
  "Vigilantes",
  "Disco Dancers",
  "Truckers",
  "Kung Fu Fighters",
]);
dataSet.set("vousEnVoulezEncore", [
  "Ancient Egyptians",
  "Samouraï",
  "Cow-Boys",
  "Vikings",
]);
dataSet.set("wT1", ["Sumo", "Luchadores", "Musketeers", "Mounties"]);
dataSet.set("wT2", [
  "Anansi Tales",
  "Ancient Incas",
  "Polynesian Voyagers",
  "Grimms'Fairy Tales",
  "Russian Fairy Tales",
]);
dataSet.set("10th", ["Skeletons", "Mermaids", "World Champs"]);
dataSet.set("geek", ["Geeks"]);
dataSet.set("mouton", ["Sheep"]);
dataSet.set("dreamTeam", ["All-Stars"]);
dataSet.set("penguin", ["Penguins"]);
dataSet.set("goblins", ["Goblins"]);
dataSet.set("roundTable", ["Knights of the Round Table"]);
