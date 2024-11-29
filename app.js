const players = document.querySelector('.players ');
const popupPlayer = document.querySelector('.popupPlayer');
const global = document.querySelector('.global');
const divplayers = document.querySelector('.div-players');

players.addEventListener("mouseenter", () => {
    popupPlayer.style.display = "block";
});
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
                      <p>${data[i].pace + "  "}<span>PAC</span></p> 
                      <p>${data[i].shooting+"   "}<span>SHOT</span></p>
                      <p class="supprimer"><i class="fa-solid fa-trash" style="color: #00000;"></i></p>
        
                  </div>
                  <div class="right">
                      <p>${data[i].dribbling+"  "} <span>DRI</span></p> 
                      <p>${data[i].defending+" " }<span>DEF</span></p>
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
    let selectedTerrainDiv = null; 
    
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
                const cardImage = card.querySelector('img').cloneNode(true);  
                
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

//le hover de modifier et supprimer

const supprimer=document.querySelector('.supprimer');
const suppHover=document.querySelector('.supprimer span');
supprimer.addEventListener('mouseenter',()=>{
    suppHover.style.display='block';
})




