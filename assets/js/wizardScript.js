const submitButton = document.querySelector('#submitButton');
const eventName = document.querySelector('#eventName');
const eventDate = document.querySelector('#eventDate');
const eventDesc = document.querySelector('#eventDesc');

const newEvent ={
    name: eventName.value,
    date: eventDate.value,
    desc: eventDesc.value,
};

let eventArray = [];

eventName.addEventListener('change', function(event){
    if(eventName.value !== ''){
        newEvent.name = eventName.value;
    }
    //console.log(eventName.value);
    //console.log(newEvent.name);
})

eventDate.addEventListener('change', function(event){
    if(eventDate.value !== ''){
        newEvent.date = eventDate.value;
    }
})

eventDesc.addEventListener('change', function(event){
    if(eventDesc.value !== ''){
        newEvent.desc = eventDesc.value;
    }
})

submitButton.addEventListener('click', function(event){
    updateEvent();
});

function validateForm(eName, eDate, eDesc){
    if(eName === '' || eDate === '' || eDesc === ''){
        alert('Please fill in all fields');
        return false;
    }
    else
        return true;
}

function recordEvent(newEvent){
    eventArray.push(newEvent);
    localStorage.setItem('eventArray', JSON.stringify(eventArray));
    //localStorage.setItem('newEvent', JSON.stringify(newEvent));
}

function updateEvent(){
    const eName = eventName.value;
    const eDate = eventDate.value;
    const eDesc = eventDesc.value;

    console.log(eName);

    if(validateForm(eName, eDate, eDesc)){
        newEvent.name = eName;
        newEvent.date = eDate;
        newEvent.desc = eDesc;
        recordEvent(newEvent);
    }
}
