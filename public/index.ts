import "./styles/styles.scss";
import "./Router2.ts";

// @ts-ignore
import { setLocalStorage, getLocalStorage } from "./aside.ts";

if (process.env.NODE_ENV === "production") {
  const navigation: Element = document.querySelector('.head-row');
  navigation.querySelectorAll("a").forEach((el)=> {
    let currentHref: string = el.getAttribute("href");
    el.setAttribute("href", "/weather/" + currentHref);
  })
}

// https://api.openweathermap.org/data/2.5/weather?q=moscow&appid=fcc07198ebd405c615789afc7486fd29
await handlerForm();
userLocationWeather();

export async function getWeatherCity(city: string) {
  const apiKey = "fcc07198ebd405c615789afc7486fd29";
  try {
    const url = "https://api.openweathermap.org/data/2.5/weather?";
    const cityName: string = `q=${city}`;
    const units = "&units=metric";
    const key = `&appid=${apiKey}`;
    const fullUrl = `${url}${cityName}${units}${key}`;
    const response = await fetch(fullUrl);
    const data = await response.json();
    return data;
    // Обработка полученных данных
  } catch (error) {
    console.error("Error:", error);
  }
}

export function handlerForm() {
  const form: Element = document.querySelector("#enterCity") as Element;

  if (form !== null) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const getInput = form.querySelector("#city") as HTMLInputElement;
      const cityValue: string = getInput.value;

      const answer = await getWeatherCity(cityValue);

      setLocalStorage(cityValue);

      appendWeather(answer);
    });
  }
}

export function appendWeather(weather: any) {
  const block = document.querySelector(".result");
  const map = document.getElementById("map");

  if (block !== null) {
    const icon = document.createElement("img");
    const iconUrl = "https://openweathermap.org/img/wn/";
    const iconName = weather.weather[0].icon;
    icon.setAttribute("src", `${iconUrl}${iconName}.png`);

    const row = document.createElement("p");
    row.classList.add("text");
    row.innerHTML = `Погода в 
    ${weather.name} сейчас 
    ${Math.round(weather.main.temp)} &deg;C`;

    const string = document.createElement("div");
    string.classList.add("flex");

    string.insertAdjacentElement("beforeend", icon);
    string.insertAdjacentElement("beforeend", row);

    block.innerHTML = "";
    block.insertAdjacentElement("afterbegin", string);
  }

  if (map !== null) {
    map.innerHTML = "";
    renderMap(weather.coord.lat, weather.coord.lon);
  }
}

export async function getWeatherCoords(lat: string, lon: string) {
  const api = "fcc07198ebd405c615789afc7486fd29";
  try {
    const url = "https://api.openweathermap.org/data/2.5/weather?";
    const latitude = `lat=${lat}`;
    const longitude = `&lon=${lon}`;
    const units = "&units=metric";
    const key = `&appid=${api}`;
    const fullUrl = `${url}${latitude}${longitude}${units}${key}`;
    const response = await fetch(fullUrl);
    const data = await response.json();
    return data;
    // Обработка полученных данных
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function userLocationWeather() {
  try {
    const coords: any = await getCoords();
    // eslint-disable-next-line max-len
    const answer: object = await getWeatherCoords(
      coords.latitude,
      coords.longitude,
    );
    appendWeather(answer);
    getLocalStorage();
  } catch (error: any) {
    console.error("Ошибка получения геопозиции:", error.message);
  }
}

export function getCoords() {
  // eslint-disable-next-line no-shadow
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        resolve(coords);
      },
      (error) => {
        reject(error);
      },
    );
  });
}

export function renderMap(lat: string, lon: string) {
  /* @ts-ignore */
  // eslint-disable-next-line no-undef
  ymaps.ready(init);
  function init() {
    // Создание карты.
    /* @ts-ignore */
    // eslint-disable-next-line no-undef,no-new
    new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [lat, lon],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 10,
    });
  }
}
