/* eslint-disable no-unused-vars */

var formEl = document.getElementById('jsFormContainer');
var city = ['Seattle', 'Tacoma', 'Olympia', 'Bellevue', 'Redmond'];
var User = function (name, email, age, gender, orientation, city){
    this.username = name,
    this.email = email,
    this.age = age,
    this.gender = gender,
    this.orientation = orientation,
    this.location = city;
};
user.prototype.addImage = function(path){
    this.userImage = path;
};
user.prototype.ageRange = function(min, max){
    this.ageMin = min,
    this.ageMax = max;
};



// Event listeners to add "new User"
document.getElementById("submitUser").addEventListener("click", function(){
    document.getElementById("name").innerHTML;
    new User()
}); 




function addElement(element, elClass, content, parent){
    var newElement = document.createElement(element);
    if(elClass){
        newElement.classList.add(elClass);
    }
    if(content){
        var newContent = document.createTextNode(content);
        newElement.appendChild(newContent);
    }
    parent.appendChild(newElement);
    return newElement;
}
