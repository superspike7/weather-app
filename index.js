async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=907d034cdf914b0f907126117fb04564`,
      { mode: "cors" }
    );
    const data = await response.json();
    const selected = weatherData(data);
    console.log(selected);
    weatherCard(selected).render()
  } catch (err) {
    throw err;
  }
}

const weatherData = function onlyUsefulWeatherData(props) {
  return {
    name: props.name,
    main: props.weather[0].main,
    description: props.weather[0].description,
    icon: props.weather[0].icon,
    country: props.sys.country,
    temp: props.main.temp,
  };
};

const weatherCard = function compononent(props) {
  const main = document.querySelector(".main");
  const card = document.createElement("div");
  const name = document.createElement("p");
  const temp = document.createElement("p");
  const icon = document.createElement("img");
  const description = document.createElement("p");

  name.textContent = props.name + " " + props.country;
  temp.textContent = `${props.temp}°`;
  icon.src = `http://openweathermap.org/img/wn/${props.icon}@2x.png`;
  description.textContent = props.description;

  card.classList.add("p-1");
  name.classList.add("mt-2", "text-3xl", "text-gray-900", "font-bold");
  temp.classList.add("mt-2", "text-xl", "text-gray-800", "font-light");
  icon.classList.add("mt-2", "mx-auto");
  description.classList.add("text-xl", "text-gray-800", "font-light");

  card.appendChild(name);
  card.appendChild(temp);
  card.appendChild(icon);
  card.appendChild(description);

  const render = function renderCard() {
    main.innerHTML = "";
    main.appendChild(card);
  };

  return {
    render
  };
};

function searchWeather() {
  const inputData = document.querySelector("#search").value;
  fetchWeather(inputData);
}

document.querySelector(".search-btn").addEventListener("click", searchWeather);
