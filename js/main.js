const next_btn = document.querySelector('#next');
const prev_btn = document.querySelector('#prev');
const slider = document.querySelector('.slider');
let first_slide;
let last_slide;
var usersStorage = JSON.parse(localStorage.getItem('users'));
usersStorage[0].name = usersStorage[0].name.toUpperCase();
var randomPerson = JSON.parse(localStorage.getItem('random-person'));
randomPerson = randomPerson.toUpperCase();

let projects = [
    {
        title: 'A CRAZY DATE',
        type: `${usersStorage[0].name} + ${randomPerson}`,
        content: 'OUR DATE CAN INCLUDE A CLIMB',
        image: './img/climbing.jpg'
    },
    {
        title: 'A CRAZY DATE',
        type: `${usersStorage[0].name} + ${randomPerson}`,
        content: 'OUR DATE CAN INCLUDE A BALL GAME.',
        image: './img/sports.jpg'
    },
    {
        title: 'A CRAZY DATE',
        type: `${usersStorage[0].name} + ${randomPerson}`,
        content: 'OUR DATE CAN INCLUDE A BIKE RIDE',
        image: './img/bike-ride.jpg'
    },
    {
        title: 'A CRAZY DATE',
        type: `${usersStorage[0].name} + ${randomPerson}`,
        content: 'OUR DATE CAN INCLUDE A NIGHT OUT',
        image: './img/dancing.jpg'
    },
    {
        title: 'A CRAZY DATE',
        type: `${usersStorage[0].name} + ${randomPerson}`,
        content: 'OUR DATE CAN INCLUDE A NIGHT AT THE MOVIE',
        image: './img/movie.jpg'
    }
];

projects.forEach(({title, type, content, image}, i) => {
    const slide = document.createElement('div');
    slide.classList.add('slider__slide');
    slide.style.backgroundImage = 'url(\'' + image + '\')';
    if (i == 0) {
        first_slide = slide;

        slide.classList.add('active');
    }

    if (i + 1 == projects.length) {
        last_slide = slide;
    }

    const slide_content = document.createElement('div');
    slide_content.classList.add('slider__content');

    const content_title = document.createElement('h3');
    content_title.classList.add('slider__title');
    content_title.textContent = title;

    const content_type = document.createElement('span');
    content_type.textContent = type;

    const content_content = document.createElement('div');
    content_content.classList.add('slider__desc');
    content_content.textContent = content;

    content_title.appendChild(content_type);
    slide_content.appendChild(content_title);
    slide_content.appendChild(content_content);
    slide.appendChild(slide_content);
    slider.appendChild(slide);
});


next_btn.addEventListener('click', () => {
    const active_slide = document.querySelector('.slider__slide.active');
    let sibling = active_slide.nextElementSibling;
    if (sibling == null) {
        sibling = first_slide;
    }


    if (sibling.classList.contains('slider__slide')) {
        active_slide.classList.remove('active');
        sibling.classList.add('active');
    }
});
prev_btn.addEventListener('click', () => {
    const active_slide = document.querySelector('.slider__slide.active');
    let sibling = active_slide.previousElementSibling;
    if (sibling == null || !sibling.classList.contains('slider__slide')) {
        sibling = last_slide;
        console.log(sibling);

    }

    
    if (sibling.classList.contains('slider__slide')) {
        active_slide.classList.remove('active');
        sibling.classList.add('active');
    }
});
