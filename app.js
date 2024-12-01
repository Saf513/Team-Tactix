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

// selected();
function selected() {
    const terrainDivs = document.querySelectorAll('.terrain div');
    const playersAffich = document.querySelector(".playersAffich");
    const global = document.querySelector('.global');
    const availablePlayersContainer = document.querySelector(".available-players"); // Conteneur pour les joueurs non sélectionnés
    let joueursDisponibles = [...data]; // Liste des joueurs disponibles
    let selectedTerrainDiv = null;

    // Afficher les joueurs disponibles en haut
    function afficherJoueursDisponibles() {
        availablePlayersContainer.innerHTML = ''; // Réinitialiser l'affichage des joueurs disponibles
        joueursDisponibles.forEach(joueur => {
            const playerCard = `
                <div class="card" data-id="${joueur.id}">
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
            availablePlayersContainer.innerHTML += playerCard;
        });
    }

    // Initialiser l'affichage des joueurs disponibles
    afficherJoueursDisponibles();

    // Sélectionner une zone sur le terrain
    terrainDivs.forEach(terrainDiv => {
        terrainDiv.addEventListener('click', () => {
            const position = terrainDiv.classList.value;
            selectedTerrainDiv = terrainDiv;
            playersAffich.style.display = 'flex';
            document.querySelector('h3').style.display = 'block';
            global.classList.add('blurred');

            // Filtrer les joueurs disponibles pour cette position
            const joueursPourPosition = joueursDisponibles.filter(joueur => joueur.position === position);

            // Afficher les joueurs pour cette position dans la section des joueurs affichés
            playersAffich.innerHTML = '';
            joueursPourPosition.forEach(joueur => {
                const playerCard = `
                    <div class="card" data-id="${joueur.id}">
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
        });
    });

    // Gestion du clic sur les cartes pour les ajouter à la formation
    playersAffich.addEventListener('click', (event) => {
        if (event.target.closest('.card')) {
            const card = event.target.closest('.card');
            const joueurId = card.getAttribute('data-id');
            const joueurSelectionne = joueursDisponibles.find(joueur => joueur.id == joueurId);

            if (joueurSelectionne && selectedTerrainDiv) {
                // Ajouter le joueur à la formation (squadData)
                const position = selectedTerrainDiv.classList.value;
                if (!squadData.positions[position]) {
                    squadData.positions[position] = [];
                }
                squadData.positions[position] = joueurSelectionne.name;

                // Mettre à jour l'affichage sur le terrain
                const cardImage = card.querySelector('img').cloneNode(true);
                selectedTerrainDiv.innerHTML = '';
                selectedTerrainDiv.appendChild(cardImage);

                // Retirer le joueur de la liste des joueurs disponibles
                joueursDisponibles = joueursDisponibles.filter(joueur => joueur.id !== joueurId);
                afficherJoueursDisponibles(); // Réafficher les joueurs disponibles

                // Cacher la section des joueurs
                playersAffich.style.display = 'none';
                document.querySelector('h3').style.display = 'none';
                global.classList.remove('blurred');
            } else {
                alert("Veuillez d'abord sélectionner une zone sur le terrain !");
            }
        }
    });

    // Gestion du clic pour supprimer un joueur de la formation et le réafficher
    terrainDivs.forEach(div => {
        div.addEventListener('click', () => {
            const cardImage = div.querySelector('img');
            if (cardImage) {
                const joueurName = cardImage.alt; // On suppose que l'alt contient le nom du joueur
                const joueurRetire = joueursDisponibles.find(joueur => joueur.name === joueurName);

                if (joueurRetire) {
                    joueursDisponibles.push(joueurRetire); // Réajouter le joueur à la liste
                    afficherJoueursDisponibles(); // Réafficher les joueurs
                }

                div.innerHTML = ''; // Vider la zone du terrain
                div.innerHTML = `<i class="fa-solid fa-user-plus fa-2x" style="color: #e5ad15;"></i>`; // Réinitialiser l'icône
            }
        });
    });
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
