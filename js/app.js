'use strict';

var User = function (name, email, gender, age, orientation, city){
    this.name = name,
    this.email = email,
    this.gender = gender,
    this.age = age,
    this.orientation = orientation,
    this.city = city;
};

var usersArr = [];

function handleSubmit(event) {
    event.preventDefault();
    addInputs();
    for(var i = 0; i < usersArr.length; i++){
        if(usersArr[i].age >= 18) {
            saveToLocalStorage();
            showPreview();
        } else{
            alert('You are too small! You must be at least 18 yo!');
        }
    }
}

function addInputs(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var gender = document.getElementById('gender').value;
    var age = parseInt(document.getElementById('age').value);
    var orientation = document.getElementById('orientation').value;
    var city = document.getElementById('city').value;
    var user = new User (name, email, gender, age, orientation, city);

    usersArr.push(user);

    return user;
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


var filepathArr = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.gif', 'img/water-can.jpg', 'img/wine-glass.jpg'];

var names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];


var allPersons = [];

// construction function
function Product (name, src){
    this.name = name;
    this.src = src;
    this.votes = 0;
    this.views = 0;

    allPersons.push(this);
}




// helper function - calculate randon number
function random(max){
    return Math.floor(Math.random() * (max));
}

// render images
function render(){
    generateImg(imageOne);
}

// rendering pictures to the page
function generateImg(domEl) {
    var index = generateIndex();
    allPersons[index].views++;
    domEl.src = allPersons[index].src;
    domEl.title = allPersons[index].name;
    domEl.alt = allPersons[index].name;
}

// generating index
function generateIndex() {
    var index = random(allPersons.length);
    return index;
}

function checkArr() {
    for (var i = 0; i < filepathArr.length; i++) {
        new Product(names[i],filepathArr[i]);
    }
}

// clear function

function clear(){
    document.getElementById('div-form').innerHTML = '';
}

// welcome window
function addWelcomeWindow(){
    var divEl = document.getElementById('welcome-window');
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
