// Déclaration des éléments utiles
//
function updateDisplayStyle (myElement, myState) {
    // let elementStyle = myElement.style;

    // if (myState === true) {
    //     elementStyle['display'] = 'block';
    // } else {
    //     elementStyle['display'] = 'none';
    // }
    if (myState === true) {
        myElement.style['display'] = 'block';
    } else {
        myElement.style['display'] = 'none';
    }
}


// déclaration des éléments de tests
//
function testOnSubmit() {
    localStorage.setItem('displayErrorMessage', updateDisplayErrorMessage());
}

formElement.addEventListener('submit', testOnSubmit, 'once');


// début des traitements
let firstName = document.getElementById('first-name');
firstName.required = 'required';
let lastName = document.getElementById('last-name');
lastName.required = 'required';

formElement.onsubmit = function(event) {
//     // if (updateDisplayErrorMessage() === true) {
//     //     localStorage.setItem('displayErrorMessage', true);
//     // } else {
//     //     localStorage.setItem('displayErrorMessage', false);
//     // }
    localStorage.setItem('displayErrorMessage', updateDisplayErrorMessage());
}


//==DEBUT= Gestion du remplissage du formulaire ======================================================
//
// Déclaration des éléments utiles
//
function isFieldEmpty (nameFieldId) {
    let field = document.getElementById(nameFieldId);

    return (field.value === "");
}

function setDisplayStyle (myElement, myState) {
    if (myState === true) {
        myElement.style['display'] = 'block';
    } else {
        myElement.style['display'] = 'none';
    }
    return myState;
}

function statusDisplayErrorMessage() {
    const fieldsEmptyValue = isFieldEmpty('first-name') || isFieldEmpty('last-name') || isFieldEmpty('message');

    return setDisplayStyle(document.getElementById('error-message'), fieldsEmptyValue);
}


function addNewComment (event) {
    event.preventDefault(); // empêche l'événement par défaut de fonctionner (ici la soumission)
    
    let bCreateComment = statusDisplayErrorMessage();

    if (bCreateComment === false) {
        // createComment('comment-list');
        alert("création d'un nouveau commentaire");
    } else if (bCreateComment === true) {
        alert("Pas de nouveau commentaire");
    } else {
        alert("Anormal !")
    }
    
}

function _addNewComment (event) {
    event.preventDefault(); // empêche l'événement par défaut de fonctionner (ici la soumission)
    
    // const statusOfFielsFilling = isFieldEmpty('first-name') || isFieldEmpty('last-name') || isFieldEmpty('message');

    if (isFieldEmpty('first-name') || isFieldEmpty('last-name') || isFieldEmpty('message')) {
        document.getElementById('error-message').style['display'] = 'block';
        console.log("Pas de nouveau commentaire");
    } else {
        document.getElementById('error-message').style['display'] = 'none';
        console.log("création d'un nouveau commentaire");
    }
       
}



// début des traitements
let formElement = document.querySelector('form');

formElement.addEventListener('submit', _addNewComment, 'once');

//
//==FIN=== Gestion du remplissage du formulaire ======================================================

//==DEBUT== Gestion récursive de traitement dans le DOM ===> Utiliser de préférence Element.cloneNode()
//
function createChildValue (index, myChildren, myLevel) {

    let myElement = myChildren[index];
    // const myClassModelElement = myModelElement.classList;
    let myCreateChildValue;

    console.log("C'est au niveau (" + myLevel + ") l'élément n°" + index + " : " + myElement.tagName);

    switch (myElement.tagName) {
        case 'DIV':
            console.log("Creation de la classe et du noeud 'div'")
            let myCreatedChild = document.createElement('div');
            myCreatedChild.appendChild(createChild(myElement, myLevel + 1));
            myCreateChildValue = myCreatedChild;
            break;
        case 'H3':
            console.log("Création du titre du commentaire (Nom + Prénom)");
            let newTitleOfComment = document.createElement('h3');
            const firstNameValue = document.getElementById('first-name').value;
            const lastNameValue = document.getElementById('last-name').value;
            let myTitleOfComment = document.createTextNode(firstNameValue + ' ' + lastNameValue);
            newTitleOfComment.appendChild(myTitleOfComment);
            myCreateChildValue =  newTitleOfComment;
            break;
        case 'P':
            console.log("Création du message du commentaire");
            let newContentOfComment = document.createElement('p');
            let myContentMessage = document.getElementById('message').value;
            let myContentOfComment = document.createTextNode(myContentMessage);
            newContentOfComment.appendChild(myContentOfComment);
            myCreateChildValue = newContentOfComment;
            break;
        default:
            console.log("Autre cas : " + myElement.tagName);
            // générer une erreur
            break;
    }
    
    console.log("Fin de l'élément n°" + index + " : " + myElement.tagName + " au niveau (" + myLevel + ")");   

    return myCreateChildValue;
}

function createChild(myParent, myLevel) {

    let myChildren = myParent.children;
    const lengthOfChildrenModel = myChildren.length;     // Pour tracer la valeur - à enlever
    let myCreateChild;

    if (myLevel != 1) {
        for (let index = 0; index < myChildren.length; index++) {
            if (index > 0) {
                myCreateChild.appendChild(createChildValue(index, myChildren, myLevel));
            } else {
                myCreateChild = createChildValue(index, myChildren, myLevel);
            }    
        }    
    } else {
        myCreateChild = createChildValue(0, myChildren, myLevel);
    }
    
    return myCreateChild;
}

function createComment(idCommentList) {
    let commentList = document.getElementById(idCommentList);
    let newDiv =  document.createElement('div');
    // let newContent = document.createTextNode(newDiv);
    // let newComment = document.createTextNode(newContent);

    // commentList.appendChild(newDiv);
    commentList.appendChild(createChild(commentList, 1));
}
//
//===FIN=== Gestion récursive de traitement dans le DOM ===> Utiliser de préférence Element.cloneNode()
