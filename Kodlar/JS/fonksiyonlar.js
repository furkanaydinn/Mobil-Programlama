// 1. FONKSİYONLAR: oluşturma, çağırma, parametreli/parametresiz, varsayılan parametre
// Çalıştırma: node 1_fonksiyonlar.js

// --- Oluşturma (tanımlama): fonksiyon bildirimi ---
function sayHello() {
  console.log('Merhaba');
}

// --- Çağırma: tanımlamak çalıştırmaz, parantezle çağırırız ---
sayHello(); // Merhaba

// --- Parametresiz ve parametreli ---
function add(a, b) {
  return a + b; // return: sonucu çağırana verir
}
console.log(add(2, 3)); // 5

// --- Fonksiyon ifadesi ---
const multiply = function (a, b) {
  return a * b;
};
console.log(multiply(2, 3)); // 6

// --- Ok fonksiyonu: tek ifade, süslü parantez ve return gerekmez ---
const double = (x) => x * 2;
console.log(double(4)); // 8

// --- Ok fonksiyonu: gövdeli ---
const greet = (name) => {
  const text = `Merhaba ${name}`;
  return text;
};
console.log(greet('Zeynep')); // Merhaba Zeynep

// --- Varsayılan parametre: argüman verilmezse kullanılır ---
function welcome(name = 'Misafir') {
  return `Hoş geldin ${name}`;
}
console.log(welcome()); // Hoş geldin Misafir
console.log(welcome('Ece')); // Hoş geldin Ece

// --- Varsayılan parametre, ok fonksiyonuyla ---
const price = (amount, tax = 0.2) => amount * (1 + tax);
console.log(price(100)); // 120
console.log(price(100, 0.5)); // 150

// --- Callback: fonksiyonu başka fonksiyona parametre olarak vermek ---
function repeat(times, action) {
  for (let i = 1; i <= times; i++) {
    action(i);
  }
}
repeat(3, (n) => console.log('Basış', n));
