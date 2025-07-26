const form = document.querySelector("form");
const place = document.querySelector(".place");
const placeCondition = document.querySelector(".place_condition"); 
const temprature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const speed = document.querySelector(".speed");

const updateweather = (data) => {
    if (data.error) {
        place.innerHTML = "City not found!";
        placeCondition.src = "";
        temprature.innerHTML = "";
        humidity.innerHTML = "";
        speed.innerHTML = "";
    } else {
        place.innerHTML = `${data.location.name}, ${data.location.country}`;
        placeCondition.src = data.current.condition.icon;
        temprature.innerHTML = `Temperature: ${data.current.temp_c} °C`;
        humidity.innerHTML = `Humidity: ${data.current.humidity} %`;
        speed.innerHTML = `Wind Speed: ${data.current.wind_kph} km/h`;
    }
}

const handleCityNotFound = () => {
    place.innerHTML = `City Not Found.`;
}

const fetchData = (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const { place: city } = Object.fromEntries(data.entries());
    
    fetch(`https://api.weatherapi.com/v1/current.json?key=604b3f8e19e249d799f70411250401&q=${city}&aqi=yes`)
    .then(response => response.json())
    .then(data => updateweather(data))
    .catch(error => console.log(error))

    form.reset();
}

form.addEventListener("submit", fetchData);
