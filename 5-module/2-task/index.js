/**
 * Компонент, который реализует сортируемую таблицу
 * @param {Array} items - данные, которые нужно отобразить
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },
 *
 * @constructor
 */
function SortableTable(items) {
  /**
   * @property {Element} - обязательно свойство, которое ссылается на элемент <table>
   */
  this.el = document.createElement('table');
  
  let th = this.el.createTHead();
  let tr = document.createElement('tr');
  th.appendChild(tr);
  let columns = ['Name', 'Age', 'Salary', 'City'];
  columns.forEach((name)=>{
    let td = document.createElement('td');
    td.innerText = name;
    tr.appendChild(td);
  });
  
  this.tablerows = [];   
  items.forEach(item=>{
    let tr = document.createElement('tr');
    for (let key in item) {
      let td = document.createElement('td');
      td.innerText = item[key];
      tr.appendChild(td);
    }

    let tablerow = {};
    tablerow.row = tr;   
    tablerow.item = item; 
    this.tablerows.push(tablerow);
  });

  function buildTable(tableRows, table) {
    let tbody = table.querySelector('tbody');
    if (!tbody) {
      tbody = table.createTBody();
    } else {
      tbody.innerHtml = '';
    }

    tableRows.forEach(tableTr => {
      tbody.appendChild(tableTr.row);
    });
  }

  buildTable(this.tablerows, this.el);

  /**
   * Метод выполняет сортировку таблицы
   * @param {number} column - номер колонки, по которой
   * нужно выполнить сортировку (отсчет начинается от 0)
   * @param {boolean} desc - признак того, что сортировка должна идти в обратном порядке
   */
  this.sort = (column, desc = false) => {
  
    let columns = ['name', 'age', 'salary', 'city'];
    let columnName = columns[column];

    this.tablerows.sort((a, b) => {   
      let res = (!desc) ? 
        a.item[columnName] > b.item[columnName]
        : a.item[columnName] < b.item[columnName];        
      return res ? 1 : -1;
    });

    buildTable(this.tablerows, this.el);
  };
}
