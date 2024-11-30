
const data = JSON.parse(localStorage.getItem('playersData'));function affich() {
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
            // Joueur de champ : afficher dribbling, defending, shooting et pace
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