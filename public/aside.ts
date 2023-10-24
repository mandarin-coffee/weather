export function getLocalStorage() {
  const towns = JSON.parse(<string>localStorage.getItem("town"));

  if (towns !== null) {
    appendAside(towns);
  }
}

export function setLocalStorage(value: string, url: string) {
  const getStorage: string | null = localStorage.getItem("town");

  let towns: any = [];
  const city: string = value[0].toUpperCase() + value.slice(1);

  if (getStorage === null) {
    towns.push([city, url.toLocaleLowerCase()]);

    localStorage.setItem("town", JSON.stringify(towns));
    getLocalStorage();
  } else {
    towns = JSON.parse(getStorage);
    if (towns[0].length !== 10) {
      const isTown = towns[0].find((item: string) => item === city);
      if (isTown === undefined) {
        towns.push([city, url.toLocaleLowerCase()]);
        localStorage.setItem("town", JSON.stringify(towns));
        getLocalStorage();
      }
    } else {
      towns.splice(0, 1);
      towns.push([city, url.toLocaleLowerCase()]);
      localStorage.setItem("town", JSON.stringify(towns));
      getLocalStorage();
    }
  }
}

export function appendAside(array: []) {
  const block: HTMLElement = document.querySelector("aside") as HTMLElement;
  block.innerHTML = "";

  const ul: HTMLUListElement = document.createElement("ul");

  array.forEach((el) => {
    const li: HTMLLIElement = document.createElement("li");
    const url: HTMLAnchorElement = document.createElement("a");

    if (process.env.NODE_ENV === "production") {
      url.setAttribute("href", `/weather/town?${el[1]}`);
    } else {
      url.setAttribute("href", `/town?${el[1]}`);
    }

    // eslint-disable-next-line prefer-destructuring
    url.innerHTML = el[0];
    // @ts-ignore
    li.append(url);

    ul.append(li);
  });

  block.append(ul);
}
