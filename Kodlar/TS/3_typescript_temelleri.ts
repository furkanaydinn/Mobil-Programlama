
// --- Temel tipler ve tip çıkarımı ---
const title: string = 'Mobil Programlama';
let week: number = 3;
const isOnline: boolean = true;
let nickname: string | undefined;

// week = 'üç'; // Hata: string, number değil
console.log(title, week, isOnline, nickname);

let count = 0; // TypeScript tipi başlangıç değerinden çıkarır: number
// count = 'bir'; // Hata
console.log(count);

// --- Dizi tipi ---
const scores: number[] = [90, 75];
const names: Array<string> = [];
console.log(scores, names);

// --- type: takma ad, union ve literal tipler ---
type Platform = 'android' | 'ios';
type Id = number | string;
type Point = { x: number; y: number };

const open = (p: Platform, id: Id) => {
  console.log(`${p}: ${id}`);
};
open('android', 7);
// open('web', 7); // Hata: 'web' Platform değil

const origin: Point = { x: 0, y: 0 };
console.log(origin);

// --- interface: nesnenin şekli ---
interface User {
  id: number;
  name: string;
  email?: string; // ? : isteğe bağlı alan
}
const ece: User = { id: 1, name: 'Ece' };
const label = (u: User): string => `${u.id}-${u.name}`;
console.log(label(ece));

// --- readonly: oluşturulduktan sonra değiştirilemez ---
interface Config {
  readonly apiUrl: string;
  timeout?: number;
}
const cfg: Config = { apiUrl: 'https://api.example.com' };
// cfg.apiUrl = 'x'; // Hata: salt okunur
const t = cfg.timeout ?? 5000;
console.log(cfg.apiUrl, t);

// --- Fonksiyon tipi: parametre ve dönüş tipi ---
const greet = (n: string, role?: string): string =>
  role ? `${role} ${n}` : n;
const area = (w: number, h = 1): number => w * h; // h için varsayılan değer
const log = (msg: string): void => console.log(msg);
log(greet('Ece'));
log(String(area(3)));

// --- Bileşen props'una benzeyen bir şekil: interface ile veri tipi ---
interface ProfileProps {
  name: string;
  job: string;
  avatarUrl?: string;
}
const describe = ({ name, job }: ProfileProps) => `${name}, ${job}`;
console.log(describe({ name: 'Ece', job: 'Tasarımcı' }));

export {};
