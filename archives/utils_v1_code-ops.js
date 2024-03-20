// Version opérationnelle avec des fonctions pour répartir les fonctionnalités
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
//      - pour chaque élément du formulaire, vérifier si vide
//
// fonction 3 : createNewCommentByClonedCommentById (myId)
//      - création d'un nouveau commentaire
//      - ajout du commentaire dans la page
//
// fonction 4 : toEmptyAllFieldsById (myArrayOfId)
//      - pour chaque élément du formulaire, vider le contenu
//

// Déclaration des fonctions utiles
//

function isOneOfFieldsEmptyById (myArrayOfId) {
    let myResult = false;

    myArrayOfId.forEach(myId => {
        myResult = myResult || (document.getElementById(myId).value === "");
    });
    
    return myResult;
}

function toEmptyAllFieldsById (myArrayOfId) {
    // console.log('Effacement des données');                              // trace dans la console.log => Effacement des données
    
    myArrayOfId.forEach(myId => {
        document.getElementById(myId).value = "";
    });
}

function createNewCommentByClonedCommentById (myId) {
    // création d'un nouveau commentaire par clonage du premier commentaire de la liste des commentaires
    const myCommentList = document.getElementById(myId);
    let newClonedComment= myCommentList.firstElementChild.cloneNode(true);

    // assurer la bordure (entre 2 commentaires) dans la classe de l'élémént cible du clone
    newClonedComment.firstElementChild.classList.add('border-t', 'border-gray-200');

    // récupération des données du formaulaire
    const firstNameValue = document.getElementById('first-name').value;
    const lastNameValue = document.getElementById('last-name').value;
    const messageValue = document.getElementById('message').value;
    
    // modifier dans le clone le titre et le message
    newClonedComment.querySelector('h3').textContent = firstNameValue + ' ' + lastNameValue;
    newClonedComment.querySelector('p').textContent = messageValue;

    // ajout (en fin de liste) du nouveau commentaire (le clone modifié) dans la liste des commentaires 
    myCommentList.appendChild(newClonedComment);
}

function addNewComment (event) {
    // empêcher l'événement par défaut de fonctionner (ici la soumission)
    event.preventDefault(); 

    // identification des champs concernés du formulaire
    const myFiedfsById = ['first-name', 'last-name', 'message'];

    // calculer l'état du remplissage des champs du formulaire    
    const statusOfFieldsFilling = isOneOfFieldsEmptyById(myFiedfsById);

    if (statusOfFieldsFilling) {
        // console.log("Pas de nouveau commentaire");                              // trace dans la console.log => pas de nouveau commentaire
        document.getElementById('error-message').style['display'] = 'block';    // mettre le style "display : block" de l'ID "message-error"
    } else {
        // console.log("Création d'un nouveau commentaire");                       // trace dans la console.log => création du commentaire
        document.getElementById('error-message').style['display'] = 'none';     // mettre le style "display : none" de l'ID "message-error"
        createNewCommentByClonedCommentById('comment-list');                    // créer le nouveau commentaire par clonage d'un commentaire
        toEmptyAllFieldsById(myFiedfsById);                                     // vider tous les champs du formulaire
    }      
}

// début des traitements
let formElement = document.querySelector('form');

formElement.addEventListener('submit', addNewComment, 'once');
