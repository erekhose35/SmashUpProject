let factions = [
  "Mages",
  "Clerics",
  "Warriors",
  "Dwarves",
  "Elves",
  "Thieves",
  "Halflings",
  "Orcs",
  "Astroknights",
  "Star Roamers",
  "Ignobles",
  "Changerbots",
  "Anansi Tales",
  "Ancient Incas",
  "Polynesian Voyagers",
  "Grimms'Fairy Tales",
  "Russian Fairy Tales",
  "Sumo",
  "Luchadores",
  "Musketeers",
  "Mounties",
  "Skeletons",
  "Mermaids",
  "World Champs",
  "Sheep",
  "Goblins",
  "Teens",
  "Ancient Egyptians",
  "Samouraï",
  "Cowboys",
  "Vikings",
  "Action Heroes",
  "Backtimers",
  "Extramorphs",
  "Wraithrustlers",
  "Mad scientists",
  "Penguins",
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
