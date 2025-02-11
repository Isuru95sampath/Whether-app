let id = '9505fd1df737e20152fbd78cdb289b6a';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;
let city = document.querySelector('.name');
let form = document.querySelector("form");
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let main = document.querySelector('main');

// After pressing submit, send API request
form.addEventListener("submit", (e) => {
    e.preventDefault();  
    if(valueSearch.value !== ''){
        searchWeather(valueSearch.value);
    }
});

// Function to change the background image based on weather condition
const changeBackground = (weatherCondition) => {
    let body = document.body;
    let bgGradient = "";

    switch (weatherCondition) {
        case 'Clear':
            bgGradient = "linear-gradient(to bottom, #ff9a9e, #fad0c4)"; 
            break;
        case 'Clouds':
            bgGradient = "linear-gradient(to bottom, #bdc3c7, #2c3e50)"; 
            break;
        case 'Rain':
            bgGradient = "linear-gradient(to bottom, #536976, #292E49)"; 
            break;
        case 'Snow':
            bgGradient = "linear-gradient(to bottom, #E6E6FA, #FFFFFF)"; 
            break;
        case 'Thunderstorm':
            bgGradient = "linear-gradient(to bottom, #141E30, #243B55)"; 
            break;
        case 'Drizzle':
            bgGradient = "linear-gradient(to bottom, #4b6cb7, #182848)"; 
            break;
        case 'Mist':
        case 'Fog':
            bgGradient = "linear-gradient(to bottom, #757F9A, #D7DDE8)"; 
            break;
        default:
            bgGradient = "linear-gradient(to bottom, #56CCF2, #2F80ED)"; 
            break;
    }

    // Debugging: Check if the function is working
    console.log("Weather Condition:", weatherCondition);
    console.log("Background Image URL:", bgUrl);
    console.log("Gradient Background:", bgGradient);

    body.style.backgroundImage = `${bgGradient}, url('${bgUrl}')`;
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
};



// Call the API
const searchWeather = (cityName) => {
    fetch(url + '&q=' + cityName) 
        .then(response => response.json())
        .then(data => {
            console.log(data);  
            if(data.cod == 200){  
                city.querySelector('figcaption').innerHTML = data.name;
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('span').innerText = data.main.temp;
                description.innerText = data.weather[0].description;

                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;

                // Change background based on weather
                changeBackground(data.weather[0].main);
            } else {   
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = '';
        })
        .catch(error => console.error("Error fetching weather data:", error));
};

// Search Default (First, show Sri Lanka weather)
const initApp = () => {
    let defaultCity = 'Sri lanka'; 
    valueSearch.value = defaultCity;
    searchWeather(defaultCity);
}
initApp();
