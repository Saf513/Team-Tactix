let squad;

if (localStorage.SquadData != null) {
    squad = JSON.parse(localStorage.SquadData);
} else {
    squad = [];
}

//AFFICHER LE TABLEAU DES SQUAD
function affichTable() {
    const TableBody = document.querySelector("#squad-table tbody");
    squadTableBody.innerHTML = '';  

    squad.forEach((teamData, index) => {
    
        //AFFICHER LE NOM
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = teamData.squadName;
        row.appendChild(nameCell);

        //AFFICHER LA FORMATION
        const formationCell = document.createElement('td');
        formationCell.textContent = teamData.formation;
        row.appendChild(formationCell);

        const actionsCell = document.createElement('td');

        // Bouton de modification
        const editButton = document.createElement('button');
        editButton.textContent = 'Modifier';
        editButton.onclick = () => editTeam(index); // Fonction de modification
        actionsCell.appendChild(editButton);

        // Bouton de suppression
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.onclick = () => deleteTeam(index); // Fonction de suppression
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);

        // Ajouter la ligne au tableau
        squadTableBody.appendChild(row);
    });
}

// Fonction pour modifier une équipe
function editTeam(index) {
    const team = squad[index];
    // Logique pour modifier l'équipe (vous pouvez afficher un formulaire pour modifier le nom, la formation)
    console.log("Modifier l'équipe :", team);
    // Par exemple, vous pouvez remplir un formulaire avec les informations de l'équipe à modifier
}

// Fonction pour supprimer une équipe
function deleteTeam(index) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette équipe ?")) {
        squad.splice(index, 1);  // Supprimer l'équipe du tableau
        localStorage.setItem('SquadData', JSON.stringify(squad));  // Mettre à jour le localStorage
        displaySquadTable();  // Réafficher le tableau
    }
}

// Appeler la fonction pour afficher le tableau initial
affichTable();
let editIndex = null;  // Variable pour garder la trace de l'index de l'équipe que l'on modifie

// Fonction pour afficher le formulaire de modification avec les informations actuelles
function editTeam(index) {
    editIndex = index;  // Stocker l'index de l'équipe à modifier
    const team = squad[index];

    // Remplir le formulaire avec les données actuelles de l'équipe
    document.querySelector("#edit-squad-name").value = team.squadName;
    document.querySelector("#edit-formation").value = team.formation;

    // Afficher le formulaire
    document.querySelector("#edit-team-form").style.display = "block";
}

// Fonction pour sauvegarder les modifications
function saveEdit() {
    // Récupérer les nouvelles valeurs du formulaire
    const newSquadName = document.querySelector("#edit-squad-name").value;
    const newFormation = document.querySelector("#edit-formation").value;

    // Vérifier que les champs ne sont pas vides
    if (newSquadName.trim() === "" || newFormation.trim() === "") {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Mettre à jour les données de l'équipe
    squad[editIndex].squadName = newSquadName;
    squad[editIndex].formation = newFormation;

    // Mettre à jour le localStorage avec les nouvelles données
    localStorage.setItem('SquadData', JSON.stringify(squad));

    // Cacher le formulaire et réafficher le tableau
    document.querySelector("#edit-team-form").style.display = "none";
    displaySquadTable();
}

// Fonction pour annuler la modification et fermer le formulaire
function cancelEdit() {
    // Cacher le formulaire sans enregistrer les modifications
    document.querySelector("#edit-team-form").style.display = "none";
}
