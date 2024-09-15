
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='Dummy Key'; //6f1085b56e034b26a66110300241509
//www.weatherapi.com account tirthshah452004@gmail.com

setInterval(() => {
    dateAndTime();
}, 1000);

function dateAndTime(){
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]
}

document.addEventListener('DOMContentLoaded', () => {
    // Your code here
    getWeatherData(); // Function to fetch weather data
    dateAndTime();
});

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude } = success.coords;
        
        fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        showWeatherData(data);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });

    });
}


function showWeatherData(data) {
    let { temp_c, wind_kph, pressure_mb, humidity, sunrise, sunset } = data.current;
    
    timezone.innerHTML = data.location.tz_id;
    countryEl.innerHTML = `${data.location.region}, ${data.location.country}`;
    
    currentWeatherItemsEl.innerHTML = `
    <div class="weather-item">
        <div>Temperature</div>
        <div>${temp_c}&#176;C</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_kph} km/h</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure_mb} hPa</div>
    </div>
    <div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    `;
    
}