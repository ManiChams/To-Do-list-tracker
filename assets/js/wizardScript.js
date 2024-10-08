const submitButton = document.querySelector('#submitButton');
const eventName = document.querySelector('#eventName');
const eventDate = document.querySelector('#eventDate');
const eventDesc = document.querySelector('#eventDesc');
const indexButton = document.querySelector('#indexButton');



//newEvent Object stores the event details from the text inputs
const newEvent ={
    name: eventName.value,
    date: eventDate.value,
    desc: eventDesc.value,
};

//eventArray is an array that holds (or will hold) the event objects
let eventArray = [];

//when the index button is clicked, the user is redirected to the index page
indexButton.addEventListener('click', function(){
    window.location.href = `index.html`;
});

//when the submit button is clicked, the updateEvent function is called
submitButton.addEventListener('click', function(event){
    updateEvent();
});

//validates the form to ensure that all fields are filled in
function validateForm(eName, eDate, eDesc){
    //var elem = new Foundation.Reveal(element, {});
    $(document).foundation();
    if(eName === '' || eDate === '' || eDesc === ''){
        //alert('Please fill in all fields');
        //$('#errorModal').foundation('open');
        var modal = new Foundation.Reveal($('#error-modal'));
        modal.open();
        //console.log(modal);
        //$(document).Foundation.Reveal($('#error-modal'));
        //document.Foundation.Reveal($('#error-modal'));

        return false;
    }
    else
        return true;
}


//given an object (called newEvent), this function adds the object to eventArray and stores it in local storage
function recordEvent(newEvent){
    if(localStorage.getItem('eventArray') !== null){
        eventArray = JSON.parse(localStorage.getItem('eventArray')) || [];
    }
    eventArray.push(newEvent);
    localStorage.setItem('eventArray', JSON.stringify(eventArray));
}

//clears the inputs
function clearForms(){
    eventName.value = '';
    eventDate.value = '';
    eventDesc.value = '';
}

function updateEvent(){
    //first updateEvent loads the current event's name, date, and description
    const eName = eventName.value;
    const eDate = eventDate.value;
    const eDesc = eventDesc.value;

    //console.log(eName);

    //then, if all the fields have a value, the newEvent object is updated, then used to call recordEvent
    if(validateForm(eName, eDate, eDesc)){
        newEvent.name = eName;
        newEvent.desc = eDesc;
        newEvent.date = eDate;
        recordEvent(newEvent);
        var modal = new Foundation.Reveal($('#success-modal'));
        modal.open();
        clearForms();
    }
}
