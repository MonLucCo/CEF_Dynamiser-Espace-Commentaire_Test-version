// Version opérationnelle avec des fonctions pour répartir les fonctionnalités
//
// fonction 1 : addNewComment (event)
//      - gestion de l'événement lors de la 'soumission' du formulaire
//          + cas 1 : si formulaire incomplet (avec 'fonction 3' pour traitement des espaces)
//              -> message d'avertissement à l'utilisateur
//              -> fin événement 'soumission'
//          + cas 2 : si formulaire complet (avec 'fonction 3' pour traitement des espaces)
//              -> appel 'fonction 2'
//              -> fin événement 'soumission'
// fonction 2 : createNewCommentByClonedCommentById(myId)
//      - création d'un nouveau commentaire
//      - ajout du commentaire dans la page
//
// fonction 3 : myTrim(myString)
//      - pour supprimer les espaces en début et fin de chaîne 'text'
//

// Déclaration des fonctions utiles
//

function myTrim(myString) 
{ 
    // Expression rationnelle (Regular expression) : https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Regular_expressions
    // Signification de l'expression /(^\s*)|(\s*$)/g :
    // expression rationnelle entre / --- /, avec mémoire pour ( --- ), avec ou l'un ou l'autre pour |, pour toute la chaîne avec / /g
    // signification de (^\s*) espace(s) en début de chaîne : avec ^ pour début, avec \s pour l'espace, avec * pour répétition 0 ou n fois
    // signification de (\s*$) espace(s) en fin de chaîne : avec \s pour l'espace, * pour répétion 0 ou n fois, avec $ pour fin de chaîne
    
    // console.log("Traitement du texte : '" + string + "' en '" + string.replace(/(^\s*)|(\s*$)/g,'') + "'");

    // retourne la chaîne sans les espaces en début et en fin de chaîne
    return myString.replace(/(^\s*)|(\s*$)/g,''); 
} 

function createNewCommentByClonedCommentById(myId) {
    // création d'un nouveau commentaire par clonage du premier commentaire de la liste des commentaires
    const myCommentList = document.getElementById(myId);
    let newClonedComment= myCommentList.firstElementChild.cloneNode(true);

    // assurer la bordure (entre 2 commentaires) dans la classe de l'élémént cible du clone
    newClonedComment.firstElementChild.classList.add('border-t', 'border-gray-200');

    // récupération des données du formaulaire
    const firstNameValue = myTrim(document.getElementById('first-name').value);     // traitement des espaces
    const lastNameValue = myTrim(document.getElementById('last-name').value);       // traitement des espaces
    const messageValue = mytrim(document.getElementById('message').value);          // traitement des espaces
    
    // modifier dans le clone le titre et le message
    newClonedComment.querySelector('h3').textContent = firstNameValue + ' ' + lastNameValue;
    newClonedComment.querySelector('p').textContent = messageValue;

    // ajout (en fin de liste) du nouveau commentaire (le clone modifié) dans la liste des commentaires 
    myCommentList.appendChild(newClonedComment);
}

function addNewComment (event) {
    // empêcher l'événement par défaut de fonctionner (ici la soumission)
    event.preventDefault(); 

    // traitement selon l'état du remplissage des champs du formulaire (avec traitement des spaces)
    if (
        ( !trim( document.getElementById('first-name').value ) ) ||
        ( !trim( document.getElementById('last-name').value ) ) ||
        ( !trim( document.getElementById('message').value ) )
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
let formElement = document.querySelector('form');

formElement.addEventListener('submit', addNewComment);
