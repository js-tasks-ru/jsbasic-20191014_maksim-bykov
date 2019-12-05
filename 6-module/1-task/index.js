/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
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
class ClearedTable {
  constructor(data) {
    this.el = document.createElement('table');    
    this.data = data;

    this.el.className = 'pure-table';
    this.el.innerHTML = this.buildTable(data);
    this.el.addEventListener('click', event=> this.removeHandler(event));
  }

  removeHandler(event) {
    let trg = event.target;
    if (trg.tagName == 'A' && trg.innerHTML == 'X') {
      let parent = trg.closest('tr');
      let parentId = +parent.dataset['rowId'];
      parent.remove();

      this.onRemoved(parentId);
    }
  }

  buildTable(data) {
    let head = `
    <thead>
      <tr>
        <td>Name</td>
        <td>Age</td>
        <td>Salary</td>
        <td>City</td>
        <td></td>
      </tr>
    </thead>
    `;
    return head + this.buildBody(data);
  }

  buildBody(data) {
    let rows = '';
    if (data && data.length && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        rows += `
          <tr data-row-id=${data[i].id}>
            <td>${data[i].name}</td>
            <td>${data[i].age}</td>
            <td>${data[i].salary}</td>
            <td>${data[i].city}</td>
            <td><a href="#delete">X</a></td>
          </tr>
        `;
      }
    }

    return `
      <tbody>
        ${rows}
      </tbody>
    `;
  }

  /**
   * Метод который выщывается после удалении строки
   * @param {number} id - идентификатор удаляемого пользователя
   */
  onRemoved(id) {}
}

window.ClearedTable = ClearedTable;
