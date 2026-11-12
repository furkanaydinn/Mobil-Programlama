// 2. DİZİ VE NESNE İŞLEME: map, filter, reduce, spread, rest, destructuring
// Çalıştırma: node 2_dizi_ve_nesne_isleme.js

const prices = [120, 45, 300, 80];

// --- map: her elemandan yeni bir eleman üretir (yeni dizi) ---
const withTax = prices.map((p) => p * 1.2);
console.log(withTax); // [144, 54, 360, 96]

// --- filter: koşulu sağlayanları seçer (yeni dizi) ---
const cheap = prices.filter((p) => p < 100);
console.log(cheap); // [45, 80]

// --- reduce: diziyi tek bir değere indirir ---
const total = prices.reduce((sum, p) => sum + p, 0);
console.log(total); // 545

// --- Zincirleme: 100'den ucuzları seçip adlarını yaz ---
const products = [
  { name: 'Kablo', price: 45 },
  { name: 'Klavye', price: 450 },
  { name: 'Fare', price: 80 },
];
const cheapNames = products
  .filter((p) => p.price < 100)
  .map((p) => p.name);
console.log(cheapNames); // ['Kablo', 'Fare']

// --- Spread (...): açar, yeni kopya üretir ---
const base = [1, 2];
const more = [...base, 3];
console.log(base, more); // [1, 2] [1, 2, 3]

const user = { name: 'Ece', age: 20 };
const older = { ...user, age: 21 }; // sonradan yazılan alan öncekini ezer
console.log(user.age, older.age); // 20 21

// --- Rest (...): kalanları toplar ---
const sumAll = (...numbers) => numbers.reduce((s, n) => s + n, 0);
console.log(sumAll(1, 2, 3, 4)); // 10

const [firstApp, ...otherApps] = ['Mail', 'Harita', 'Kamera'];
console.log(firstApp, otherApps); // Mail ['Harita', 'Kamera']

// --- Destructuring: nesneden ve diziden değer çıkarmak ---
const person = { fullName: 'Ece', city: 'İzmir' };
const { fullName, city } = person;
console.log(fullName, city); // Ece İzmir

const [first] = ['Mail', 'Harita', 'Kamera'];
console.log(first); // Mail

// Yeniden adlandırma ve varsayılan değer
const { age: personAge = 18 } = person;
console.log(personAge); // 18

// Parametrede destructuring (React Native'de props böyle alınır)
const label = ({ fullName, city }) => `${fullName} (${city})`;
console.log(label(person)); // Ece (İzmir)

// --- State güncelleme kalıbı (6. hafta): değiştirmeden yeni dizi üret ---
let items = ['a', 'b'];
items = [...items, 'c']; // ekleme
items = items.filter((i) => i !== 'a'); // silme
items = items.map((i) => (i === 'b' ? 'B' : i)); // güncelleme
console.log(items); // ['B', 'c']
