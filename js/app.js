
'use strict';

var Cart = function(items) {
    // this.items is an array of CartItem instances.
    this.items = items;
};


var User = function(name, email, gender, age, orientation, city) {
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.age = age;
    this.orintation = orientation;
    this.city = city;
};

function saveToLocalStorage() {
    // TODO: Fill in this instance method to save the contents of the cart to localStorage
    var inputsStringifyied = JSON.stringify(cart.items);
    localStorage.setItem('user', inputsStringifyied);
}

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

var cart = new Cart([]);

function handleSubmit(event) {
    event.preventDefault();
    addSelectedItem();
    saveToLocalStorage();
    showPreview();
}

function addSelectedItem() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var gender = document.getElementById('gender').value;
    var age = document.getElementById('age').value;
    var orientation = document.getElementById('orientation').value;
    var city = document.getElementById('city').value;
    var user =  new User (name, email, gender, age, orientation, city);
    cart.items.push(user);
    return user;
}

function showPreview() {
    // TODO: Get the item and quantity from the form
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var gender = document.getElementById('gender').value;
    var age = document.getElementById('age').value;
    var orientation = document.getElementById('orientation').value;
    var city = document.getElementById('city').value;
    var divEl = document.getElementById('result');
    var content1 = 'Thank you for filling out the form!';
    addElement('h3', content1, divEl );
    addElement('h4', 'Name:', divEl);
    addElement ('p', name, divEl);
    addElement('h4', 'Email:', divEl);
    addElement ('p', email, divEl);
    addElement('h4', 'I\'m:', divEl);
    addElement ('p', gender, divEl);
    addElement('h4', 'Age:', divEl);
    addElement ('p', age, divEl);
    addElement('h4', 'I\'m interested in:', divEl);
    addElement ('p', orientation, divEl);
    addElement('h4', 'City:', divEl);
    addElement ('p', city, divEl);
    document.getElementById('random').style.display = 'block';
}

var userForm = document.getElementById('form');
userForm.addEventListener('submit', handleSubmit);





var imageOne = document.getElementById ('image1');

var filepathArr = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.gif', 'img/water-can.jpg', 'img/wine-glass.jpg'];

var names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

var Person = function(filePath, name) {
    this.filePath = filePath;
    this.name = name;
    allProducts.push(this);
};
var allProducts = [];


function renderNewInstance () {
    if(cart.items[0].orintation === 'Only woman'){
        for (var i = 0; i < filepathArr.length; i++) {
            new Person (filepathArr[i], names[i]);
        }
    } else {
        alert('false');
    }
}

// helper function - calculate randon number
function random(max){
    return Math.floor(Math.random() * (max));
}

// rendering pictures to the page
function render(domEl) {
    var index = generateIndex();
    domEl.src = allProducts[index].filePath;
    domEl.title = allProducts[index].name;
    domEl.alt = [index].name;
}

// generating index
function generateIndex() {
    var index = random(allProducts.length);
    return index;
}


function handleClick(){
    renderNewInstance();
    document.getElementById('div-form').innerHTML = '';
    render(imageOne);
}


var randomButton = document.getElementById('random');
randomButton.addEventListener('click', handleClick);
