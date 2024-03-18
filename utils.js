function isFieldEmpty (nameFieldId) {
    let field = document.getElementById(nameFieldId);

    return (field.value === "");
}

function updateDisplayErrorMessage() {
    const fieldsEmptyValue = isFieldEmpty('first-name') || isFieldEmpty('last-name') || isFieldEmpty('message');

    updateDisplayStyle(document.getElementById('error-message'), fieldsEmptyValue);

    return fieldsEmptyValue;
}

function updateDisplayStyle (myElement, myState) {
    let elementStyle = myElement.style;

    if (myState === true) {
        elementStyle['display'] = 'block';
    } else {
        elementStyle['display'] = 'none';
    }
}

// début des traitements
let formElement = document.querySelector('form');

formElement.onsubmit = function(event) {
    // if (updateDisplayErrorMessage() === true) {
    //     localStorage.setItem('displayErrorMessage', true);
    // } else {
    //     localStorage.setItem('displayErrorMessage', false);
    // }
    localStorage.setItem('displayErrorMessage', updateDisplayErrorMessage());
}