const players = document.querySelector('.players ');
const popupPlayer = document.querySelector('.popupPlayer');
const global = document.querySelector('.global');
const divplayers = document.querySelector('.div-players');


let squad;
let squadData = {
    squadName: '',
    formation: '',
    positions: {}
};
if (localStorage.SquadData != null) {
    squad = JSON.parse(localStorage.SquadData);
}
else {
    squad = [];
}


const api = "players.json";
async function playersAPI() {
    const respond = await fetch(api);
    const data = await respond.json()
    localStorage.setItem('playersData', JSON.stringify(data));

}
const data = JSON.parse(localStorage.getItem('playersData'));
window.onload = function () {

    playersAPI();



};


function affich() {
    let playersAffich = document.querySelector(".playersAffich ");
    playersAffich.innerHTML = ``;
    for (let i = 0; i < data.length; i++) {

        const playerCard = `
        <div >
          <div class="card pos"  >
              <div class="sup">
                  <div class="img">
                      <p><img src="${data[i].photo}" alt="Image du joueur"></p>
                  </div>
                  <div class="supInfo">
                      <p>${data[i].rating}</p> 
                      <p>${data[i].position}</p>
                      <div class="drapeau">
                          <p><img src="${data[i].flag}" alt="Drapeau du pays"></p>
                          <p><img src="${data[i].logo}" alt="Logo du club"></p>
                      </div>
                  </div>
              </div>
              <div class="inf">
        <div class="nom-player">
        <p>${data[i].name}</p>
      </div>
              <div class="score">
                  <div class="left">
                      <p>${data[i].pace + "  "}<span>PAC</span></p> 
                      <p>${data[i].shooting + "   "}<span>SHOT</span></p>
                      <p class="supprimer"><i class="fa-solid fa-trash" style="color: #00000;"></i></p>
        
                  </div>
                  <div class="right">
                      <p>${data[i].dribbling + "  "} <span>DRI</span></p> 
                      <p>${data[i].defending + " "}<span>DEF</span></p>
                      <p class="editer"><i class="fa-solid fa-gears" style="color: #00000;"></i></p>
    
                  </div>
              </div>
          </div>
           
</div>
      `;


        playersAffich.innerHTML += playerCard;

    }
}



affich();


function selected() {
    const terrainDivs = document.querySelectorAll('.terrain div');
    const playersAffich = document.querySelector(".global .playersAffich");
    const playersAffih = document.querySelector(".global .playersAffich");
    const cards = document.querySelectorAll('.card');

    let selectedTerrainDiv = null;

    terrainDivs.forEach(terrainDiv => {
        terrainDiv.addEventListener('click', () => {

            selectedTerrainDiv = terrainDiv;
            playersAffich.style.display = 'flex';
            document.querySelector('h3').style.display='block'

        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (selectedTerrainDiv) {
                const position = selectedTerrainDiv.classList.value;
                let joueurs = data.filter(joueur => joueur.position === position);
                if (!squadData.positions[position]) {
                    squadData.positions[position] = [];
                }

                //REMPLIR SQUADDATA
                squadData.positions[position] = card.querySelector('.nom-player p').textContent;


                const cardImage = card.querySelector('img').cloneNode(true);
                selectedTerrainDiv.innerHTML = '';
                selectedTerrainDiv.appendChild(cardImage);
                playersAffich.style.display = 'none';
                document.querySelector('h3').style.display='none'
            } else {
                alert("Veuillez d'abord sélectionner une zone sur le terrain !");
            }
        });

    });

    terrainDivs.forEach(
        div => {
            div.addEventListener('click', () => {
                div.innerHTML = '';
                div.innerHTML = ` <i class="fa-solid fa-user-plus fa-2x" style="color: #e5ad15;"></i>`;
            })
        }
    )
}

selected();

//la fonction de submit le squad
function submit() {

    let formation = document.querySelector("#formation").value;
    let nameSquad = document.querySelector("#name-squad").value;
    let cont = Object.values(squadData.positions).length;
    if (nameSquad.trim() == "") {
        alert("Veuiller remplir le nom de squad!");
    }
    else if (formation ==0) {
        alert("veuillez choisir une formation");
    }

    // else if (cont != 11) {
    //     alert("veuiller remplir tout les positions!")
    // }
    squadData.squadName = nameSquad;
    switch (formation) {
        case '1':
            squadData.formation = "4-4-3";  
            break;
        case '2':
            squadData.formation = "4-4-2";
            break;
        case '3':
            squadData.formation = "3-5-2";
            break;
        default:
            squadData.formation = "Formation inconnue"; 
            break;
    }
    
  
    squad.push(squadData);
    localStorage.setItem('SquadData', JSON.stringify(squad));
    squadData = {};
    document.querySelector("#formation").value = 0;
    document.querySelector("#name-squad").value = "";
}

//burger menu

const burgerMenu = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('.mobile-menu');

burgerMenu.addEventListener('click', (e) => {
    e.stopPropagation();  
    mobileMenu.classList.toggle('active'); 
});

window.addEventListener('click', (e) => {
    if (!burgerMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active'); 
    }
});

//LA FONCTION DE RECHERCHE
function recherche() {
    const searchTerm = document.querySelector('input[name="search"]').value.toLowerCase();  
    const players = document.querySelectorAll(".player-item");  // Sélectionner toutes les entrées de la liste de joueurs
    
    // Parcourir chaque élément de la liste de joueurs
    players.forEach(player => {
        const playerName = player.textContent.toLowerCase();  // Nom du joueur en minuscules pour comparaison
        if (playerName.includes(searchTerm)) {
            player.style.display = "";  // Affiche l'élément si le nom contient le texte recherché
        } else {
            player.style.display = "none";  // Cache l'élément si le nom ne contient pas le texte recherché
        }
    });
}
