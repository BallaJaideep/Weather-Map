
const apiKey = "387f72950e83f86d194424f4e5df3116"; // <-- put your API key here

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const contentArea = document.getElementById("contentArea");

// Simple condition → image mapping (you can replace with your own image URLs)
const conditionImages = {
  Clear: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
  Clouds: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  Rain: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
  Drizzle: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
  Thunderstorm: "https://cdn-icons-png.flaticon.com/512/1146/1146860.png",
  Snow: "https://cdn-icons-png.flaticon.com/512/2315/2315309.png",
  Mist: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
  Haze: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
  Smoke: "https://cdn-icons-png.flaticon.com/512/4821/4821960.png",
  Fog: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
};

// Default fallback icon
const defaultIcon = "https://cdn-icons-png.flaticon.com/512/1163/1163661.png";

function showMessage(text) {
  contentArea.innerHTML = `<p class="message">${text}</p>`;
}

function renderWeather(data) {
  const { name, sys, main, weather, wind } = data;

  const temp = Math.round(main.temp);
  const description = weather[0].description;
  const mainCondition = weather[0].main; // e.g., "Haze", "Smoke", "Clear"
  const humidity = main.humidity;
  const windSpeed = wind.speed;

  // Pick icon based on main condition
  const iconUrl = conditionImages[mainCondition] || defaultIcon;

  contentArea.innerHTML = `
    <div class="weather-card">
      <div>
        <div class="city-name">${name}</div>
        <div class="country-code">${sys.country || ""}</div>
      </div>

      <div class="weather-top">
        <img class="weather-icon" src="${iconUrl}" alt="${mainCondition}" />
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
  if (!cityName || !cityName.trim()) {
    showMessage("Please enter a city name.");
    return;
  }

  showMessage("Loading weather data...");

  const encodedCity = encodeURIComponent(cityName.trim());
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || data.cod === "404") {
      showMessage("City not found. Please check the spelling.");
      return;
    }

    renderWeather(data);
  } catch (err) {
    console.error(err);
    showMessage("Error fetching data. Please try again.");
  }
}

// Events
searchBtn.addEventListener("click", () => {
  fetchWeather(cityInput.value);
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchWeather(cityInput.value);
  }
});

// Optional: load a default city
// fetchWeather("Hyderabad");

