const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

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
    checkUI()
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


function removeItem(e) {
    e.preventDefault();
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure>')) {
            e.target.parentElement.parentElement.remove();
            checkUI()
        }
    }

}

function clearItem() {
    while (itemList.firstChild) {
        console.log(itemList.firstChild)
        itemList.removeChild(itemList.firstChild)
    }
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
    const items = itemList.querySelectorAll('li')
    if (items.length === 0) {
        clearBtn.style.display = 'none'
        itemFilter.style.display = 'none'
    } else {
        clearBtn.style.display = 'block'
        itemFilter.style.display = 'block'
    }
}


//Add event listener
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', clearItem)
itemFilter.addEventListener('input', filterItem)

checkUI()