const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button')
let isEditMode = false;

function displayItems() {
    const itemsFromStorage = getItemsFromStorage()
    itemsFromStorage.forEach((item) => {
        addItemToDOM(item)
    })
    checkUI()
}

function onAddItemSubmit(e) {
    e.preventDefault();

    const newitem = itemInput.value;
    if (newitem === '') {
        alert('Please add an Item')
        return;
    }

    //Edit Items
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode')
        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode')
        itemToEdit.remove()
        isEditMode = false
    } else {
        if (checkIfItemExist(newitem)) {
            alert('That item Already Exists')
            return
        }
    }

    //Add new item
    addItemToDOM(newitem)
    addItemToStorage(newitem)
    checkUI()
    itemInput.value = ''
}

function addItemToDOM(item) {
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(item))
    const button = createButton('remove-item btn-link text-red')
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    li.appendChild(button)
    itemList.appendChild(li)
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item)

    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = []
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }

    return itemsFromStorage;
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement)
    } else {
        setitemToEdit(e.target)
    }
}

function checkIfItemExist(item) {
    const itemsFromStorage = getItemsFromStorage()
    if (itemsFromStorage.includes(item)) {
        return true
    } else {
        return false
    }
}

function setitemToEdit(item) {
    isEditMode = true;
    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'))
    item.classList.add('edit-mode')
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> updateItem'
    formBtn.style.backgroundColor = '#228B22'
    itemInput.value = item.textContent;
}

function removeItem(item) {
    if (confirm('Are you sure>')) {
        item.remove()

        removeItemFromStorage(item.textContent)
        checkUI()
    }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage()

    itemsFromStorage = itemsFromStorage.filter(i => i !== item)

    localStorage.setItem('items', JSON.stringify(itemsFromStorage))

}

function clearItem() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }

    localStorage.removeItem('items')
    checkUI()
}

function filterItem(e) {
    const items = itemList.querySelectorAll('li')
    const text = e.target.value.toLowerCase();
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase()
        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex'
        } else {
            item.style.display = 'none'
        }
    })
}

function checkUI() {
    itemInput.value = '';
    const items = itemList.querySelectorAll('li')
    if (items.length === 0) {
        clearBtn.style.display = 'none'
        itemFilter.style.display = 'none'
    } else {
        clearBtn.style.display = 'block'
        itemFilter.style.display = 'block'
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add item'
    formBtn.style.backgroundColor = '#333'
    isEditMode = false
}

function init() {
    //Add event listener
    itemForm.addEventListener('submit', onAddItemSubmit)
    itemList.addEventListener('click', onClickItem)
    clearBtn.addEventListener('click', clearItem)
    itemFilter.addEventListener('input', filterItem)
    document.addEventListener('DOMContentLoaded', displayItems)
}

init()

checkUI()