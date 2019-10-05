/* eslint-disable no-unused-vars */

// constants, tied to permanent elements on the page
var quizEl = document.getElementById('quiz');
var quizImageEl = document.getElementById('quizImage');
var resultsEl = document.getElementById('results');
var submitEl = document.getElementById('submit');
var radioBox = document.getElementById('radioBox');
var mainEl = document.querySelector('main');

// vars
var quizzes = [];
var q = 0;
var answers = [];
usersArr = [];
var retrievedData = localStorage.getItem('users');
var users = JSON.parse(retrievedData);
var saveToLocalStorage = function() {
    localStorage.setItem('users', JSON.stringify(usersArr));
};
console.log(users);

// functions
function Quiz(quizName, path, correct, incorrect, incorrectTwo, string){
    this.name = quizName;
    this.string = string;
    this.correct = correct;
    this.incorrect = incorrect;
    this.incorrectTwo = incorrectTwo;
    this.imageOne = path;
    quizzes.push(this);
}
function correct(){
    answers.push(1);
    console.log('added 1 to array');
}
function incorrect(){
    answers.push(0);
    console.log('added 0 to array');
}
function listen(){
    if(document.getElementById('correct').checked){
        correct();
        console.log('1');
    } else if(document.getElementById('incorrect').checked || document.getElementById('incorrectTwo').checked){
        incorrect();
        console.log('0');
    }
}
function changeButton(){
    if(q < quizzes.length-1){
        submitEl.removeChild(textNode);
        textNode = document.createTextNode('Submit');
        submitEl.appendChild(textNode);
    } else if(q == quizzes.length-1){
        submitEl.removeChild(textNode);
        textNode = document.createTextNode('Complete');
        submitEl.appendChild(textNode);
    };
}
function runQuiz(){
    document.getElementById('submit').addEventListener('click', (event) => {
        if(document.getElementById('correct')){listen();};
        clearEl('radioBox');
        if(q<quizzes.length){
            renderQuiz(q, quizEl);
        }
        changeButton();
        q++;
    });
}
function onSubmit(event){
    document.getElementById('submit').addEventListener('click', (event) => {
        if(q == quizzes.length+1){
            console.log('end of line');
            users[0].quizzes = answers;
            usersArr.push(users);
            saveToLocalStorage();
            quizImageEl.src = 'http://pixelartmaker.com/art/756dff97b0f2220.png';
        }
    });
}
function newRadio(value, content, parent){
    var label = addElement('label', content, parent);
    function local(value, parent) {
        var button = document.createElement('input');
        button.type = 'radio';
        button.value = value;
        button.name = 'quizOptions';
        button.defaultChecked = false;
        button.id = value;
        parent.appendChild(button);
    }
    local(value, parent);
}
function addElement(element, content, parent){
    var newElement = document.createElement(element);
    if(content){
        var newContent = document.createTextNode(content);
        newElement.appendChild(newContent);
    }
    parent.appendChild(newElement);
    return newElement;
}
function clearEl(elementID){
    document.getElementById(elementID).innerHTML = '';
}
function getRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function renderQuiz(q, parent){
    addElement('h2', quizzes[q].string, radioBox);
    quizImageEl.src = quizzes[q].imageOne;
    newRadio('correct', quizzes[q].correct, radioBox);
    newRadio('incorrect', quizzes[q].incorrect, radioBox);
    newRadio('incorrectTwo', quizzes[q].incorrectTwo, radioBox);
}

// objects
new Quiz('City', 'https://www.nationalgeographic.com/content/dam/travel/Guide-Pages/north-america/seattle-travel.adapt.1900.1.jpg', 'Seattle', 'New York', 'Boston', 'What city is this?');
new Quiz('Beverage', 'https://athome.starbucks.com/sites/site.prod.athome.starbucks.com/files/2019-06/CoffeeFinder_ArticleHeader_Desktop_1176x712.jpg', 'Coffee', 'Milk', 'Juice', 'What do these make?');

// do the things
var textNode = document.createTextNode('Begin Quiz');
submitEl.appendChild(textNode);
runQuiz();
onSubmit();
