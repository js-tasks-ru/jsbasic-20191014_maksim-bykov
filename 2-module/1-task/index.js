/**
 * Клонируем объект
 * @param {Object} obj - клонируем объект
 * @returns {Object}
 */
function clone(obj) {
  if (!obj) {
    return obj;
  }

  let res = {};
  for (let key in obj) {
    let value = obj[key];
    if (typeof (value) == 'object') {
      value = clone(value);
    }
    res[key] = value;
  }
  
  return res;
}
