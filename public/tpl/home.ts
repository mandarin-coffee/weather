export function home(): string {
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

         <div id="map"></div>
  `;
}
