'use strict';

var User = function (name, email, gender, age, orientation, ageMin, ageMax, city){
    this.name = name,
    this.email = email,
    this.gender = gender,
    this.age = age,
    this.orientation = orientation,
    this.ageMin = ageMin;
    this.ageMax = ageMax;
    this.city = city;
};

var usersArr = [];

function handleSubmit(event) {
    event.preventDefault();
    addInputs();
    if(parseInt(document.getElementById('age').value) >= 18) {
        saveToLocalStorage();
        showPreview();
    } else{
        alert('Sorry, but you are too small! You must be at least 18 yo!');
    }
}

function addInputs(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var gender = document.getElementById('gender').value;
    var age = parseInt(document.getElementById('age').value);
    var orientation = document.getElementById('orientation').value;
    var ageMin = parseInt(document.getElementById('age-min').value);
    var ageMax = parseInt(document.getElementById('age-max').value);
    var city = document.getElementById('city').value;
    var user = new User (name, email, gender, age, orientation, ageMin, ageMax, city);

    usersArr.push(user);
}

// save to local storage
var saveToLocalStorage = function() {
    localStorage.setItem('users', JSON.stringify(usersArr));
};

// helper function
function addElement(element, content, parent){
    var newElement = document.createElement(element);
    if(content){
        var newContent = document.createTextNode(content);
        newElement.appendChild(newContent);
    }
    parent.appendChild(newElement);
    return newElement;
}

// show preview
function showPreview() {
    var divEl = document.getElementById('result');
    var content = 'Thank you for filling out the form!';
    addElement('h3', content, divEl);
    addElement ('h4', 'Name:', divEl);
    var name = document.getElementById('name').value;
    addElement('p', name, divEl);
    addElement('h4', 'Email:', divEl);
    var email = document.getElementById('email').value;
    addElement('p', email, divEl);
    addElement('h4', 'I\'m:', divEl);
    var gender = document.getElementById('gender').value;
    addElement('p', gender, divEl);
    addElement('h4', 'Age:', divEl);
    var age = document.getElementById('age').value;
    addElement('p', age, divEl);
    addElement('h4', 'I\'m interested in:', divEl);
    var orientation = document.getElementById('orientation').value;
    addElement('p', orientation, divEl);
    addElement('h4', 'Age range:', divEl);
    var ageMin = document.getElementById('age-min').value;
    var ageMax = parseInt(document.getElementById('age-max').value);
    var minMax = `${ageMin} - ${ageMax}`;
    addElement('p', minMax, divEl);
    addElement('h4', 'City:', divEl);
    var city = document.getElementById('city').value;
    addElement('p', city, divEl);

    document.getElementById('random').style.display = 'block';
}

// add event listener to the form

var form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);



// render a random person to the page

var imageOne = document.getElementById ('image1');
var divDescription = document.getElementById('description');

var filepathArr = [['man', 'Tom Cruise', 'img/tom-cruise.jpg', 57], ['man', 'Justin Bieber', 'img/justin-bieber.jpg', 25], ['woman', 'Angelina Jolie', 'img/angelina_jolie.png', 44], ['woman', 'Jenifer Lopez', 'img/jenifer.jpg', 50], ['woman', 'Jenifer Aniston', 'img/Jennifer-Aniston.jpg', 50], ['woman', 'Megan Fox', 'img/Megan_Fox.jpg', 33], ['woman', 'Amber Heard', 'img/amber_heard.jpg', 33], ['woman', 'Minka Kelly', 'img/minka-kelly.jpg', 39], ['woman', 'Charlize Theron', 'img/charlize-theron.jpg', 44], ['woman', 'Gal Gadot', 'img/gal-gadot.jpg', 34], ['man', 'Elijah Wood', 'img/elijah-wood.jpg', 38]];


var allPersons = [];
var indexArr = [];
var ageRangeArr = [];
// construction function
function Person (gender, name, src, year){
    this.gender = gender;
    this.name = name;
    this.src = src;
    this.year = year;
    allPersons.push(this);
}




// helper function - calculate randon number
function random(max){
    return Math.floor(Math.random() * (max));
}

// render images
function render(){
    generateImg(imageOne);
    var content = allPersons[indexArr].name + ' ' + allPersons[indexArr].year + ' ' + 'years old';
    addElement('p', content, divDescription);
}

// rendering pictures to the page
function generateImg(domEl) {
    var index = generateIndex();
    domEl.src = allPersons[index].src;
    domEl.title = allPersons[index].name;
    domEl.alt = allPersons[index].name;
}

// generating index
function generateIndex() {
    var index = random(ageRangeArr.length);
    indexArr.push(index);
    return index;
}

function checkArr() {
    checkAge();
    for (var i = 0; i < ageRangeArr.length; i++) {
        new Person (ageRangeArr[i][0], ageRangeArr[i][1], ageRangeArr[i][2], ageRangeArr[i][3]);
    }
}


// function check age and gender in array

function checkAge (){
    if(usersArr[0].orientation === 'Only woman'){
        for (let i=0; i < filepathArr.length; i++) {
            if (filepathArr[i][3] >= usersArr[0].ageMin && filepathArr[i][3] <= usersArr[0].ageMax && filepathArr[i][0] === 'woman') {
                ageRangeArr.push(filepathArr[i]);
                console.log('Only woman');
            }
        }
    } else if(usersArr[0].orientation === 'Only man'){
        for (let i=0; i < filepathArr.length; i++) {
            if (filepathArr[i][3] >= usersArr[0].ageMin && filepathArr[i][3] <= usersArr[0].ageMax && filepathArr[i][0] === 'man') {
                ageRangeArr.push(filepathArr[i]);
                console.log('Only man');
            }
        }
    } else {
        for (let i=0; i < filepathArr.length; i++) {
            if (filepathArr[i][3] >= usersArr[0].ageMin && filepathArr[i][3] <= usersArr[0].ageMax) {
                ageRangeArr.push(filepathArr[i]);
                console.log('Both');
            }
        }
    }
}

// clear function

function clear(){
    document.getElementById('div-form').innerHTML = '';
}

// welcome window
function addWelcomeWindow(){
    var divEl = document.getElementById('welcome-window');
    divEl.style.display = 'block';
    document.getElementById('div-image').style.display = 'block';
    var content = 'Based on your info we found the best match for you!';
    addElement('h3', content, divEl);
}
// event handler
function eventClick() {
    clear();
    addWelcomeWindow();
    checkArr();
    render();
}

// add event listener to the form

var randomButton = document.getElementById('random');
randomButton.addEventListener('click', eventClick);
