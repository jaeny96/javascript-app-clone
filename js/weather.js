const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");
const API_KEY = "1ab3e2ff5a9cfdcbd9b1cfadecf63153";

const onGeoOk = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
};

const onGeoError = () => {
  alert("Can't fint you. No Weather for you ㅠㅠ");
};

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
