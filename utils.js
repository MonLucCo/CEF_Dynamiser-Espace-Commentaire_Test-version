// Version opérationnelle avec des fonctions pour répartir les fonctionnalités
//
// fonction 1 : addNewComment (event)
//      - gestion de l'événement lors de la 'soumission' du formulaire
//          + cas 1 : si formulaire incomplet (avec traitement des espaces)
//              -> message d'avertissement à l'utilisateur
//              -> fin événement 'soumission'
//          + cas 2 : si formulaire complet (avec traitement des espaces)
//              -> appel 'fonction 2'
//              -> fin événement 'soumission'
// fonction 2 : createNewCommentByClonedCommentById(myId)
//      - création d'un nouveau commentaire
//      - ajout du commentaire dans la page
//

// Déclaration des fonctions utiles
//

function createNewCommentByClonedCommentById(myId) {
    // création d'un nouveau commentaire par clonage du premier commentaire de la liste des commentaires
    const myCommentList = document.getElementById(myId);
    let newClonedComment= myCommentList.firstElementChild.cloneNode(true);

    // assurer la bordure (entre 2 commentaires) dans la classe de l'élémént cible du clone
    newClonedComment.firstElementChild.classList.add('border-t', 'border-gray-200');

    // récupération des données du formaulaire
    const firstNameValue = document.getElementById('first-name').value.trim();  // traitement des espaces
    const lastNameValue = document.getElementById('last-name').value.trim();    // traitement des espaces
    const messageValue = document.getElementById('message').value.trim();       // traitement des espaces
    
    // modifier dans le clone le titre et le message
    newClonedComment.querySelector('h3').textContent = firstNameValue + ' ' + lastNameValue;
    newClonedComment.querySelector('p').textContent = messageValue;

    // ajout (en fin de liste) du nouveau commentaire (le clone modifié) dans la liste des commentaires 
    myCommentList.appendChild(newClonedComment);
}

function addNewComment (event) {
    // empêcher l'événement par défaut de fonctionner (ici la soumission)
    event.preventDefault(); 

    // traitement selon l'état du remplissage des champs du formulaire (avec traitement des espaces)
    if (
        ( !document.getElementById('first-name').value.trim() ) ||
        ( !document.getElementById('last-name').value.trim() ) ||
        ( !document.getElementById('message').value.trim() )
        ) {
        // Pas de nouveau commentaire (au moins un champ du formulaire est vide)
        document.getElementById('error-message').style['display'] = 'block';    // mettre le style "display : block" de l'ID "message-error"
    } else {
        // Création d'un nouveau commentaire (tous les champs du formulaire sont remplis)
        document.getElementById('error-message').style['display'] = 'none';     // mettre le style "display : none" de l'ID "message-error"
        createNewCommentByClonedCommentById('comment-list');                    // créer le nouveau commentaire par clonage d'un commentaire
        document.querySelector('form').reset();                                 // vider tous les champs du formulaire - réinitialisation
    }      
}

// début des traitements
//

document.querySelector('form').addEventListener('submit', addNewComment);
