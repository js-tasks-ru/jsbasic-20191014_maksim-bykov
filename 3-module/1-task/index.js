/**
 * showSalary
 * @param {Array} data - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(data, age) {
  let res = '';
  
  for (let person of data) {
    if (person.age <= age) {
      if (res.length > 0) {
        res += '\n';
      }
      res += `${person.name}, ${person.balance}`;
    }
  }
  return res;
}
