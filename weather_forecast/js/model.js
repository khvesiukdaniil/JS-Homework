let btn       = document.querySelector('button.button');
let cityInput = document.querySelector('.city-input');

const ENTER_KEY_CODE  = 13;

btn.addEventListener('click', () => {
    getCity();
});

cityInput.addEventListener('keypress', (e) => {    
    if (e.keyCode == ENTER_KEY_CODE) {
        getCity();
    }
});

function getCity() {
    let cityName = cityInput.value;
    let correctCityName = deleteExtraSpaces(cityName);

    weatherForecast(correctCityName)
}

function weatherForecast(city) {
    let request = new XMLHttpRequest();
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=ef5ffdb295f9241df26ba3b904510af5';

    startLoader();

    request.onreadystatechange = function () {
        let isRequestReady = request.readyState == 4 && request.status == 200;
        let isCityIncorrect = request.readyState == 4 && request.status == 404;
        let isFieldEmpty = request.readyState == 4 && request.status == 400;

        if (isRequestReady) {
            let responseJSON = request.responseText;
            let response = JSON.parse(responseJSON);
            
            showWeatherForecast();
            changeInfo(response);
            hideError();
            stopLoader();
        } else if (isCityIncorrect) {
            showError('You entered wrong city!');
            stopLoader();
        } else if (isFieldEmpty) {
            showError('Enter something!');
            stopLoader();
        }
    }

    request.open('GET', url);
    request.send();

}

function deleteExtraSpaces(str) {
    
    let j = [];
    let newStr = str.split('');

    newStr.reduce( (last, element, i) => {
        if (last == element && element == ' ') {
            j.push(i);
        }
        return element;
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



