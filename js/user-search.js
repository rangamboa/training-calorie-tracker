var nameItem = $('.usersName');
var ageItem = $('.usersAge');
var htFtItem = $('.usersHtft');
var htInItem = $('.usersHtin');
var weightItem = $('.usersWeight');
var saveButton = $('#saveBtn');
var enterButton = $('#enterBtn');
var okay = 1;
var calcHeight;
var calcWeight;

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

    // Check for valid input values.

    if (ageItem[0].value <= 0) {
        alert('Please enter a valid number for age.');
        ageItem[0].value = '';
        ageItem[0].style = 'background-color: pink;';
        okay = 0;
    }
    if (htFtItem[0].value <= 0) {
        alert('Please enter a valid height in feet.');
        htFtItem[0].value = '';
        htFtItem[0].style = 'background-color: pink;';
    }
    if (htInItem[0].value < 0 || htInItem[0].value > 12) {
        alert('Please enter a valid height in inches.');
        htInItem[0].value = '';
        htInItem[0].style = 'background-color: pink;';
    }
    if (weightItem[0].value <= 0) {
        alert('Please enter a valid weight in pounds.');
        weightItem[0].value = '';
        weightItem[0].style = 'background-color: pink;';
    }

    // If all inputs are valid, proceed.
    if (okay == 1) {

        // Convert height in feet/inches to centimeters to satisfy API query parameter requirement.

        // First, convert to height in inches.
        calcHeight = (parseInt(htFtItem[0].value)*12)+parseInt(htInItem[0].value);
        console.log(calcHeight);

        // Then, convert to centimeters.
        calcHeight = Math.floor(calcHeight*2.54);
        console.log(calcHeight);

        // Convert weight in pounds to kilograms to satisfy API query parameter requirement.
        calcWeight = Math.floor(parseInt(weightItem[0].value)/2.205);
        console.log(calcWeight);
    }
});

