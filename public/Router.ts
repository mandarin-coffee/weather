export function Router() {
  // @ts-ignore
  const go = (url, state) => {
    console.log(url);
    // eslint-disable-next-line no-restricted-globals
    console.log(history);
    // eslint-disable-next-line no-restricted-globals
    history.pushState(state, url, url);
  };

  return { go };
}

const menuLinks = document.querySelectorAll("nav ul li a");

// @ts-ignore
const router = new Router();

console.log(router);

menuLinks.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const getUrl = el.getAttribute("href");
    console.log(router.go(getUrl));
  });
});

console.log(menuLinks);

window.addEventListener("popstate", () => {
  // Здесь вы можете обновить содержимое страницы на основе нового URL и state
  console.log("URL изменился на", window.location.pathname);
});
