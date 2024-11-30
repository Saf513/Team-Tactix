// Récupérer les données du localStorage ou initialiser un tableau vide
let squad;
if (localStorage.SquadData != null) {
    squad = JSON.parse(localStorage.SquadData);
} else {
    squad = [];
}

console.log(squad)
function afficherSquad(){
    const tableBody = document.querySelector("#squad-table tbody");
    tableBody.innerHtml="";
    squad.forEach((teamData, index) =>{
        const ligne = document.createElement('tr');

        //CREATION DE CASE DE NOME
        const coluneName = document.createElement('td');
        coluneName.textContent=teamData.squadName;
        ligne.appendChild(coluneName);

       //CREATION DE CASE DE FORMATION
        const coluneFormation = document.createElement('td');
        coluneFormation.textContent=teamData.formation;;
        ligne.appendChild(coluneFormation);

      //CREATION DE CASE DE SUPPRIMER
      const coluneSupprimer = document.createElement('td');
      const deletButton = document.createElement('button');
      deletButton.textContent = 'suprimer';
      deletButton.onclick = () => deletTeam(index); 
      coluneSupprimer.appendChild(deletButton);
      ligne.appendChild(coluneSupprimer);

      //CREATION DE CASE DE MODIFICATION
      const coluneModifier = document.createElement('td');
      const editButton = document.createElement('button');
      editButton.textContent = 'Modifier';
      editButton.onclick = () => editTeam(index); 
      coluneModifier.appendChild(editButton);
      ligne.appendChild(coluneModifier);

      tableBody.appendChild(ligne) ;

    })
}

afficherSquad();
//FONCTION DE SUPPRIMER UNE EQUIPE
function deletTeam(index) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette équipe ?")) {
        squad.splice(index, 1);  
        localStorage.setItem('SquadData', JSON.stringify(squad));  
        displaySquadTable();  
    }
}

// FONCTION DE MODIFIER UNE EQUIPE
function editTeam(index) {
const team = squad[index];

 document.getElementById('edit-team-form').style.display = 'block';
 document.getElementById('squad-container').classList.add('blurred');
    // Pré-remplir les champs du formulaire avec les données de l'équipe
    document.getElementById('edit-squad-name').value = team.squadName;
    document.getElementById('edit-formation').value = team.formation;

    // Fonction de sauvegarde après modification
    window.saveEdit = function() {
        const updatedName = document.getElementById('edit-squad-name').value;
        const updatedFormation = document.getElementById('edit-formation').value;

        // Mettre à jour les données de l'équipe
        squad[index] = {
            squadName: updatedName,
            formation: updatedFormation
        };

        // Mettre à jour le localStorage
        localStorage.setItem('SquadData', JSON.stringify(squad));

        // Masquer le formulaire et réafficher le tableau
        document.getElementById('edit-team-form').style.display = 'none';
        document.getElementById('squad-container').classList.remove('blurred');
        afficherSquad();
    }

    // Fonction pour annuler l'édition
    window.cancelEdit = function() {
        // Masquer le formulaire sans enregistrer les modifications
        document.getElementById('edit-team-form').style.display = 'none';
        document.getElementById('squad-container').classList.remove('blurred');
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



