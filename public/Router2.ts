/* eslint-disable */

// IMPLEMENTATION
function Router() {
  let listeners: any = [];
  let currentPath = location.pathname;
  let previousPath: any = null;

  const isMatch = (match: any, path: any) =>
    (match instanceof RegExp && match.test(path)) ||
    (typeof match === "function" && match(path)) ||
    (typeof match === "string" && match === path);

  // @ts-ignore
  const handleListener = ({ match, onEnter }) => {
    const args = { currentPath, previousPath, state: history.state };

    isMatch(match, currentPath) && onEnter(args);
  };

  const handleAllListeners = () => listeners.forEach(handleListener);

  const generateId = () => {
    const getRandomNumber = () =>
      Math.floor(Math.random() * listeners.length * 1000);
    // @ts-ignore
    const doesExist = (id) => listeners.find((listener) => listener.id === id);

    let id = getRandomNumber();
    while (doesExist(id)) {
      id = getRandomNumber();
    }
    return id;
  };

  // @ts-ignore
  const on = (match, onEnter) => {
    const id = generateId();

    const listener = { id, match, onEnter };
    listeners.push(listener);
    handleListener(listener);
  };
  // @ts-ignore
  const go = (url, state) => {
    previousPath = currentPath;
    history.pushState(state, url, url);
    currentPath = location.pathname;

    handleAllListeners();
  };

  window.addEventListener("popstate", handleAllListeners);

  return { on, go };
}

// USAGE

const createRender =
  // @ts-ignore

    (content) =>
    // @ts-ignore
    (...args) => {
      console.info(`${content} args=${JSON.stringify(args)}`);
      //document.getElementById("root").innerHTML = `<h2>${content}</h2>`;
    };

const router = Router();

router.on(/.*/, createRender("/.*"));
// @ts-ignore
router.on((path) => path === "/contacts", createRender("/contacts"));
router.on("/about", createRender("/about"));

document.body.addEventListener("click", (event) => {
  // @ts-ignore
  if (!event.target.matches("a")) {
    return;
  }
  event.preventDefault();
  // @ts-ignore
  let url = event.target.getAttribute("href");
  // @ts-ignore
  router.go(url);
});
