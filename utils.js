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


