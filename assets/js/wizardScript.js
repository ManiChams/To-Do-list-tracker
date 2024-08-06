const submitButton = document.querySelector('#submitButton');
const eventName = document.querySelector('#eventName');
const eventDate = document.querySelector('#eventDate');
const eventDesc = document.querySelector('#eventDesc');

submitButton.addEventListener('click', validateForm());

function validateForm(eName, eDate, eDesc){
    if(eName === '' || eDate === '' || eDesc === ''){
        alert('Please fill in all fields');
        return false;
    }
    return true;
}
