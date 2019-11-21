/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {

  let numbers = Array.from(str)
    .map((ch) => (ch >= '0' && ch <= '9' || ch == '+' || ch == '-' || ch == '.') ? ch : ' ')
    .join('')
    .split(' ')
    .filter(elem => elem != '' && +elem)
    .map(elem => +elem);

  let res = {};
  if (numbers.length > 0) {
    res.min = numbers[0];
    res.max = numbers[0];
    numbers.forEach(el => {
      if (res.min > el) res.min = el;
      if (res.max < el) res.max = el;
    });
  }
  
  return res;
}
