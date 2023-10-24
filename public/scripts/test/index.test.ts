const { getWeatherCity, handlerForm } = require("../index");

describe("getWeatherCity", () => {
  // Тест на успешный запрос
  it("should fetch weather data for a city", async () => {
    const city = "London"; // Замените на имя города, который вы хотите протестировать

    // Мокаем fetch, чтобы имитировать успешный запрос
    // @ts-ignore
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        /* Мок данных с сервера */
      }),
    }));

    const data = await getWeatherCity(city);

    // Проверяем, что функция вернула ожидаемый результат
    expect(data).toEqual({
      /* Ожидаемые данные погоды */
    });

    // Проверяем, что fetch был вызван с ожидаемыми аргументами
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(city));
  });

  // Тест на обработку ошибки
  it("should handle errors when fetching weather data", async () => {
    const city = "NonexistentCity"; // Город, который не существует

    // Мокаем fetch, чтобы имитировать ошибку
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    try {
      await getWeatherCity(city);
    } catch (error) {
      // Проверяем, что функция обработала ошибку
      expect(error).toBeInstanceOf(Error);
      // @ts-ignore
      expect(error.message).toBe("Network error");
    }
  });
});

describe("handlerForm function", () => {
  it("should handle form submit and fetch weather data", async () => {
    // Создайте имитацию формы и её элементов
    const form = document.createElement("form");
    form.id = "enterCity";

    const input = document.createElement("input");
    input.id = "city";
    input.value = "CityName";

    form.appendChild(input);

    document.body.appendChild(form);

    // Создайте имитацию функций getWeatherCity, setLocalStorage и appendWeather
    const mockGetWeatherCity = jest.fn().mockResolvedValue({
      main: { temp: 25 },
      weather: [{ icon: "01d" }],
      name: "CityName",
    });
    const mockSetLocalStorage = jest.fn();
    const mockAppendWeather = jest.fn();

    // Перед использованием handlerForm, замените имитации функций на место настоящих
    globalThis.fetch = jest.fn(); // Мы не отправляем фактический запрос
    // @ts-ignore
    globalThis.getWeatherCity = mockGetWeatherCity;
    // @ts-ignore
    globalThis.setLocalStorage = mockSetLocalStorage;
    // @ts-ignore
    globalThis.appendWeather = mockAppendWeather;

    // Вызовите функцию handlerForm
    await handlerForm();

    // Симулируйте отправку формы
    form.dispatchEvent(new Event("submit"));

    // Проверьте, что функции были вызваны с правильными аргументами
    expect(mockGetWeatherCity).toHaveBeenCalledTimes(1);
    expect(mockGetWeatherCity).toHaveBeenCalledWith("CityName");
    expect(mockSetLocalStorage).toHaveBeenCalledTimes(1);
    expect(mockSetLocalStorage).toHaveBeenCalledWith("CityName", "CityName");
    expect(mockAppendWeather).toHaveBeenCalledTimes(1);
    expect(mockAppendWeather).toHaveBeenCalledWith({
      main: { temp: 25 },
      weather: [{ icon: "01d" }],
      name: "CityName",
    });
  });

  it("should handle geolocation and fetch weather data", async () => {
    // Создайте имитацию формы и её элементов
    const form = document.createElement("form");
    form.id = "enterCity";

    const input = document.createElement("input");
    input.id = "city";
    input.value = "CityName";

    form.appendChild(input);

    document.body.appendChild(form);

    // Создайте имитацию функций getWeatherCoords и appendWeather
    const mockGetCoords = jest.fn().mockResolvedValue({
      latitude: 123,
      longitude: 456,
    });
    const mockGetWeatherCoords = jest.fn().mockResolvedValue({
      main: { temp: 25 },
      weather: [{ icon: "01d" }],
      name: "CityName",
    });
    const mockAppendWeather = jest.fn();

    // Перед использованием handlerForm, замените имитации функций на место настоящих
    globalThis.fetch = jest.fn(); // Мы не отправляем фактический запрос
    // @ts-ignore
    globalThis.getWeatherCoords = mockGetWeatherCoords;
    // @ts-ignore
    globalThis.getCoords = mockGetCoords;
    // @ts-ignore
    globalThis.appendWeather = mockAppendWeather;

    // Вызовите функцию handlerForm
    await handlerForm();

    // Проверьте, что функции были вызваны с правильными аргументами
    expect(mockGetCoords).toHaveBeenCalledTimes(1);
    expect(mockGetWeatherCoords).toHaveBeenCalledTimes(1);
    expect(mockGetWeatherCoords).toHaveBeenCalledWith(123, 456);
    expect(mockAppendWeather).toHaveBeenCalledTimes(1);
    expect(mockAppendWeather).toHaveBeenCalledWith({
      main: { temp: 25 },
      weather: [{ icon: "01d" }],
      name: "CityName",
    });
  });
});
