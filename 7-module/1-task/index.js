const END = 'завершенно'; // данные текст нужно выводить если событие прошло
const MS_IN_SEC = 1000; // количество миллисекнуд в секнуден
const MS_IN_MINUTE = 60 * MS_IN_SEC;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
const MS_IN_DAY = 24 * MS_IN_HOUR;


class TimeLeft {
  /**
   * @param el {Element} - ссылка на корневой элемент
   */
  constructor(el) {
    this.el = el;
    let from = this.parseDate(el.dataset['from']);
    let to = this.parseDate(el.dataset['to']);

    if (!from || !to || from > to) {
      el.innerHTML = 'завершенно';
      return;
    }

    let msg = '';
    let dif = to - from;
    let days = Math.trunc(dif / MS_IN_DAY); 
    dif = dif - days * MS_IN_DAY;
    msg += this.makeString(days, ['день', 'дня', 'дней']);

    let hours = Math.trunc(dif / MS_IN_HOUR); 
    dif = dif - hours * MS_IN_HOUR;
    msg += this.makeString(hours, ['час', 'часа', 'часов']);
    
    let mins = Math.trunc(dif / MS_IN_MINUTE); 
    dif = dif - mins * MS_IN_MINUTE;
    msg += this.makeString(mins, ['минута', 'минуты', 'минут']);
    
    let secs = Math.trunc(dif / MS_IN_SEC); 
    dif = dif - secs * MS_IN_SEC;
    msg += this.makeString(secs, ['секунда', 'секунды', 'секунд']);

    if (msg.startsWith(',')) {
      msg = msg.substring(1);
      //msg.trimLeft();
    }
    el.innerHTML = msg.trim();
  }

  makeString(value, arr) {
    if (value == 0) {
      return '';
    }
    let str = '' + value;

    if (value > 5 && value < 20) {
      return ', ' + value + ' ' + arr[2];
    }
    if (str.endsWith('1')) {
      return ', ' + value + ' ' + arr[0];
    }
    if (str.endsWith('2') || str.endsWith('3') || str.endsWith('4')) {
      return ', ' + value + ' ' + arr[1];
    }
    return ', ' + value + ' ' + arr[2];
    
  }

  /**
   * Форматируем строку в дату. Чтобы написать данный метод нужно почитать главу http://learn.javascript.ru/datetime
   * @param {string} str - строка с датой в формате `year.month.day hours:minutes:second`
   * @return {Date} - возвращаем объект даты
   */
  parseDate(str) {
    return Date.parse(str);
  }

  /**
   * Статчный метод, который можно вызывать не посредственно от класса, а не от объекта.
   * Подробнее здесь http://learn.javascript.ru/es-class#staticheskie-svoystva
   * @param el
   */
  static create(el) {
    return new TimeLeft(el);
  }
}

window.TimeLeft = TimeLeft;
