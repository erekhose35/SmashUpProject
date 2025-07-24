// Désactive le bouton "Create my list" et toutes les checkbox après le premier clic, applique un effet visuel
document.addEventListener('DOMContentLoaded', function () {
  const createBtn = document.getElementById('create');
  const randomBtn = document.getElementById('random');
  const noPickBtn = document.getElementById('no-pick');
  const restartBtn = document.getElementById('restart');

  // Met les boutons random, no-pick et restart en gris par défaut
  if (randomBtn) {
    randomBtn.classList.remove('btn-success');
    randomBtn.classList.add('btn-secondary');
    randomBtn.disabled = true;
  }
  if (noPickBtn) {
    noPickBtn.classList.remove('btn-success');
    noPickBtn.classList.add('btn-secondary');
    noPickBtn.disabled = true;
  }
  if (restartBtn) {
    restartBtn.classList.remove('btn-outline-warning');
    restartBtn.classList.add('btn-secondary');
    restartBtn.disabled = true;
  }

  if (createBtn) {
    createBtn.addEventListener(
      'click',
      function () {
        // Désactive le bouton
        createBtn.disabled = true;
        createBtn.classList.remove('btn-primary');
        createBtn.classList.add('btn-secondary');

        // Active les boutons random et no-pick et passe en vert
        if (randomBtn) {
          randomBtn.disabled = false;
          randomBtn.classList.remove('btn-secondary');
          randomBtn.classList.add('btn-success');
        }
        if (noPickBtn) {
          noPickBtn.disabled = false;
          noPickBtn.classList.remove('btn-secondary');
          noPickBtn.classList.add('btn-success');
        }
        // Active le bouton restart et remet sa couleur warning
        if (restartBtn) {
          restartBtn.disabled = false;
          restartBtn.classList.remove('btn-secondary');
          restartBtn.classList.add('btn-outline-warning');
        }

        // Désactive toutes les checkbox du formulaire
        const form = createBtn.closest('form');
        if (form) {
          const checkboxes = form.querySelectorAll('input[type="checkbox"]');
          checkboxes.forEach((cb) => (cb.disabled = true));
        }
      },
      { once: true }
    );
  }

  // Bouton pour recharger la page
  if (restartBtn) {
    restartBtn.addEventListener('click', function () {
      window.location.reload();
    });
  }
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  });
  // Empêche le comportement par défaut de la touche "Enter" dans les formulaires
});

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
const title = document.getElementById('title');
const liste = document.getElementById('liste');

//fonction de suppression aléatoire d un element d un tableau, cet élément sera retourné par la fonction
function elemAleatoire(tab) {
  const randomIndex = Math.floor(Math.random() * tab.length);
  return tab.splice(randomIndex, 1)[0];
}

function arrayRandomConstructor(nb, place) {
  remove(place);
  for (let i = 0; i < nb; i++) {
    draft[i] = elemAleatoire(factions); // crée un nouveau tableau aléatoire
    let newli = document.createElement('li'); //affiche chaque faction tirée au sort
    newli.textContent = draft[i];
    place.append(newli);
  }
  return draft;
}

function displayPlayers(nb, place) {
  let newh3 = document.createElement('h3'); //Pour afficher le numero du joueur
  newh3.textContent = `List of factions for player ${nb} :`;
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
  let checkItems = document.querySelectorAll('fieldset label');
  for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].disabled = !checkBoxes[i].disabled;
    checkItems[i].className = 'inactive';
  }
}

let selectAll = document.getElementById('selectAll');
selectAll.addEventListener('click', () => {
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = true;
  }
});

var create = document.getElementById('create'); //recupère l id du bouton de création
create.addEventListener('click', () => {
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
  document.getElementById('create').classList.remove('btn-blue');
  document.getElementById('create').classList.add('button');
  create.innerHTML = 'List created';
  selectAll.classList.remove('btn-blue');
  selectAll.classList.add('button');
  disabledCheckBox();
  document.getElementById('create').disabled = true;
  selectAll.disabled = true;
  console.log(factions);
});

let random = document.getElementById('random'); //recupère l id du bouton de lancement du randomizer
random.addEventListener('click', (event) => {
  let nb = document.getElementById('nb').value; //Recupere le nb de faction désiré
  if (factions.length === 0) {
    alert(
      'You must first select the factions of the randomizer! To do this, press the "Create my list" button.'
    );
  } else if (nb > factions.length) {
    alert(
      'There are not enough factions left in stock! Click on start a new draft'
    );
  } else {
    if (isNaN(nb) || nb <= 0) {
      //Vérification de la validité de nb
      alert('You must enter a positive number!!!');
    } else {
      let newh3 = document.createElement('h3'); //Pour afficher le titre
      newh3.textContent = `The ${nb} factions drawn are :`;
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

let overwritten = document.querySelectorAll('.overwritten');
let players = document.getElementById('players');
let nbFactions = document.getElementById('nb-faction');
let noPick = document.getElementById('no-pick');
players.value = 'autre';
//sert a donner une fausse valeur afin de n'avoir aucune réponse selectionnée par défaut
noPick.addEventListener('click', (event) => {
  // to remove
  event.preventDefault();
  if (factions.length === 0) {
    alert(
      'You must first select the factions of the randomizer! To do this, press the "Create my list" button.'
    );
  } else if (nb > factions.length) {
    alert(
      'There are not enough factions left in stock! Click on start a new draft'
    );
  } else {
    let nbPlayers = parseInt(players.value);

    if (isNaN(nbPlayers)) {
      alert('Choose a player number from the drop-down menu');
    } else {
      for (let j = 1; j <= 4; j++) {
        console.log('remove');
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

let reload = document.getElementById('reload');
reload.addEventListener('click', () => {
  document.location.reload();
});
