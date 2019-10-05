'use strict';


var divEl = document.getElementById('result');

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
    clearResult();
    usersArr.shift();
    event.preventDefault();
    addInputs();
    if(parseInt(document.getElementById('age').value) >= 18) {
        saveToLocalStorage();
        showPreview();
    } else{
        alert('Sorry, but you are too young! You must be at least 18 years old!');
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

// =======
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

// function clear if user made mistakes in the form
function clearResult(){
    divEl.innerHTML = '';
}



// add event listener to the form

var form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);




// add event listener to the date review button

var randomButton = document.getElementById('random');
randomButton.addEventListener('click', eventClick);

// event handler
function eventClick() {
    clear();
    addWelcomeWindow();
    checkArr();
    render();
    saveToLocalStorageRandom();
    addTextContent();
}

// render a random person to the page

var imageOne = document.getElementById ('image1');
var paragDescription = document.getElementById('description');
var divImage = document.getElementById('div-image');
var paragPredict = document.querySelector('.predict');
var previewButton = document.getElementById('preview-button');

var filepathArr = [{gender:'woman', name:'Torrey Devitto', src:'img/torrey-devitto.jpg', age:35}, {gender:'woman', name:'Lili Reinhart', src:'img/lili-reinhart.jpg', age:23}, {gender:'woman', name:'Kira Kosarin', src:'img/kira-kosarin.jpg', age:21}, {gender:'man', name:'James Franco', src:'img/james-franco.jpg', age:41}, {gender:'man', name:'Leonardo Dicaprio', src:'img/leonardo-dicaprio.jpg', age:44}, {gender:'man', name:'Jonah Hill', src:'img/jonah-hill.jpg', age:22}, {gender:'man', name:'Taylor Lautner', src:'img/taylor-lautner.jpg', age:22}, {gender:'man', name:'Dylan Minnette', src:'img/dylan-minnette.jpg', age:22}, {gender:'man', name:'Zac Efron', src:'img/zac-efron.jpg', age:31}, {gender:'man', name:'Liam Hemsworth', src:'img/liam-hemsworth.jpg', age:29}, {gender:'woman', name:'Miley Cyrus', src:'img/miley-cyrus.jpg', age:26}, {gender:'woman', name:'Christian Serattos', src:'img/christian-serattos.jpeg', age:29}, {gender:'woman', name:'Nikki Reed', src:'img/nikki-reed.jpg', age:31}, {gender:'man', name:'Robert Pattinson', src:'img/robert-pattinson.jpg', age:33}, {gender:'man', name:'Gage Munroe', src:'img/gage-munroe.jpg', age:20}, {gender:'woman', name:'Nicola Peltz', src:'img/nicola-peltz.jpg', age:24}, {gender:'woman', name:'Kiernan Shipka', src:'img/kiernan-shipka.jpg', age:19}, {gender:'woman', name:'Delilah Belle', src:'img/delilah-belle.jpg', age:18}, {gender:'man', name:'Tom Cruise', src:'img/tom-cruise.jpg', age:57}, {gender:'man', name:'Justin Bieber', src:'img/justin-bieber.jpg', age:25}, {gender:'woman', name:'Angelina Jolie', src:'img/angelina_jolie.png', age:44}, {gender:'woman', name:'Jenifer Lopez', src:'img/jenifer.jpg', age:50}, {gender:'woman', name:'Jenifer Aniston', src:'img/Jennifer-Aniston.jpg', age:50}, {gender:'woman', name:'Megan Fox', src:'img/Megan_Fox.jpg', age:33}, {gender:'woman', name:'Amber Heard', src:'img/amber_heard.jpg', age:33}, {gender:'woman', name:'Minka Kelly', src:'img/minka-kelly.jpg', age:39}, {gender:'woman', name:'Charlize Theron', src:'img/charlize-theron.jpg', age:44}, {gender:'woman', name:'Gal Gadot', src:'img/gal-gadot.jpg', age:34},{gender:'woman', name:'Naomi Scott', src:'img/naomi-scott.jpg', age:26}, {gender:'woman', name:'Letitia Wright', src:'img/letitia-wright.jpg', age:25}, {gender:'woman', name:'Becky Gomez', src:'img/becky-g.jpg', age:22}, {gender:'woman', name:'Bella Thorne', src:'img/bella-thorne.jpg', age:21}, {gender:'man', name:'Chaneclor Bennett', src:'img/chancelor-bennett.jpg', age:26}, {gender:'woman', name:'Camila Cabello', src:'img/camila-cabello.jpg', age:22}, {gender:'woman', name:'Christina Hendricks', src:'img/christina-hendricks.jpg', age:44}, {gender:'man', name:'Conan O\'brien', src:'img/conan-obrien.jpg', age:56}, {gender:'man', name:'Donald Glover', src:'img/donald-glover.jpg', age:36}, {gender:'man', name:'Phil McGraw', src:'img/dr-phil.jpg', age:69}, {gender:'man', name:'Ed Sheeran', src:'img/ed-sheeran.jpg', age:28}, {gender:'man', name:'Jaden Smith', src:'img/jaden-smith.jpg', age:21}, {gender:'man', name:'Jordan Peele', src:'img/jordan-peele.jpg', age:40}, {gender:'man', name:'Gazzy Garcia', src:'img/lil-pump.jpg', age:19}, {gender:'man', name:'Mahershala Ali', src:'img/mahershala-ali.jpg', age:45}, {gender:'man', name:'robert-deniro.jpg', src:'img/robert-deniro.jpg', age:76}, {gender:'woman', name:'Rosario Dawson', src:'img/rosario-dawson.jpg', age:40}, {gender:'man', name:'Ryan Gosling', src:'img/ryan-gosling.jpg', age:38}, {gender:'woman', name:'Stacey Dash', src:'img/stacey-dash.jpg', age:52}, {gender:'woman', name:'Tessa Thompson', src:'img/tessa-thompson.jpg', age:35}, {gender:'woman', name:'Zoey Kravitz', src:'img/zoey-kravitz.jpg', age:30}, {gender:'man', name:'Elijah Wood', src:'img/elijah-wood.jpg', age:38}];

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
    paragDescription.textContent = allPersons[indexArr].name + ' ' + allPersons[indexArr].year + ' ' + 'years old';
}

// save to local storage

var saveToLocalStorageRandom = function() {
    localStorage.setItem('random-person', JSON.stringify(allPersons[indexArr].name));
};

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
        new Person (ageRangeArr[i].gender, ageRangeArr[i].name, ageRangeArr[i].src, ageRangeArr[i].age);
    }
}


// function check age and gender in array

function checkAge (){
    if(usersArr[0].orientation === 'Only woman'){
        for (let i=0; i < filepathArr.length; i++) {
            if (filepathArr[i].age >= usersArr[0].ageMin && filepathArr[i].age <= usersArr[0].ageMax && filepathArr[i].gender === 'woman') {
                ageRangeArr.push(filepathArr[i]);
                console.log('Only women');
            }
        }
    } else if(usersArr[0].orientation === 'Only man'){
        for (let i=0; i < filepathArr.length; i++) {
            if (filepathArr[i].age >= usersArr[0].ageMin && filepathArr[i].age <= usersArr[0].ageMax && filepathArr[i].gender === 'man') {
                ageRangeArr.push(filepathArr[i]);
                console.log('Only men');
            }
        }
    } else {
        for (let i=0; i < filepathArr.length; i++) {
            if (filepathArr[i].age >= usersArr[0].ageMin && filepathArr[i].age <= usersArr[0].ageMax) {
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
    divImage.style.display = 'block';
    var content = 'Based on your info we found the best match for you!';
    addElement('h3', content, divEl);
}

// add paragraph with a button
var addTextContent = function(){
    paragPredict.textContent = 'Can you imagine your future date, take a look!';
    previewButton.textContent = 'Click me';
};



var predictButton = document.getElementById('preview-button');
predictButton.addEventListener('click', function(){
    window.open('main.html', '_self');
});
