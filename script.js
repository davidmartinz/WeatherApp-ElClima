// Guardamos la URL y la KEY para hacer el fetch después
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'secret_api_key';

// Elementos del DOM 
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('input[type="text"]');
const cityName = document.querySelector('.city-name');
const dateElement = document.querySelector('.date');
const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const humidityElement = document.querySelector('.humidity');
const weatherIconContainer = document.querySelector('.weather-icon-container');
const weatherIcon = document.querySelector('.weather-icon');

// Ciudad por default
let city = 'Mexico ';

// Funcionamiento del form
searchForm.addEventListener('submit', function(event) {
event.preventDefault(); // Evitar que la pagina se recargue al hacer submit
city = searchInput.value.trim(); // Remover espacios vacios o el form no funcionará  -->  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
if (city) { // Verifica que  el form no este vacio
getWeatherData(city); // Llamar a la funcion con la ciudad como argumento
searchInput.value = ''; // Limpiar el form
}
});

//Funciones
async function getWeatherData(city) {
  try {
    const response = await fetch(`${API_URL}?q=${city}&units=metric&lang=es&appid=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    displayWeatherData(data);
  } catch (error) {
    console.error(error);  // Mostrar en consola los posibles errores
  }
}

function displayWeatherData(data) {
  const city = data.name.toUpperCase(); //nombre de localidad o ciudad de la consulta
  const date = new Date().toLocaleDateString(); // fecha
  const temperature = Math.round(data.main.temp); // temperatura redondeada , dentro de "main"
  const description = data.weather[0].description; // Descripcion del clima dentro de "weather"
  const humidity = data.main.humidity; // Porcentaje de humedad, dentro de "main"
  const icon = data.weather[0].icon; // Clave del icono correspondiente al clima reportado, dentro de "main"
 
  // Convertir informacion para mostrar en "weather details" con .textContent para obtener el texto RAW como lo manda el API  --->   https://www.youtube.com/shorts/BVBtbYh3YSU
  cityName.textContent = city;
  dateElement.textContent = date;
  temperatureElement.textContent = `${temperature}°C`;
  descriptionElement.textContent = description;
  humidityElement.textContent = "Humedad: " + `${humidity}%`;

  // Obtener el icono del pronostico para mostrar en el front
  const iconUrl = "http://openweathermap.org/img/w/" + `${icon}` + ".png";
  weatherIcon.src = iconUrl;
  }

// Ejecutar getWeatherData al cargar pagina
getWeatherData(city);