const players = document.querySelector('.players ');
const popupPlayer = document.querySelector('.popupPlayer');
const global = document.querySelector('.global');
const divplayers = document.querySelector('.div-players');

players.addEventListener("mouseenter", () => {
    popupPlayer.style.display = "block";
});
// players.addEventListener("mouseleave", () => {
//     popupPlayer.style.display = "none"
// });

// popupPlayer.addEventListener("mouseleave", () => {
//     popupPlayer.style.display = "none"
// });

//consommer le fichier json qui contient les informations des joueurs
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
    const playersAffich = document.querySelector(".playersAffich ");
    playersAffich.innerHTML = "";

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
                      <p>${data[i].pace}</p> 
                      <p>${data[i].shooting}</p>
                      <p>${data[i].passing}</p>
                  </div>
                  <div class="right">
                      <p>${data[i].dribbling}</p> 
                      <p>${data[i].defending}</p>
                      <p>${data[i].physical}</p>
                  </div>
              </div>
          </div>
           
</div>
      `;


        playersAffich.innerHTML += playerCard;

    }
}



affich();



// function selected() {
//     const terrainDivs = document.querySelectorAll('.terrain div'); 
//     const playersAffich = document.querySelector(".global .playersAffich"); 

//     terrainDivs.forEach(terrainDiv => {
//         terrainDiv.addEventListener('click', () => {
//             playersAffich.style.display = 'block';  
        
//             const cards = document.querySelectorAll('.card');
//             cards.forEach(card => {
//                 card.addEventListener('click', () => {
//                     const selectedCard = card.cloneNode(true);

//                     const selectedContainer = document.querySelector('.selected-container');
//                     selectedContainer.innerHTML = '';  // Réinitialiser le conteneur
//                     selectedContainer.appendChild(selectedCard);  // Ajouter la carte sélectionnée dans le conteneur

//                     // Masquer les cartes après sélection
//                     playersAffich.style.display = 'none';
//                 });
//             });
//         });
//     });
// }

// // Appeler la fonction pour initialiser la sélection des cartes
// selected();
// function selected() {
//     let selectedTerrainDiv = null; // Variable pour garder la référence à la div du terrain sélectionnée
    
//     // Sélectionner toutes les div du terrain
//     const terrainDivs = document.querySelectorAll('.terrain div');
//     const playersAffich = document.querySelector(".global .playersAffich");  // Zone des cartes de joueurs

//     // Ajouter un événement de clic sur chaque div du terrain
//     terrainDivs.forEach(terrainDiv => {
//         terrainDiv.addEventListener('click', () => {
//             // Lorsque l'on clique sur une div du terrain, enregistrer cette div comme sélectionnée
//             selectedTerrainDiv = terrainDiv;  // Stocker la div du terrain sélectionnée

//             // Afficher les cartes de joueurs
//             playersAffich.style.display = 'block';
//         });
//     });

//     // Ajouter un événement de clic sur les cartes des joueurs
//     const cards = document.querySelectorAll('.card');
//     cards.forEach(card => {
//         card.addEventListener('click', () => {
//             // Vérifier si une div du terrain a été sélectionnée
//             if (selectedTerrainDiv) {
//                 // Créer une copie de la carte sélectionnée
//                 const selectedCard = card.cloneNode(true);
                
//                 // Ajouter la carte sélectionnée dans la div du terrain sélectionnée
//                 selectedTerrainDiv.innerHTML = ''; // Réinitialiser la div du terrain
//                 selectedTerrainDiv.appendChild(selectedCard); // Ajouter la carte dans la div du terrain

//                 // Masquer l'affichage des joueurs après sélection
//                 playersAffich.style.display = 'none';
//             } else {
//                 alert("Veuillez d'abord sélectionner une zone sur le terrain !");  // Alerte si aucune div du terrain n'est sélectionnée
//             }
//         });
//     });
// }

// // Appeler la fonction pour initialiser la sélection des cartes
// selected();


function selected() {
    let selectedTerrainDiv = null; // Variable pour garder la référence à la div du terrain sélectionnée
    
    // Sélectionner toutes les div du terrain
    const terrainDivs = document.querySelectorAll('.terrain div');
    const playersAffich = document.querySelector(".global .playersAffich");  // Zone des cartes de joueurs

    // Ajouter un événement de clic sur chaque div du terrain
    terrainDivs.forEach(terrainDiv => {
        terrainDiv.addEventListener('click', () => {
            // Lorsque l'on clique sur une div du terrain, enregistrer cette div comme sélectionnée
            selectedTerrainDiv = terrainDiv;  // Stocker la div du terrain sélectionnée

            // Afficher les cartes de joueurs
            playersAffich.style.display = 'block';
        });
    });

    // Ajouter un événement de clic sur les cartes des joueurs
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Vérifier si une div du terrain a été sélectionnée
            if (selectedTerrainDiv) {
                // Créer une copie de l'image de la carte sélectionnée
                const cardImage = card.querySelector('img').cloneNode(true);  // Sélectionner l'image de la carte et la cloner
                
                // Vider le contenu de la div du terrain sélectionnée
                selectedTerrainDiv.innerHTML = ''; // Réinitialiser le contenu de la div du terrain
                
                // Ajouter l'image clonée dans la div du terrain
                selectedTerrainDiv.appendChild(cardImage); // Remplacer le contenu par l'image du joueur

                // Masquer l'affichage des cartes après sélection
                playersAffich.style.display = 'none';
            } else {
                alert("Veuillez d'abord sélectionner une zone sur le terrain !");  // Alerte si aucune div du terrain n'est sélectionnée
            }
        });
    });
}

// Appeler la fonction pour initialiser la sélection des cartes
selected();




