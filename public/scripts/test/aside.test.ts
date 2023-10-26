// Импортируйте функцию и все необходимые зависимости
// eslint-disable-next-line import/no-duplicates
import { getLocalStorage, setLocalStorage } from "../aside";
// eslint-disable-next-line import/no-duplicates
import { appendAside } from "../aside";
// eslint-disable-next-line import/no-duplicates
import { initRouter } from "../router";

// Мокируйте localStorage и глобальную переменную process.env
// @ts-ignore
const mockLocalStorage = {
  getItem: jest.fn(),
};
// @ts-ignore
global.localStorage = mockLocalStorage;

describe("getLocalStorage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // eslint-disable-next-line max-len
  it("should call appendAside and initRouter if towns exist in localStorage", () => {
    // Установите моковое значение для localStorage.getItem
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify(["Town1", "Town2"]),
    );

    // Вызовите функцию
    getLocalStorage();

    // Проверьте, что appendAside был вызван с ожидаемыми аргументами
    expect(appendAside).toHaveBeenCalledWith(["Town1", "Town2"]);

    // Проверьте, что initRouter был вызван с ожидаемыми аргументами
    expect(initRouter).toHaveBeenCalledWith(process.env.NODE_ENV);
  });

  // eslint-disable-next-line max-len
  it("should not call appendAside and initRouter if towns do not exist in localStorage", () => {
    // Установите моковое значение для localStorage.getItem
    mockLocalStorage.getItem.mockReturnValue(null);

    // Вызовите функцию
    getLocalStorage();

    // Проверьте, что appendAside и initRouter не были вызваны
    expect(appendAside).not.toHaveBeenCalled();
    expect(initRouter).not.toHaveBeenCalled();
  });
});

// Мокируйте localStorage и document.body
// @ts-ignore
// eslint-disable-next-line no-redeclare
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

// @ts-ignore
global.localStorage = mockLocalStorage;

document.body.innerHTML = "<aside></aside>"; // Создайте пустой aside элемент для тестов

// Mock функции getLocalStorage, так как она будет вызвана внутри setLocalStorage
jest.mock("./yourGetLocalStorageModule", () => ({
  getLocalStorage: jest.fn(),
}));

describe("setLocalStorage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add a town to localStorage and call getLocalStorage", () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    // eslint-disable-next-line no-undef
    setLocalStorage("Town1", "url1");

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
      "town",
      JSON.stringify([["Town1", "url1"]]),
    );
    expect(getLocalStorage).toHaveBeenCalled();
  });

  // eslint-disable-next-line max-len
  it("should update the existing town in localStorage and call getLocalStorage", () => {
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify([["Town1", "url1"]]),
    );

    // eslint-disable-next-line no-undef
    setLocalStorage("Town1", "url2");

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
      "town",
      JSON.stringify([["Town1", "url2"]]),
    );
    expect(getLocalStorage).toHaveBeenCalled();
  });

  // eslint-disable-next-line max-len
  it("should add a new town and remove the oldest town when more than 10 towns exist in localStorage", () => {
    const towns = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= 11; i++) {
      towns.push([`Town${i}`, `url${i}`]);
    }
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(towns));

    // eslint-disable-next-line no-undef
    setLocalStorage("Town12", "url12");

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
      "town",
      JSON.stringify([
        ["Town2", "url2"],
        ["Town3", "url3"],
        ...["Town12", "url12"],
      ]),
    );
    expect(getLocalStorage).toHaveBeenCalled();
  });
});

describe("appendAside", () => {
  it("should append town links to the aside element", () => {
    const towns = [
      ["Town1", "url1"],
      ["Town2", "url2"],
    ];
    // @ts-ignore
    appendAside(towns);

    const aside = document.querySelector("aside") as Element;
    const ul = aside.querySelector("ul") as HTMLUListElement;
    const liElements = ul.querySelectorAll("li");
    const anchorElements = ul.querySelectorAll("a");

    expect(ul.childElementCount).toBe(2);

    expect(liElements[0].textContent).toBe("Town1");
    expect(anchorElements[0].getAttribute("href")).toBe("/town?url1");

    expect(liElements[1].textContent).toBe("Town2");
    expect(anchorElements[1].getAttribute("href")).toBe("/town?url2");
  });
});
