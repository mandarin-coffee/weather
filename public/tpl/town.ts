// eslint-disable-next-line no-restricted-globals
const url = location.search;

let townTpl = null;

if (url !== null) {
  const reg = /\w+/gi;
  const townName = reg.exec(url);
  townTpl = `
    <div class="townName">${townName}</div
  `;
} else {
  // eslint-disable-next-line no-unused-vars
  townTpl = `
    <form id="enterCity">
      <div class="block">
        <label for="city">Введите город</label>
          <input type="text" id="city" />
      </div>

      <div class="block">
        <button type="submit" id="enterCitySubmit">Отправить</button>
      </div>
    </form>
  `;
}

export const town = townTpl;
