/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let res = document.createElement('ul');
  friends.forEach(friend=>{
    let elem = document.createElement('li');
    res.append(elem);
    elem.innerText = `${friend.firstName} ${friend.lastName}`;
  }); 
  return res;
}
