export function Router() {
  const go = (url, state) => {
    console.log(url);
    console.log(history);
    history.pushState(state, url, url);
  };

  return { go };
}

const menuLinks = document.querySelectorAll("nav ul li a");

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

window.addEventListener("popstate", (event) => {
  // Здесь вы можете обновить содержимое страницы на основе нового URL и state
  console.log("URL изменился на", window.location.pathname);
});
