let factions = [
  "Avengers",
  "Spider-Verse",
  "Ultimates",
  "S.H.I.E.L.D",
  "Hydra",
  "Sinistre 6",
  "Masters of Evil",
  "Kree",
  "Steampunks",
  "Killer Plants",
  "Itty Critters",
  "Magical Girls",
  "Mega Troopers",
  "Kaiju",
  "Rock Stars",
  "Teddy Bears",
  "Grannies",
  "Explorers",
  "Vigilantes",
  "Disco Dancers",
  "Truckers",
  "Kung Fu Fighters",
  "Mermaids",
  "Teens",
  "Ancient Egyptians",
  "Cowboys",
  "Action Heroes",
  "Backtimers",
  "Extramorphs",
  "Wraithrustlers",
  "Mad scientists",
  "Vampires",
  "Giant Ants",
  "Werewolves",
  "Penguins",
  "Dinosaurs",
  "All-Stars",
]; //Déclaration du tableau qui servira de stockage de la liste des éléments
const draft = []; //Déclaration du tableau qui servira a stocker les factions tirées au hasard
//Déclaration de toutes les variables qui nous serviront à afficher le tirage dans le DOM
const title = document.getElementById("title");
const liste = document.getElementById("liste");
const nb = 14;

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

function arrayRandomConstructor(nb, place) {
  remove(place);
  if (nb > factions.length) {
    alert(
      "There are not enough factions left in stock! Click on Home to start again"
    );
  } else {
    let newh3 = document.createElement("h3"); //Pour afficher le titre
    newh3.textContent = `The ${nb} factions drawn are :`;
    if (!title.firstChild) {
      title.append(newh3);
    } else {
      title.firstChild.remove(newh3);
      title.append(newh3);
    }

    for (let i = 0; i < nb; i++) {
      draft[i] = elemAleatoire(factions); // crée un nouveau tableau aléatoire
      let newli = document.createElement("li"); //affiche chaque faction tirée au sort
      newli.textContent = draft[i];
      place.append(newli);
    }
    return draft;
  }
}
var create = document.getElementById("tournament"); //recupère l id du bouton de création
tournament.addEventListener("click", () => {
  arrayRandomConstructor(nb, liste);
  console.log(factions);
});
