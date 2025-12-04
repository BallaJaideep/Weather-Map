
const apiKey = "387f72950e83f86d194424f4e5df3116"; 


const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const contentArea = document.getElementById("contentArea");


const conditionImages = {
  Clear: "https://cdn-icons-png.flaticon.com/512/3222/3222800.png",          
  Clouds: "https://cdn-icons-png.flaticon.com/512/4834/4834558.png",         
  Rain: "https://cdn-icons-png.flaticon.com/512/4150/4150897.png",           
  Drizzle: "https://cdn-icons-png.flaticon.com/512/3075/3075858.png",         
  Thunderstorm: "https://cdn-icons-png.flaticon.com/512/9799/9799999.png",   
  Snow: "https://cdn-icons-png.flaticon.com/512/4834/4834552.png",            
  Mist: "https://cdn-icons-png.flaticon.com/512/4834/4834455.png",         
  Haze: "https://cdn-icons-png.flaticon.com/512/4834/4834498.png",           
  Smoke: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",           
  Fog: "https://cdn-icons-png.flaticon.com/512/4380/4380457.png",             
};


const defaultIcon = "https://cdn-icons-png.flaticon.com/512/3222/3222794.png";


function showMessage(text) {
  contentArea.innerHTML = `<p class="message">${text}</p>`;
}


function renderWeather(data) {
  const { name, sys, main, weather, wind } = data;

  const temp = Math.round(main.temp);
  const humidity = main.humidity;
  const windSpeed = wind.speed;

  const mainCondition = weather[0].main;
  const description = weather[0].description;

  const iconURL = conditionImages[mainCondition] || defaultIcon;

  contentArea.innerHTML = `
    <div class="weather-card">
      <div>
        <div class="city-name">${name}</div>
        <div class="country-code">${sys.country}</div>
      </div>

      <div class="weather-top">
        <img class="weather-icon" src="${iconURL}" alt="${mainCondition}">
        <div>
          <div class="temperature">${temp}°C</div>
          <div class="description">${description}</div>
        </div>
      </div>

      <div class="info-row">
        <div class="info-item">
          <span>Humidity</span>
          <span>${humidity}%</span>
        </div>
        <div class="info-item">
          <span>Wind</span>
          <span>${windSpeed} m/s</span>
        </div>
      </div>
    </div>
  `;
}

async function fetchWeather(cityName) {
  if (!cityName.trim()) return showMessage("Please enter a city name.");

  showMessage("Loading weather...");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === "404") return showMessage("City not found.");
    renderWeather(data);
  } catch {
    showMessage("Failed to load weather. Try again.");
  }
}


searchBtn.addEventListener("click", () => fetchWeather(cityInput.value));

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") fetchWeather(cityInput.value);
});
