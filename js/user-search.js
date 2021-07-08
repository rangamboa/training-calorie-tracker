var nameItem = $('.usersName');
var ageItem = $('.usersAge');
var htFtItem = $('.usersHtft');
var htInItem = $('.usersHtin');
var weightItem = $('.usersWeight');
var saveButton = $('#saveBtn');
var enterButton = $('#enterBtn');
var inputEl = $('input');

function createUser() {
    const user = localStorage.setItem(nameItem, ageItem, heightItem, weightItem);
}

// This function clears the pink background if there is an input error in the User Profile section.
inputEl.on('click', function(event) {
    event.preventDefault();
    event.target.style = 'background-color: white';
});

saveButton.on('click', function() {

    document.getElementsByName(user).values();

    if(user < 1 ){
        console.log("No users found");
    } else {
        for(var i = 0; i< localStorage.length; i++);
    }
});

enterButton.on('click', function(event) {

    event.preventDefault();
    console.log('User Info should have been entered at this point.\nNeed to check for validity.');

    // Convert height in feet/inches to centimeters to satisfy API query parameter requirement.

    console.log(inputEl.length);

    console.log(ageItem[0].value);

    if (ageItem[0].value) {
        alert('Please enter a valid number for age.');
        ageItem[0].value = '';
        ageItem[0].style = 'background-color: pink;';
    }
    if (htFtItem[0].value <= 0) {
        alert('Please enter a valid height in feet.');
        ageItem[0].value = '';
        ageItem[0].style = 'background-color: pink;';
    }
    if (htInItem[0].value <= 0) {
        alert('Please enter a valid number.');
        ageItem[0].value = '';
        ageItem[0].style = 'background-color: pink;';
    }
    if (weightItem[0].value <= 0) {
        alert('Please enter a valid number.');
        ageItem[0].value = '';
        ageItem[0].style = 'background-color: pink;';
    }

    // Convert weight in pounds to kilograms to satisfy API query parameter requirement.

});

