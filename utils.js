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

// début des traitements
let formElement = document.querySelector('form');

formElement.addEventListener('submit', updateDisplayErrorMessage, 'once');
