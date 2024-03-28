let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

// Alışveriş sepetini açma butonuna tıklanınca tetiklenen olay
openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

// Alışveriş sepetini kapatma butonuna tıklanınca tetiklenen olay
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    // Ürün bilgilerini içeren dizi
    // Her ürün, bir id, name, image ve price içerir
    // image: Resim dosyasının adı veya yolu
    {
        id: 1,
        name: 'Apple Watch Ultra',
        image: 'watch.jpeg',
        price: 24999 
    },
    {
        id: 2,
        name: 'İphone 14 ',
        image: 'iphone.jpeg',
        price: 35999 
    },
    {
        id: 3,
        name: 'Airpods Pro 2 ',
        image: 'airpods.jpeg',
        price: 6500 
    },
    {
        id: 4,
        name: 'Airpods Pro 2',
        image: 'airpods.jpeg',
        price: 6500 
    },
    {
        id: 5,
        name: 'İphone 14',
        image: 'iphone.jpeg',
        price: 35999 
    },
    {
        id: 6,
        name: 'Apple Watch Ultra',
        image: 'watch.jpeg',
        price: 24999 
    }
    // ... Diğer ürünler
];

let listCards = [];

// Sayfa yüklendiğinde çalışan fonksiyon
function initApp() {
    products.forEach((value, key) => {
        // Her ürün için bir HTML div elementi oluşturup alışveriş listesine ekler
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="/images/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Satın Al</button>`;
        list.appendChild(newDiv); 
    });
}

// Sepete ürün eklemek için kullanılan fonksiyon
function addToCard(key) {
    if (listCards[key] == null) {
        // Ürünü sepete ekle ve miktarını 1 olarak ayarla
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    // Sepeti güncelle
    reloadCard();
}

// Sepeti güncelleyen fonksiyon
function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    // Sepetteki her ürün için liste öğesi oluştur ve listeye ekle
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="/images/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });

    // Toplam miktarı ve ürün sayısını güncelle
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

// Ürün miktarını değiştiren fonksiyon
function changeQuantity(key, quantity) {
    if (quantity == 0) {
        // Eğer miktar 0 ise ürünü sepetten çıkar
        delete listCards[key];
    } else {
        // Aksi halde miktarı güncelle
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }

    // Sepeti güncelle
    reloadCard();
}

// Sayfa yüklendiğinde initApp fonksiyonunu çalıştır
initApp();
