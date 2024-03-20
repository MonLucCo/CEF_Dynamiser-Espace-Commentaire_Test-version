// Version développement avec des fonctions pour répartir les fonctionnalités
//
// fonction 1 : addNewComment (event)
//      - gestion de l'événement lors de la 'soumission' du formulaire
//          + cas 1 : 'fonction 2' formulaire incomplet
//              -> message d'avertissement à l'utilisateur
//              -> fin événement 'soumission'
//          + cas 2 : 'fonction 2' formulaire complet
//              -> appel 'fonction 3'
//              -> appel 'fonction 4'
//              -> fin événement 'soumission'
//
// fonction 2 : isOneOfFieldsEmptyById (myArrayOfId) 
//                  >> retourne 'vrai' si un des élément est vide
//                  >> retourne 'faux' si tous les élémnts sont vides
//      - pour chaque élément du formulaire, vérifier 'fonction 3' (si vide)
//
// fonction 3 : isFieldEmptyById (myFieldId)
//                  >> retourne 'vrai' si le champ est vide
//                  >> retourne 'faux' si le champ est rempli
//      - pour le champ 'myFieldId', vérifier si vide
//
// fonction 4 : createNewCommentByClonedCommentById (myId)
//      - création d'un nouveau commentaire
//      - ajout du commentaire dans la page
//
// fonction 5 : toEmptyAllFieldsById (myArrayOfId)
//      - pour chaque élément du formulaire, vider le contenu
//

// Déclaration des fonctions utiles
//

function isFieldEmptyById (myFieldId) {
    let field = document.getElementById(myFieldId);

    return (field.value === "");
}

function isOneOfFieldsEmptyById (myArrayOfId) {
    let myResult = false;

    myArrayOfId.forEach(myId => {
        myResult = myResult || isFieldEmptyById(myId);
    });
    
    return myResult;
}

function addNewComment (event) {
    // empêcher l'événement par défaut de fonctionner (ici la soumission)
    event.preventDefault(); 
    // calculer l'état du remplissage des champs du formulaire
    // const statusOfFieldsFilling = isFieldEmptyById('first-name') || isFieldEmptyById('last-name') || isFieldEmptyById('message');
    const statusOfFieldsFilling = isOneOfFieldsEmptyById(['first-name', 'last-name', 'message']);

    if (statusOfFieldsFilling) {
        document.getElementById('error-message').style['display'] = 'block';    // mettre le style "display : block" de l'ID "message-error"
        console.log("Pas de nouveau commentaire");                              // trace dans la console.log => pas de nouveau commentaire
        // (facultatif) faire un focus sur le premier champ vide du formulaire
    } else {
        document.getElementById('error-message').style['display'] = 'none';     // mettre le style "display : none" de l'ID "message-error"
        console.log("création d'un nouveau commentaire");                       // trace dans la console.log => création du commentaire
        createNewCommentByClonedCommentById('comment-list');                    // créer le nouveau commentaire par clonage d'un commentaire
        toEmptyFieldsById(['first-name', 'last-name', 'message']);              // vider les champs du formulaire
        // (facultatif) faire un focus sur le premier champ du formulaire 
    }
       
}

function createNewCommentByClonedCommentById(myId) {
    // création d'un nouveau commentaire par clonage du premier commentaire de la liste des commentaires
    // Version détaillée :
    //      let myCommentList = document.getElementById(myId);
    //      let myCommentToClone = myCommentList.firstElementChild;
    //      let newClonedComment = myCommentToClone.cloneNode(true);
    const myCommentList = document.getElementById(myId);
    let newClonedComment= myCommentList.firstElementChild.cloneNode(true);

    // assurer la bordure (entre 2 commentaires) dans la classe de l'élémént cible du clone
    // version détaillée :
    //      let myElementTarget = newClonedComment.firstElementChild;
    //      let myClassListTarget = myElementTarget.classList;
    //      myClassListTarget.add('border-t', 'border-gray-200');
    newClonedComment.firstElementChild.classList.add('border-t', 'border-gray-200');

    // récupération des données du formaulaire
    const firstNameValue = document.getElementById('first-name').value;
    const lastNameValue = document.getElementById('last-name').value;
    const messageValue = document.getElementById('message').value;
    
    // modifier le titre du nouveau commentaire (dans le clone)
    newClonedComment.querySelector('h3').textContent = firstNameValue + ' ' + lastNameValue;

    // modifier le message du nouveau commentaire (dans le clone)
    newClonedComment.querySelector('p').textContent = messageValue;

    // ajout du nouveau commentaire (le clone modifié) dans la liste des commentaires (en fin de liste)
    myCommentList.appendChild(newClonedComment);

}

function toEmptyFieldsById (myArrayOfId) {
    myArrayOfId.forEach(myId => {
        document.getElementById(myId).innerHTML = "";
    });
}

// début des traitements
let formElement = document.querySelector('form');

formElement.addEventListener('submit', addNewComment, 'once');
