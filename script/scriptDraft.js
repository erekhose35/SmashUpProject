//class qui sert a stocker les id de chaque boite et le tableau de faction qu elle contient
//elle sert surtout à 'lier' les checkbox aux tableaux, pour savoir lesquels injectés
class Box {
  constructor(id, array) {
    this.id = id;
    this.array = array;
  } //méthode permettant d'ajouter le tableau de factions à la variable faction
  constructFaction(factions) {
    return factions.concat(this.array);
  }
}

let factions = []; //Déclaration du tableau qui servira de stockage de la liste des éléments
const draft = []; //Déclaration du tableau qui servira a stocker les factions tirées au hasard
//Déclaration de toutes les variables qui nous serviront à afficher le tirage dans le DOM
const title = document.getElementById("title");
const liste = document.getElementById("liste");

//fonction de suppression aléatoire d un element d un tableau, cet élément sera retourné par la fonction
function elemAleatoire(tab) {
  const randomIndex = Math.floor(Math.random() * tab.length);
  return tab.splice(randomIndex, 1)[0];
}

function arrayRandomConstructor(nb, place) {
  remove(place);
  for (let i = 0; i < nb; i++) {
    draft[i] = elemAleatoire(factions); // crée un nouveau tableau aléatoire
    let newli = document.createElement("li"); //affiche chaque faction tirée au sort
    newli.textContent = draft[i];
    place.append(newli);
  }
  return draft;
}

function displayPlayers(nb, place) {
  let newh3 = document.createElement("h3"); //Pour afficher le numero du joueur
  newh3.textContent = `Le joueur ${nb} joue avec les factions :`;
  if (!place.firstChild) {
    place.append(newh3);
  } else {
    place.firstChild.replaceWith(newh3);
  }
}
function remove(place) {
  //Pour effacer les lignes ajoutées précédemment
  if (place.firstChild) {
    while (place.firstChild) {
      place.removeChild(place.firstChild);
    }
  }
}
function disabledCheckBox() {
  //pour griser la zone checkbox quanla liste est créée
  let checkBoxes = document.querySelectorAll('fieldset input[type="checkbox"]');
  let checkItems = document.querySelectorAll("fieldset label");
  for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].disabled = !checkBoxes[i].disabled;
    checkItems[i].className = "inactive";
  }
}

let selectAll = document.getElementById("selectAll");
selectAll.addEventListener("click", () => {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = true;
  }
});

var create = document.getElementById("create"); //recupère l id du bouton de création
create.addEventListener("click", () => {
  factions = []; //réinitialisation a chaque clique
  var checkboxes = document.querySelectorAll('input[type="checkbox"]'); //recup de toutes les checkbox
  for (let i = 0; i < checkboxes.length; i++) {
    //verif que checkbox cochée
    let type = checkboxes[i];
    let arrayData = type.id.slice(3).charAt(0).toLowerCase() + type.id.slice(4);
    if (checkboxes[i].checked && dataSet.has(arrayData)) {
      factions = new Box(type.id, dataSet.get(arrayData)).constructFaction(
        factions
      );
    }
  }
  document.getElementById("create").classList.remove("btn-blue");
  document.getElementById("create").classList.add("button");
  create.innerHTML = "Liste créée";
  selectAll.classList.remove("btn-blue");
  selectAll.classList.add("button");
  disabledCheckBox();
  document.getElementById("create").disabled = true;
  selectAll.disabled = true;
  console.log(factions);
});

let random = document.getElementById("random"); //recupère l id du bouton de lancement du randomizer
random.addEventListener("click", (event) => {
  let nb = document.getElementById("nb").value; //Recupere le nb de faction désiré
  if (factions.length === 0) {
    alert(
      'Il faut d\'abord selectionner les factions du randomizer! Pour cela il faut appuyer sur le bouton "Créer ma liste"'
    );
  } else if (nb > factions.length) {
    alert(
      "Il n'y a plus assez de factions en stock! Cliquez sur recommencer un nouveau draft"
    );
  } else {
    if (isNaN(nb) || nb <= 0) {
      //Vérification de la validité de nb
      alert("Il faut entrer un nombre positif!!!");
    } else {
      let newh3 = document.createElement("h3"); //Pour afficher le titre
      newh3.textContent = `Les ${nb} factions tirées au sort sont :`;
      if (!title.firstChild) {
        title.append(newh3);
      } else {
        title.firstChild.remove(newh3);
        title.append(newh3);
      }
    }
    arrayRandomConstructor(nb, liste);
  }
  event.preventDefault();
});

let overwritten = document.querySelectorAll(".overwritten");
let players = document.getElementById("players");
let nbFactions = document.getElementById("nb-faction");
let noPick = document.getElementById("no-pick");
players.value = "autre";
//sert a donner une fausse valeur afin de n'avoir aucune réponse selectionnée par défaut
noPick.addEventListener("click", (event) => {
  // to remove
  event.preventDefault();
  if (factions.length === 0) {
    alert(
      'Tu dois d abord sélectionner les factions présentes dans ton randomizer! Pour le faire, selectionne et valide en appuyant sur le bouton "Créer ma liste".'
    );
  } else if (nb > factions.length) {
    alert(
      "Il n'y a pas assez de factions en stock, clique sur 'Recommencer un nouveau draft' afin de recréer votre liste."
    );
  } else {
    let nbPlayers = parseInt(players.value);

    if (isNaN(nbPlayers)) {
      alert("Choisi un nombre de joueur dans le menu déroulant");
    } else {
      for (let j = 1; j <= 4; j++) {
        console.log("remove");
        remove(playersData.get(`titlePlayer${j}`));
        remove(playersData.get(`player${j}`));
      }
      for (let i = 1; i <= nbPlayers; i++) {
        console.log(playersData.get(`titlePlayer${i}`));
        console.log(playersData.get(`player${i}`));
        displayPlayers(i, playersData.get(`titlePlayer${i}`));
        arrayRandomConstructor(nbFactions.value, playersData.get(`player${i}`));
      }
    }
  }
  event.preventDefault();
});

let reload = document.getElementById("reload");
reload.addEventListener("click", () => {
  document.location.reload();
});
