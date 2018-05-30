function main() {
  function addListItemToDom(name) {
    var item = document.createElement("LI");
    var list = document.getElementById("list");
    var textnode = document.createTextNode(name);
    item.onclick = function() {
      this.parentNode.removeChild(this);
      saveItemsToStorage();
    }
    item.appendChild(textnode);
    list.insertBefore(item, list.firstChild);
  }

  function saveItemsToStorage() {
    var items = [];
    var listItem = document.getElementById("list").getElementsByTagName("li");
    var newNums = [];
    for (var i = listItem.length-1; i >= 0; i--) {
      items.push(listItem[i].innerHTML);
    }
    if (typeof(chrome.storage) !== 'undefined') {
    	chrome.storage.local.set({items: items}, function() { });
    }
  }

  function loadItemsFromStorage() {
    if (typeof(chrome.storage) !== 'undefined') {
    	chrome.storage.local.get(['items'], function(result) {
        if(typeof(result.items) !== 'undefined'){
          result.items.forEach(function(item){
            addListItemToDom(item);
          });
        }
      });
    }
  }

  document.getElementById("inputTodo").addEventListener("keyup", function(e) {
    if (event.which == 13 || event.keyCode == 13) {
      addListItemToDom(this.value);
      this.value = '';
      saveItemsToStorage();
    }
  });
  loadItemsFromStorage();
};
document.addEventListener("DOMContentLoaded", function() {
  main();
});
