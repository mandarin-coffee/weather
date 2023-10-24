import { home } from "../tpl/home";
import { town } from "../tpl/town";
import { about } from "../tpl/about";

import { handlerForm, getWeatherCity, appendWeather } from "./index";

export function initRouter(): void {
  /**/
  // eslint-disable-next-line no-restricted-globals
  render(location);
  // @ts-ignore
  const navigation = document.querySelectorAll("nav a");
  navigation.forEach((el: Element): void => {
    el.addEventListener("click", (event) => {
      event.preventDefault();

      // @ts-ignore
      const url: string = event.target.href;

      // eslint-disable-next-line no-restricted-globals
      history.pushState({}, "", url);

      // @ts-ignore
      // eslint-disable-next-line no-restricted-globals
      render(location);
    });
  });

  const asideLinks = document.querySelectorAll("aside a");
  asideLinks.forEach((el: Element): void => {
    el.addEventListener("click", (event) => {
      event.preventDefault();

      // @ts-ignore
      const url: string = event.target.href;

      // eslint-disable-next-line no-restricted-globals
      history.pushState({}, "", url);

      // @ts-ignore
      // eslint-disable-next-line no-restricted-globals
      render(location);
    });
  });
}

export async function render(url: Object) {
  const container = document.querySelector(".container") as Element;
  container.innerHTML = "";

  // @ts-ignore
  switch (url.pathname) {
    case "/":
      container.innerHTML = home();
      await handlerForm();
      break;
    case "/town":
      // eslint-disable-next-line no-case-declarations
      const res: any = town();
      // eslint-disable-next-line prefer-destructuring
      if (typeof res === "string") {
        container.innerHTML = res;
        await handlerForm();
      } else {
        // eslint-disable-next-line prefer-destructuring
        container.innerHTML = res[1];
        const answer = await getWeatherCity(res[0]);
        appendWeather(answer);
      }
      break;
    case "/about":
      container.innerHTML = about();
      break;
    default:
      container.innerHTML = home();
      break;
  }
}
