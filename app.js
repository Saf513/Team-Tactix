const players = document.querySelector('.players');
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

function selected() {
    const terrainDivs = document.querySelectorAll('.terrain div');
    const playersAffich = document.querySelector(".playersAffich");
    const global = document.querySelector('.global-terrain');
    let joueurs = [];
    let selectedTerrainDiv = null;
    let playersOnField = {};

    terrainDivs.forEach(terrainDiv => {
        terrainDiv.addEventListener('click', () => {
            global.classList.add('blurred');
            const position = terrainDiv.classList.value;
            console.log(position)
            console.log(playersOnField[position]);
            if (playersOnField[position]) {
                console.log(playersOnField[position])
                const modal = createPlayerModificationModal(playersOnField[position], position);
                document.body.appendChild(modal);
            } else {

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
                global.classList.add('blurred');


            }
        });
    });

    // Écouteur de clic global pour fermer playersAffich quand on clique en dehors de la zone
    // window.addEventListener('click', (e) => {
    //     // Vérifie si le clic est en dehors de `playersAffich` et `terrainDivs`
    //     if (!playersAffich.contains(e.target) && !Array.from(terrainDivs).some(terrainDiv => terrainDiv.contains(e.target))) {
    //         playersAffich.style.display = 'none';
    //         global.classList.remove('blurred');
    //     }
    // });

    playersAffich.addEventListener('click', (event) => {
        global.classList.remove('blurred');

        if (event.target.closest('.card')) {
            const card = event.target.closest('.card');

            if (selectedTerrainDiv) {
                const position = selectedTerrainDiv.classList.value;
                const playerName = card.querySelector('.nom-player p').textContent;

                // Enregistrez les informations du joueur dans playersOnField
                playersOnField[position] = {
                    name: playerName,
                    photo: card.querySelector('img').src,
                    position: position,
                    rating: card.querySelector('.supInfo p').textContent, // Exemple, vous pouvez ajouter plus d'infos si nécessaire
                    pace: card.querySelector('.score .left p').textContent, // Exemple
                    shooting: card.querySelector('.score .left p').nextElementSibling.textContent, // Exemple
                    dribbling: card.querySelector('.score .right p').textContent, // Exemple
                    defending: card.querySelector('.score .right p').nextElementSibling.textContent // Exemple
                };

                // Ajoutez ces informations à squadData.positions
                squadData.positions[position] = playersOnField[position];

                const cardImage = card.querySelector('img').cloneNode(true);
                selectedTerrainDiv.innerHTML = '';
                selectedTerrainDiv.appendChild(cardImage);

                joueurs = joueurs.filter(joueur => joueur.name !== playerName);

                playersAffich.style.display = 'none';
                global.classList.remove('blurred');
            } else {
                alert("Veuillez d'abord sélectionner une zone sur le terrain !");
            }
        }
    });

    function isPlayerOnField(playerName) {
        return Object.values(playersOnField).some(player => player.name === playerName);
    }

    function createPlayerModificationModal(player, position) {
        const modal = document.querySelector('.modal');
        const global = document.querySelector('.global-terrain');
        global.classList.add('blurred');

        const pop = `
            <div class="modal-content">
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

        modal.innerHTML = pop;
        modal.style.display = 'block';

        modal.querySelector('.modify').addEventListener('click', () => {
            global.classList.remove('blurred');
            const position = modal.querySelector('.modify').dataset.position;
            const player = playersOnField[position];
            if (player) {
                // Créer un modal de sélection des joueurs disponibles à remplacer
                const modalContent = document.createElement('div');
                modalContent.classList.add('modal-players');
                const availablePlayers = data.filter(joueur => joueur.position === player.position && !Object.values(playersOnField).some(p => p.name === joueur.name));
        
                availablePlayers.forEach(player => {
                    const playerCard = `
                        <div class="card">
                            <div class="sup">
                                <div class="img">
                                    <p><img src="${player.photo}" alt="Image du joueur"></p>
                                </div>
                                <div class="supInfo">
                                    <p>${player.rating}</p>
                                    <p>${player.position}</p>
                                </div>
                            </div>
                            <div class="inf">
                                <div class="nom-player">
                                    <p>${player.name}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    modalContent.innerHTML += playerCard;
                });
        
                modal.querySelector('.modal-content').appendChild(modalContent);
        
                // Modal pour sélectionner un nouveau joueur
                modalContent.querySelectorAll('.card').forEach(card => {
                    card.addEventListener('click', () => {
                        const selectedPlayerName = card.querySelector('.nom-player p').textContent;
        
                        // Remplacer le joueur dans la position sélectionnée
                        const selectedPlayer = availablePlayers.find(p => p.name === selectedPlayerName);
                        if (selectedPlayer) {
                            playersOnField[position] = selectedPlayer;
        
                            // Mettre à jour l'image du terrain avec la photo du nouveau joueur
                            selectedTerrainDiv.innerHTML = `<img src="${selectedPlayer.photo}" alt="Image du joueur">`;
        
                            // Fermer le modal
                            modal.style.display = 'none';
                            global.classList.remove('blurred');
                        }
                    });
                });
            }
        });
        

        modal.querySelector('.remove').addEventListener('click', () => {
            global.classList.remove('blurred');
            const position = modal.querySelector('.remove').dataset.position;  // Récupérer la position depuis le dataset du bouton "Supprimer"
            
            // Supprimer le joueur de playersOnField
            delete playersOnField[position];
        
            // Sélectionner toutes les divs du terrain
            const terrainDivs = document.querySelectorAll('.terrain div');
            
            // Trouver la div correspondant à la position
            const selectedTerrainDiv = Array.from(terrainDivs).find(div => div.classList.contains(position));
        
            if (selectedTerrainDiv) {
                // Remplacer le contenu HTML de la div par l'icône d'ajout et la position
                selectedTerrainDiv.innerHTML = `
                    <i class="fa-solid fa-user-plus fa-2x" style="color: #e5ad15;"></i>
                    <span>${position}</span>
                `;
            }
        
            // Fermer le modal
            modal.style.display = 'none';
        });
        

        modal.querySelector('.close').addEventListener('click', () => {
            global.classList.remove('blurred');

            modal.style.display = 'none';
        });

        return modal;
    }

   
}

selected();

function submit() {
    let formation = document.querySelector("#formation").value;
    let nameSquad = document.querySelector("#name-squad").value;
    let cont = Object.values(squadData.positions).length; // Vérifie le nombre de joueurs dans positions

    // Vérifie si le nom de l'équipe est vide ou si la formation est vide
    if (nameSquad.trim() == "") {
        alert("Veuiller remplir le nom de squad!");
    } else if (formation == 0) {
        alert("Veuillez choisir une formation");
    } else if (cont !== 11) {
        alert("Veuillez remplir toutes les positions avec des joueurs !");
    } else {
        squadData.squadName = nameSquad;

        // Définition de la formation en fonction de la sélection
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

        // Ajout de l'équipe dans le tableau squad
        squad.push(squadData);

        // Sauvegarde des données dans localStorage
        localStorage.setItem('SquadData', JSON.stringify(squad));

        // Réinitialisation de squadData
        squadData = {};
        document.querySelector("#formation").value = 0;
        document.querySelector("#name-squad").value = "";
    }
}


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
function annuler(){
    const terrainDivs = document.querySelectorAll('.terrain div');
   terrainDivs.forEach(div=>()=>{
    div.innerHTML='';
    div.innerHTML=`<i class="fa-solid fa-user-plus fa-2x" style="color: #e5ad15;"></i>
     <span>RB</span>`;
   })

}

window.addEventListener('click',(e)=>{
    let modal = document.querySelector('.playersAffich');
    if(e.target == modal) {
        modal.style.display='none';
    }
})