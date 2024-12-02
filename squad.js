let squad;
if (localStorage.SquadData != null) {
    squad = JSON.parse(localStorage.SquadData);
} else {
    squad = [];
}

function afficherSquad(){
    const tableBody = document.querySelector("#squad-table tbody");
    tableBody.innerHtml="";
    squad.forEach((teamData, index) =>{
        const ligne = document.createElement('tr');
        const coluneName = document.createElement('td');
        coluneName.textContent=teamData.squadName;
        ligne.appendChild(coluneName);
        const coluneFormation = document.createElement('td');
        coluneFormation.textContent=teamData.formation;;
        ligne.appendChild(coluneFormation);
      const coluneSupprimer = document.createElement('td');
      const deletButton = document.createElement('button');
      deletButton.textContent = 'suprimer';
      deletButton.onclick = () => deletTeam(index); 
      coluneSupprimer.appendChild(deletButton);
      ligne.appendChild(coluneSupprimer);
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
function deletTeam(index) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette équipe ?")) {
        squad.splice(index, 1);  
        localStorage.setItem('SquadData', JSON.stringify(squad));  
        displaySquadTable();  
    }
}
function editTeam(index) {
const team = squad[index];

 document.getElementById('edit-team-form').style.display = 'block';
 document.getElementById('squad-container').classList.add('blurred');
    document.getElementById('edit-squad-name').value = team.squadName;
    document.getElementById('edit-formation').value = team.formation;
    window.saveEdit = function() {
        const updatedName = document.getElementById('edit-squad-name').value;
        const updatedFormation = document.getElementById('edit-formation').value;
        squad[index] = {
            squadName: updatedName,
            formation: updatedFormation
        };
        localStorage.setItem('SquadData', JSON.stringify(squad));
        document.getElementById('edit-team-form').style.display = 'none';
        document.getElementById('squad-container').classList.remove('blurred');
        afficherSquad();
    }
    window.cancelEdit = function() {
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



