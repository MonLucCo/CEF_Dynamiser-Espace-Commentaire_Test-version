function isFieldEmpty (nameFieldId) {
    let field = document.getElementById(nameFieldId);

    return (field.value === "");
}

function updateDisplayErrorMessage() {
    const fieldsEmptyValue = isFieldEmpty('first-name') || isFieldEmpty('last-name') || isFieldEmpty('message');

    updateDisplayStyle(document.getElementById('error-message'), fieldsEmptyValue);
}

function updateDisplayStyle (myElement, myState) {
    let elementStyle = myElement.style;

    if (myState === true) {
        elementStyle['display'] = 'block';
    } else {
        elementStyle['display'] = 'none';
    }
}
