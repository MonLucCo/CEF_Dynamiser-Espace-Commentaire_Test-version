// Déclaration des éléments utiles
//
function isFieldEmptyById (myFieldId) {
    let field = document.getElementById(myFieldId);

    return (field.value === "");
}

function addNewComment (event) {
    // empêcher l'événement par défaut de fonctionner (ici la soumission)
    event.preventDefault(); 
    // calculer l'état du remplissage des champs du formulaire
    const statusOfFieldsFilling = isFieldEmptyById('first-name') || isFieldEmptyById('last-name') || isFieldEmptyById('message');
    
    if (statusOfFieldsFilling) {
        document.getElementById('error-message').style['display'] = 'block';
        console.log("Pas de nouveau commentaire");
    } else {
        document.getElementById('error-message').style['display'] = 'none';
        console.log("création d'un nouveau commentaire");
        cloneCommentById('comment-list');
    }
       
}

function cloneCommentById(myListId) {
    let myCommentList = document.getElementById(myListId);
    let myCommentToClone = myCommentList.firstElementChild;
    let newClonedComment = myCommentToClone.cloneNode(true);

    myCommentList.appendChild(newClonedComment);

    let myCommentToFill = myCommentList.lastElementChild;

    const firstNameValue = document.getElementById('first-name').value;
    const lastNameValue = document.getElementById('last-name').value;
    let myTitleOfNewComment = myCommentToFill.querySelector('h3');
    myTitleOfNewComment.createTextNode(firstNameValue + ' ' + lastNameValue);
    // myTitleOfNewComment = firstNameValue + ' ' + lastNameValue;

}

// début des traitements
let formElement = document.querySelector('form');

formElement.addEventListener('submit', addNewComment, 'once');
