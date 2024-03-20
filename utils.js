// Version opérationnelle avec des fonctions pour répartir les fonctionnalités
//
// fonction 1 : addNewComment (event)
//      - gestion de l'événement lors de la 'soumission' du formulaire
//          + cas 1 : si formulaire incomplet
//              -> message d'avertissement à l'utilisateur
//              -> fin événement 'soumission'
//          + cas 2 : si formulaire complet
//              -> appel 'fonction 2'
//              -> appel 'fonction 3'
//              -> fin événement 'soumission'
// fonction 2 : createNewCommentByClonedCommentById(myId)
//      - création d'un nouveau commentaire
//      - ajout du commentaire dans la page
//
// fonction 3 : toEmptyAllFieldsById (myArrayOfId)
//      - pour chaque élément du formulaire, vider le contenu
//

// Déclaration des fonctions utiles
//

function toEmptyAllFieldsById (myArrayOfId) {   
    myArrayOfId.forEach(myId => {
        document.getElementById(myId).value = "";
    });
}

function createNewCommentByClonedCommentById(myId) {
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

    // traitement selon l'état du remplissage des champs du formulaire    
    if (
        (document.getElementById('first-name').value === "") ||
        (document.getElementById('last-name').value === "") ||
        (document.getElementById('message').value === "")
        ) {
        // Pas de nouveau commentaire (au moins un champ du formulaire est vide)
        document.getElementById('error-message').style['display'] = 'block';    // mettre le style "display : block" de l'ID "message-error"
    } else {
        // Création d'un nouveau commentaire (tous les champs du formulaire sont remplis)
        document.getElementById('error-message').style['display'] = 'none';     // mettre le style "display : none" de l'ID "message-error"
        createNewCommentByClonedCommentById('comment-list');                    // créer le nouveau commentaire par clonage d'un commentaire
        toEmptyAllFieldsById(['first-name', 'last-name', 'message']);           // vider tous les champs du formulaire
    }      
}

// début des traitements
let formElement = document.querySelector('form');

formElement.addEventListener('submit', addNewComment, 'once');
