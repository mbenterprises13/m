// Some DOM manipulation
const cartCounter = document.querySelector('.cart-counter');

const offset = cartCounter.offsetTop;

window.addEventListener('scroll', function() {
    if (window.scrollY > offset) {
        cartCounter.classList.add('stick-to-top');
    } else {
        cartCounter.classList.remove('stick-to-top');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    createCartContent();
});

fetch('../../Navbar/navbar.html')
.then(response => response.text())
.then(data => document.getElementById('navbar').innerHTML = data);

fetch('../../Data/Crafts & Hobbyist/Crafts&Hobbyist.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load JSON data');
        }
        return response.json();
    })
    .then(products => {
        displayProducts(products);
    })
    .catch(error => {
        console.error('Error:', error);
        const container = document.querySelector('.product-grid-container');
        container.innerHTML = '<p>Failed to load products.</p>';
    });

