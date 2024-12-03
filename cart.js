let cart = JSON.parse(localStorage.getItem('cart')) || {};

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function updateCartIndicator() {
    const cartIndicator = document.querySelector('.cart-indicator');
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.count, 0);
    cartIndicator.textContent = `: ${totalItems} items`;
}

function updateCartDetails() {
    const cartContent = document.querySelector('.cart-content');
    cartContent.innerHTML = '';
    
    if (Object.keys(cart).length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.classList.add('cart-item');
        emptyMessage.textContent = 'Please select some items.';
        cartContent.appendChild(emptyMessage);
    } 
    else {
        const tableContainer = document.createElement('div');
        tableContainer.classList.add('cart-table-container');

        const table = document.createElement('table');
        table.classList.add('cart-table');

        const headerRow = document.createElement('tr');
        const nameHeader = document.createElement('th');
        nameHeader.textContent = 'Item';
        const quantityHeader = document.createElement('th');
        quantityHeader.textContent = 'Quantity';
        headerRow.appendChild(nameHeader);
        headerRow.appendChild(quantityHeader);
        table.appendChild(headerRow);

        Object.values(cart).forEach(item => {
            const row = document.createElement('tr');
            const itemName = document.createElement('td');
            itemName.textContent = item.name;
            const itemQuantity = document.createElement('td');
            itemQuantity.textContent = item.count;

            row.appendChild(itemName);
            row.appendChild(itemQuantity);
            table.appendChild(row);
        });

        tableContainer.appendChild(table);
        cartContent.appendChild(tableContainer);
    }
}



function createCartContent() {
    let cartContent = document.querySelector('.cart-content');
    if (!cartContent) {
        cartContent = document.createElement('div');
        cartContent.classList.add('cart-content');
        document.querySelector('.cart-flex').appendChild(cartContent);
    }
    updateCartDetails();
}

function generateWhatsAppMessage() {
    if (Object.keys(cart).length === 0) {
        alert('Your cart is empty!');
        return;
    }
    const message = Object.values(cart)
        .map(item => `- ${item.name} x${item.count}`)
        .join('\n');
    const encodedMessage = encodeURIComponent(
        `Hi, I would like to purchase the following items:\n\n${message}`
    );
    const whatsappURL = `https://api.whatsapp.com/send?phone=917018004112&text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

function addItem(itemName) {
    if (cart[itemName]) {
        cart[itemName].count += 1;
    } else {
        cart[itemName] = { name: itemName, count: 1 };
    }
    saveCart();
    updateCartIndicator();
    updateCartDetails();
}


function decreaseItem(itemName) {
    if (cart[itemName]) {
        cart[itemName].count -= 1;
        if (cart[itemName].count <= 0) {
            delete cart[itemName];
        }
        saveCart();
        updateCartIndicator();
        updateCartDetails();
    }
}

function emptyCart(){
    cart = {};
    saveCart();
    updateCartIndicator();
    updateCartDetails();

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const countDisplay = card.querySelector('.item-count');
        countDisplay.textContent = 0;
    });
}

function updateItemCountDisplay(card, itemName) {
    const countDisplay = card.querySelector('.item-count');
    countDisplay.textContent = cart[itemName]?.count || 0;
}


function displayProducts(products) {
    const container = document.querySelector('.product-grid-container');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        
        const title = document.createElement('div');
        title.classList.add('product-title');
        title.textContent = product.title;

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const addButton = document.createElement('button');
        addButton.classList.add('add-button');
        addButton.textContent = '+';
        addButton.addEventListener('click', () => {
            addItem(product.title);
            updateItemCountDisplay(productCard, product.title);
        });

        const countDisplay = document.createElement('span');
        countDisplay.classList.add('item-count');
        countDisplay.textContent = cart[product.title]?.count || 0;

        const decreaseButton = document.createElement('button');
        decreaseButton.classList.add('decrease-button');
        decreaseButton.textContent = '-';
        decreaseButton.addEventListener('click', () => {
            decreaseItem(product.title);
            updateItemCountDisplay(productCard, product.title);
        });

        buttonContainer.appendChild(decreaseButton);
        buttonContainer.appendChild(countDisplay);
        buttonContainer.appendChild(addButton);

        productCard.appendChild(img);
        productCard.appendChild(title);
        productCard.appendChild(buttonContainer);
        container.appendChild(productCard);
    });

    updateCartIndicator();
}

