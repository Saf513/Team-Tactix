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
    const playersAffich = document.querySelector(".playersAffich");
    playersAffich.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        const playerCard = `
          <div class="card" onclick="selection(this)">
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
      `;


        playersAffich.innerHTML += playerCard;

    }
}



affich();





// function selectionne() {
//     const terrainDivs = document.querySelectorAll('.terrain div');
//     const playersAffich = document.querySelector(".global .playersAffich");
//     const save = document.querySelector(".save");
//     const cards = document.querySelectorAll('.global .playersAffich .card');
//     let selectedDiv = null; 

    
//     terrainDivs.forEach(div => {
//         div.addEventListener('click', () => {
//             selectedDiv = div;
//             playersAffich.style.display = 'block'; 
//             playersAffich.classList.add('play');
    
//         });
//     });

  
//     cards.forEach(card => {
      
//         card.addEventListener('click', () => {
            
//             if (selectedDiv) { 
//                 selectedDiv.innerHTML = card.innerHTML; 
                

             
//             }
//         });
//     });

//     save.addEventListener('click', () => {
//         playersAffich.style.display = 'none';
//     });
// }

// selectionne();


  const terrainDivs = document.querySelectorAll('.terrain div');
    const playersAffich = document.querySelector(".global .playersAffich");
    const save = document.querySelector(".save");
    const cards = document.querySelectorAll('.global .playersAffich .card');
    let selectedDiv = null;

    
    terrainDivs.forEach(div => {
        div.addEventListener('click', () => {
            selectedDiv = div;
            playersAffich.style.display = 'block';
            playersAffich.style.flexDirection='row';
           
        });
    });

function selection(element){
const card=element;
return card;
}
