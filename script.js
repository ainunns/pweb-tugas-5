const API_KEY = "5378a11839824ea5b4892152231912";

let isCelcius = true;
let data = null;

const setDefault = () => {
  document.getElementById("cityName").innerText = "No Data Fetched";
  document.getElementById("temperature").innerText = "...";
  document.getElementById("feels_like").innerText = "...";
  document.getElementById("weather_text").innerText = "...";
  document.getElementById("weather_icon").src = "";
};
setDefault();

const setIsCelcius = (val) => {
  isCelcius = val;
  data.then((res) => {
    renderWeather(res);
  });
};

const getCurrentWeather = async () => {
  try {
    const city = document.getElementById("cityInput").value;

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const renderWeather = (data) => {
  document.getElementById("cityName").innerText =
    data.location.name + ", " + data.location.country;
  document.getElementById("temperature").innerText = isCelcius
    ? data.current.temp_c
    : data.current.temp_f;
  document.getElementById("feels_like").innerText = isCelcius
    ? data.current.feelslike_c
    : data.current.feelslike_f;
  document.getElementById("weather_text").innerText =
    data.current.condition.text;
  document.getElementById("weather_icon").src = data.current.condition.icon;
};

const onSubmit = () => {
  event.preventDefault();
  data = getCurrentWeather();
  data
    .then((res) => {
      renderWeather(res);
    })
    .catch(() => {
      setDefault();
    });
};
