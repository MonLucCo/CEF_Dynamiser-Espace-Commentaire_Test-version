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