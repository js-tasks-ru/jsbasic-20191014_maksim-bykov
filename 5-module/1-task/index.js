/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {

  let tbody = table.querySelector('tbody');
  let rows = tbody.querySelectorAll('tr');
  rows.forEach(row => {
    let cols = row.querySelectorAll('td');

    let available = cols[3].dataset['available'];
    if (available) {
      row.classList.add(available == 'true' ? 'available' : 'unavailable');
    } else {
      row.setAttribute('hidden', 'true');
    }

    let gender = cols[2].innerText;
    if (gender == 'm') row.classList.add('male');
    if (gender == 'f') row.classList.add('female');

    let age = +cols[1].innerText;
    if (age < 18) {
      row.style.cssText = 'text-decoration: line-through';
    }
  });
}
