let factions = [
  "Dinosaurs",
  "Miskatonic University",
  "Steampunks",
  "Killer Plants",
  "Wizards",
  "Cyborg Apes",
  "Shapeshifters",
  "Super Spies",
  "Time Travelers",
  "Giant Ants",
  "Mad Scientists",
  "Elves",
  "Warriors",
  "Dragons",
  "Mythic Greeks",
  "Sharks",
  "Superheroes",
  "Tornados",
  "Changerbots",
  "Star Roamers",
  "Teddy Bears",
  "Explorers",
  "Itty Critters",
  "Truckers",
  "Luchadors",
  "Mounties",
  "Musketeers",
  "Sumo Wrestlers",
  "Russian Fairy Tales",
  "Avengers",
  "Hydra",
  "Sinister Six",
  "Mulan",
  "Mermaids",
  "Extramorphs",
  "Wraithrustlers",
];
let customGroup = [
  "Archaeologists",
  "Avatar: the Last Wind Worker",
  "Babies",
  "Barbarians",
  "Bards",
  "Boxers",
  "Brewers",
  "Chess",
  "Dante's Inferno",
  "Doctor Who",
  "Dream Warriors",
  "Duelists",
  "Energy Beings",
  "Fantasy Heroes",
  "Fast Food",
  "Grampires",
  "Jedi Order",
  "Jurassic Park",
  "Liches",
  "Mega Man",
  "Misfits",
  "Mountain Dwarves",
  "Narwhals",
  "Necrons",
  "Oozes",
  "Ori",
  "Pandas",
  "Pokemon",
  "Pop Stars",
  "Psychics",
  "Slimes",
  "Space Commandos",
  "Sphinxes",
  "Streets of Fire",
  "Terminators",
  "Wretched Pigmen",
]; //Déclaration du tableau qui servira de stockage de la liste des éléments
const draft = []; //Déclaration du tableau qui servira a stocker les factions tirées au hasard
const draftCustom = [];
//Déclaration de toutes les variables qui nous serviront à afficher le tirage dans le DOM
const title = document.getElementById("title");
const liste = document.getElementById("liste");
const titleCustom = document.getElementById("title-custom");
const listCustom = document.getElementById("list-custom");
const nb = 10;
const vanillaMessage = " Official factions : ";
const customMessage = " Custom factions : ";

function remove(place) {
  //Pour effacer les lignes ajoutées précédemment
  if (place.firstChild) {
    while (place.firstChild) {
      place.removeChild(place.firstChild);
    }
  }
}

function elemAleatoire(tab) {
  const randomIndex = Math.floor(Math.random() * tab.length);
  return tab.splice(randomIndex, 1)[0];
}

function arrayRandomConstructor(nb, place, arrayFactions, message) {
  remove(place);
  if (nb > arrayFactions.length) {
    alert(
      "There are not enough factions left in stock! Click on Home to start again"
    );
  } else {
    let newh3 = document.createElement("h3"); //Pour afficher le titre
    newh3.textContent = nb + message;
    if (!place.firstChild) {
      place.append(newh3);
    } else {
      place.firstChild.remove(newh3);
      place.append(newh3);
    }

    for (let i = 0; i < nb; i++) {
      draft[i] = elemAleatoire(arrayFactions); // crée un nouveau tableau aléatoire
      let newli = document.createElement("li"); //affiche chaque faction tirée au sort
      newli.textContent = draft[i];
      place.append(newli);
    }
    return draft;
  }
}
var create = document.getElementById("tournament"); //recupère l id du bouton de création
tournament.addEventListener("click", () => {
  arrayRandomConstructor(nb, liste, factions, vanillaMessage);
  arrayRandomConstructor(nb, listCustom, customGroup, customMessage);
  console.log(factions);
});
