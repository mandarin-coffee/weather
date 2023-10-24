export function town(): string | Array<any> {
  /**/
  // eslint-disable-next-line no-restricted-globals
  const url = location.search;

  if (url !== "") {
    const reg = /\w+/gi;
    const townName = reg.exec(url);
    // @ts-ignore
    // eslint-disable-next-line max-len
    return [
      townName[0],
      `<div class="townName">${townName}</div><div class="result"></div>`,
    ];
  }
  return `
    <form id="enterCity">
      <div class="block">
        <label for="city">Введите город</label>
          <input type="text" id="city" />
      </div>

      <div class="block">
        <button type="submit" id="enterCitySubmit">Отправить</button>
      </div>
    </form>
    
    <div class="result"></div>
  `;
}
