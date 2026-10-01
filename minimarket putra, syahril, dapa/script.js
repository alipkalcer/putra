// Daftar produk dengan gambar
const products = [
    { id: 1, name: 'AWM', price: 2000000000, img: 'img/awm.jpg' },
    { id: 2, name: 'SHOTGUN', price: 10000000, img: 'img/shotgun.jpg' },
    { id: 3, name: 'AK47', price: 25000000, img: 'img/ak47.jpg' },
    { id: 4, name: 'DESERT EAGLE', price: 7000000, img: 'img/desert.jpg' },
    { id: 5, name: 'MP5', price: 15000000, img: 'img/mp5.jpg' },
    { id: 6, name: 'MINIUZI', price: 17000000, img: 'img/miniuzi.jpg' }
];

// Keranjang belanja
let cart = [];

// Fungsi untuk menampilkan daftar produk
function displayProducts() {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rp ${product.price}</p>
            <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
        `;

        productsContainer.appendChild(productDiv);
    });
}

// Fungsi untuk menambah produk ke keranjang belanja
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Fungsi untuk menampilkan isi keranjang belanja
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x ${item.quantity} - Rp ${item.price * item.quantity}`;
        cartItemsContainer.appendChild(listItem);

        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = totalPrice;
}

// Fungsi untuk melakukan checkout
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const payment = prompt(`Total belanja Anda Rp ${total}. Masukkan jumlah pembayaran:`);

    if (payment >= total) {
        alert(`Pembayaran berhasil! Kembalian Anda: Rp ${payment - total}`);
        cart = [];
        updateCart();
    } else {
        alert('Uang Anda tidak mencukupi.');
    }
}

// Event listener untuk tombol checkout
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Tampilkan produk saat halaman dimuat
displayProducts();