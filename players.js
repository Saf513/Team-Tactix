
const data = JSON.parse(localStorage.getItem('playersData')); function affich() {
    let playersAffich = document.querySelector(".playersAffich");
    playersAffich.innerHTML = ``;

    for (let i = 0; i < data.length; i++) {
        let playerCard = ``;
        if (data[i].position.toUpperCase() === "GK") {
            playerCard = `
            <div>
                <div class="card pos">
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
                                <p>${data[i].diving + " "}<span>PAC</span></p>
                                <p>${data[i].kicking + " "}<span>SHOT</span></p>
                                <p class="supprimer"><i class="fa-solid fa-trash" style="color: #00000;"></i></p>
                            </div>
                            <div class="right">
                                <p>${data[i].handling + " "}<span>HAN</span></p> 
                                <p>${data[i].reflexes + " "}<span>REF</span></p>
                                <p class="editer"><i class="fa-solid fa-gears" style="color: #00000;"></i></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        } else {
                        playerCard = `
            <div>
                <div class="card pos">
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
                                <p>${data[i].pace + " "}<span>PAC</span></p> 
                                <p>${data[i].shooting + " "}<span>SHOT</span></p>
                                <p class="supprimer"><i class="fa-solid fa-trash" style="color: #00000;"></i></p>
                            </div>
                            <div class="right">
                                <p>${data[i].dribbling + " "}<span>DRI</span></p> 
                                <p>${data[i].defending + " "}<span>DEF</span></p>
                                <p class="editer"><i class="fa-solid fa-gears" style="color: #00000;"></i></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }


        playersAffich.innerHTML += playerCard;
    }
}

affich();
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

function ajoutPlayers() {
    let formAjout = document.querySelector('.form-ajout');

    formAjout.style.display = 'flex';
    document.querySelector('.global-players').classList.add('blured');
}

document.querySelector('.ajouter-joueurs').addEventListener('click', ajoutPlayers);


const positionsSelect = document.getElementById('positions');
let formAjout = document.querySelector('.form-ajout');
document.querySelector('.sauvgarder').addEventListener('click', () => {
    let pos = positionsSelect.value;
    let formAjout = document.querySelector('.form-ajout');
    if (pos != 1 && pos != 0) {
        document.querySelector('#form-ajout').style.display = 'flex';
        formAjout.style.display = 'none';
    }

    else if(pos==0){
        alert('Veuillez selectionner la position');
    }
    else if(pos==1){
        document.querySelector('#form-ajout-gardien').style.display='flex';
        formAjout.style.display = 'none';
    }

})

const form = document.getElementById('form-ajout');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    document.querySelector('#form-ajout').style.display = 'none';
    document.querySelector('.global-players').classList.remove('blured');

    const joueur = {
        name: document.getElementById('name').value,
        nationality: document.getElementById('nationality').value,
        club: document.getElementById('club').value,
        rating: document.getElementById('rating').value,
        pace: document.getElementById('pace').value,
        shooting: document.getElementById('shooting').value,
        passing: document.getElementById('passing').value,
        dribbling: document.getElementById('dribbling').value,
        defending: document.getElementById('defending').value,
        physical: document.getElementById('physical').value,
        position: document.querySelector('input[name="position"]').value, 
    };
    console.log(joueur);

});

document.querySelectorAll('.supprimer').forEach((icon) => {
    icon.addEventListener('click', function (e) {
        e.stopPropagation();

        // Trouver la carte du joueur
        const playerCard = e.target.closest('.card');
        const playerId = playerCard.closest('div').id;

        // Supprimer le joueur du DOM
        playerCard.closest('div').remove();

        // Récupérer et mettre à jour les données du localStorage
        let data = JSON.parse(localStorage.getItem('playersData'));
        const index = data.findIndex(player => (player.name + '-' + player.id) === playerId);
        if (index > -1) {
            data.splice(index, 1);
        }
        localStorage.setItem('playersData', JSON.stringify(data));

        // Recalculez la disposition du grid
        const playersAffich = document.querySelector(".playersAffich");

        // Cache temporairement pour forcer un reflow
        playersAffich.style.display = 'none'; 
        playersAffich.offsetHeight; // Force un reflow (redessiner l'élément)
        playersAffich.style.display = 'flex'; // Réaffiche le conteneur
       playersAffich.style.flexWrap='wrap'
        // Vous pouvez également ajuster dynamiquement le nombre de colonnes si nécessaire
        updateGridLayout();
    });
});

