let btn       = document.querySelector('button.button');
let cityInput = document.querySelector('.city-input');
let error     = document.querySelector('.error');
let loader    = document.querySelector('.round');
let container = document.querySelector('.info');

let name     = document.querySelector('.city-name');
let weather  = document.querySelector('.weather');
let temp     = document.querySelector('.temp');
let press    = document.querySelector('.press');
let humudity = document.querySelector('.humidity');
let wind     = document.querySelector('.wind');
let cloud    = document.querySelector('.cloud');
let coords   = document.querySelector('.coords');
let desc     = document.querySelector('.description');
let image    = document.querySelector('.image');
const ENTER  = 13;

function getCity() {
    let input = deleteExtraSpaces(cityInput.value);
    ajaxGet(input)
}

btn.addEventListener('click', () => {
    getCity();
});

cityInput.addEventListener('keypress', (e) => {
    
    if (e.keyCode == ENTER) {
        getCity();
    }

});

function deleteExtraSpaces(str) {
    
    let j = [];
    let newStr = str.split('');

    newStr.reduce( (last, el, i) => {

        if (last == el && el == ' ') {
            j.push(i);
        }
        return el;

    })

    for (let i = newStr.length - 1; i > 0; i--) {

        if (j.indexOf(i) != -1) {
            newStr.splice(i,1)
        }

    }

    if (newStr[newStr.length - 1] == " ") {
        newStr.splice(newStr.length - 1,1)
    }

    if (newStr[0] == " ") {
        newStr.splice(0,1)
    }

    return newStr.join('');
}

function ajaxGet(city) {

    let request = new XMLHttpRequest();

    loader.classList.add('round-animation');

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {

            container.classList.add('info-visible');
            let response = JSON.parse(request.responseText);
            console.log(response);
            changeInfo(response);
            wrongInputBack();
            loader.classList.remove('round-animation');

        } else if (request.readyState == 4 && request.status == 404) {
            wrongInput('You entered wrong city!')
            loader.classList.remove('round-animation');
        } else if (request.readyState == 4 && request.status == 400) {
            wrongInput('Enter something!')
            loader.classList.remove('round-animation');
        }
    }

    request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=ef5ffdb295f9241df26ba3b904510af5');
    request.send();

}

function changeInfo(response) {
    name.innerHTML     = response.name;
    weather.innerHTML  = response.weather[0].main;
    temp.innerHTML     = Math.round(response.main.temp - 273.15);
    press.innerHTML    = response.main.pressure;
    humudity.innerHTML = response.main.humidity;
    wind.innerHTML     = response.wind.speed;
    cloud.innerHTML    = response.clouds.all;
    desc.innerHTML     = '(' + response.weather[0].description + ')';
    coords.innerHTML   = '(' + response.coord.lon + '; ' + response.coord.lat + ')';
    image.src          = 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png';
}

function wrongInput(errorText) {
    error.innerHTML = errorText;
    error.classList.add('error-visible');
    cityInput.classList.add('input-error');
}

function wrongInputBack() {
    if (!error.classList.contains('error-visible')) {
        return;
    }
    error.classList.remove('error-visible');
    cityInput.classList.remove('input-error');
}
