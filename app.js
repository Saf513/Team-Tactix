const players = document.querySelector('.players ');
const popupPlayer = document.querySelector('.popupPlayer');
const global = document.querySelector('.global');
const divplayers = document.querySelector('.div-players .card');


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


// function selected() {
//     const terrainDivs = document.querySelectorAll('.terrain div');
//     const playersAffich = document.querySelector(".playersAffich");
//     const global = document.querySelector('.global');
//     let joueurs = []; 
//     let selectedTerrainDiv = null;

//     terrainDivs.forEach(terrainDiv => {
//         terrainDiv.addEventListener('click', () => {
//             const position = terrainDiv.classList.value;

//             joueurs = data.filter(joueur => joueur.position === position);

//             playersAffich.innerHTML = '';

//             joueurs.forEach(joueur => {
//                 const playerCard = `
//                     <div class="card">
//                         <div class="sup">
//                             <div class="img">
//                                 <p><img src="${joueur.photo}" alt="Image du joueur"></p>
//                             </div>
//                             <div class="supInfo">
//                                 <p>${joueur.rating}</p>
//                                 <p>${joueur.position}</p>
//                                 <div class="drapeau">
//                                     <p><img src="${joueur.flag}" alt="Drapeau du pays"></p>
//                                     <p><img src="${joueur.logo}" alt="Logo du club"></p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="inf">
//                             <div class="nom-player">
//                                 <p>${joueur.name}</p>
//                             </div>
//                             <div class="score">
//                                 <div class="left">
//                                     <p>${joueur.pace} <span>PAC</span></p>
//                                     <p>${joueur.shooting} <span>SHOT</span></p>
//                                 </div>
//                                 <div class="right">
//                                     <p>${joueur.dribbling} <span>DRI</span></p>
//                                     <p>${joueur.defending} <span>DEF</span></p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//                 playersAffich.innerHTML += playerCard;
//             });

//             selectedTerrainDiv = terrainDiv;
//             playersAffich.style.display = 'flex';
//             document.querySelector('h3').style.display = 'block';
//             global.classList.add('blurred');
//         });
//     });
//     playersAffich.addEventListener('click', (event) => {
//         if (event.target.closest('.card')) {
//             const card = event.target.closest('.card');
//             console.log('Carte sélectionnée:', card);

//             if (selectedTerrainDiv) {
//                 const position = selectedTerrainDiv.classList.value;
//                 const playerName = card.querySelector('.nom-player p').textContent;

//                 if (!squadData.positions[position]) {
//                     squadData.positions[position] = [];
//                 }
//                 squadData.positions[position] = playerName;

//                 const cardImage = card.querySelector('img').cloneNode(true);
//                 selectedTerrainDiv.innerHTML = '';
//                 selectedTerrainDiv.appendChild(cardImage);
//                 playersAffich.style.display = 'none';
//                 document.querySelector('h3').style.display = 'none';
//                 global.classList.remove('blurred');
//             } else {
//                 alert("Veuillez d'abord sélectionner une zone sur le terrain !");
//             }
//         }
//     });


//     terrainDivs.forEach(div => {
//         div.addEventListener('click', () => {
//             div.innerHTML = ''; // Vider la zone
//             div.innerHTML = `<i class="fa-solid fa-user-plus fa-2x" style="color: #e5ad15;"></i>`; // Réinitialiser l'icône
//         });
//     });
// }
function selected() {
    const terrainDivs = document.querySelectorAll('.terrain div');
    const playersAffich = document.querySelector(".playersAffich");
    const global = document.querySelector('.global-terrain');
    let joueurs = [];
    let selectedTerrainDiv = null;
    let playersOnField = {}; 

    terrainDivs.forEach(terrainDiv => {
        terrainDiv.addEventListener('click', () => {
            const position = terrainDiv.classList.value;

            if (playersOnField[position]) {
                const modal = createPlayerModificationModal(playersOnField[position], position);
                document.body.appendChild(modal);
            } else {
                // Afficher les joueurs disponibles pour cette position
                joueurs = data.filter(joueur => joueur.position === position && !isPlayerOnField(joueur.name));
                playersAffich.innerHTML = '';

                joueurs.forEach(joueur => {
                    const playerCard = `
                        <div class="card">
                            <div class="sup">
                                <div class="img">
                                    <p><img src="${joueur.photo}" alt="Image du joueur"></p>
                                </div>
                                <div class="supInfo">
                                    <p>${joueur.rating}</p>
                                    <p>${joueur.position}</p>
                                    <div class="drapeau">
                                        <p><img src="${joueur.flag}" alt="Drapeau du pays"></p>
                                        <p><img src="${joueur.logo}" alt="Logo du club"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="inf">
                                <div class="nom-player">
                                    <p>${joueur.name}</p>
                                </div>
                                <div class="score">
                                    <div class="left">
                                        <p>${joueur.pace} <span>PAC</span></p>
                                        <p>${joueur.shooting} <span>SHOT</span></p>
                                    </div>
                                    <div class="right">
                                        <p>${joueur.dribbling} <span>DRI</span></p>
                                        <p>${joueur.defending} <span>DEF</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    playersAffich.innerHTML += playerCard;
                });

                selectedTerrainDiv = terrainDiv;
                playersAffich.style.display = 'flex';
                document.querySelector('h3').style.display = 'block';
                global.classList.add('blurred');
            }
        });
    });

    // Quand un joueur est sélectionné dans la liste
    playersAffich.addEventListener('click', (event) => {
        if (event.target.closest('.card')) {
            const card = event.target.closest('.card');
            console.log('Carte sélectionnée:', card);

            if (selectedTerrainDiv) {
                const position = selectedTerrainDiv.classList.value;
                const playerName = card.querySelector('.nom-player p').textContent;

                // Empêcher l'ajout du même joueur à la même position
                if (playersOnField[position]) {
                    alert('Un joueur est déjà placé sur cette position!');
                    return;
                }

                // Ajouter le joueur à cette position
                playersOnField[position] = {
                    name: playerName,
                    photo: card.querySelector('img').src,
                    position: position
                };

                // Ajouter l'image du joueur sur le terrain
                const cardImage = card.querySelector('img').cloneNode(true);
                selectedTerrainDiv.innerHTML = '';
                selectedTerrainDiv.appendChild(cardImage);

                // Mettre à jour la liste des joueurs pour ne pas réafficher ce joueur
                joueurs = joueurs.filter(joueur => joueur.name !== playerName);

                // Masquer la liste des joueurs
                playersAffich.style.display = 'none';
                document.querySelector('h3').style.display = 'none';
                global.classList.remove('blurred');
            } else {
                alert("Veuillez d'abord sélectionner une zone sur le terrain !");
            }
        }
    });

    // Fonction pour vérifier si un joueur est déjà sur le terrain
    function isPlayerOnField(playerName) {
        return Object.values(playersOnField).some(player => player.name === playerName);
    }

    function createPlayerModificationModal(player, position) {
        const modal = document.querySelector('.modal');
        modal.style.display='block'
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Modifier ou Supprimer le joueur</h2>
                <div class="player-info">
                    <p><img src="${player.photo}" alt="Image du joueur"></p>
                    <p>Nom: ${player.name}</p>
                    <p>Position: ${player.position}</p>
                </div>
                <button class="modify" data-position="${position}">Modifier</button>
                <button class="remove" data-position="${position}">Supprimer</button>
                <button class="close">Fermer</button>
            </div>
        `;

        // Modifier le joueur (dans le cas où vous voulez le mettre à jour)
        modal.querySelector('.modify').addEventListener('click', () => {
            alert('Modification du joueur');
            modal.remove();
        });

        // Supprimer le joueur
        modal.querySelector('.remove').addEventListener('click', () => {
            // Supprimer le joueur du terrain et réinitialiser la zone
            delete playersOnField[position];
            selectedTerrainDiv.innerHTML = '<i class="fa-solid fa-user-plus fa-2x" style="color: #e5ad15;"></i>';
            modal.remove();
        });

        // Fermer la modale
        modal.querySelector('.close').addEventListener('click', () => {
            modal.remove();
        });

        return modal;
    }
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
    else if (formation == 0) {
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

