// Déclaration des éléments utiles
//
function isFieldEmpty (nameFieldId) {
    let field = document.getElementById(nameFieldId);

    return (field.value === "");
}

function updateDisplayErrorMessage() {
    const fieldsEmptyValue = isFieldEmpty('first-name') || isFieldEmpty('last-name') || isFieldEmpty('message');

    return updateDisplayStyle(document.getElementById('error-message'), fieldsEmptyValue);
}

function updateDisplayStyle (myElement, myState) {
    if (myState === true) {
        myElement.style['display'] = 'block';
    } else {
        myElement.style['display'] = 'none';
    }
    return myState;
}

function createChild(myParent, myLevel) {
    let myModelElement = myParent.firstElementChild;
    const myClassModelElement = myModelElement.classList;

    console.log("C'est la classe de niveau (" + myLevel + ") : " + myClassModelElement);
    console.log("C'est l'élément : n°" + myClassModelElement.children.childElementCount + " : " + myModelElement.tagName);

    if (myClassModelElement.childElementCount > 0) {
        createChild(myModelElement, myLevel + 1);
    }
    
    return myModelElement;
}

function createComment(idCommentList) {
    let commentList = document.getElementById(idCommentList);
    let newDiv =  document.createElement('div');
    // let newContent = document.createTextNode(newDiv);
    // let newComment = document.createTextNode(newContent);

    // commentList.appendChild(newDiv);
    createChild(commentList, 1);
}

function addNewComment () {
    let bCreateComment = updateDisplayErrorMessage();

    if (bCreateComment === false) {
        createComment('comment-list');
        alert("création d'un nouveau commentaire");
    } else if (bCreateComment === true) {
        alert("Pas de nouveau commentaire");
    } else {
        alert("Anormal !")
    }
    
}

// début des traitements
let formElement = document.querySelector('form');

formElement.addEventListener('submit', addNewComment, 'once');


