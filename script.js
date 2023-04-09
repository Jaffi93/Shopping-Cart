const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function addItem(e) {
    e.preventDefault();

    const newitem = itemInput.value;
    if (newitem === '') {
        alert('Please add an Item')
        return;
    }

    const li = document.createElement('li')
    li.appendChild(document.createTextNode(newitem))
    const button = createButton('remove-item btn-link text-red')
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    li.appendChild(button)
    itemList.appendChild(li)
    itemInput.value = ''
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

//Add event listener
itemForm.addEventListener('submit', addItem)