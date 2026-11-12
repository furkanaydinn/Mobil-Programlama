import { createContext, useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import type { StaticScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

interface Product { id: number; name: string; price: number }
const PRODUCTS: Product[] = [
  { id: 1, name: 'Klavye', price: 450 },
  { id: 2, name: 'Fare', price: 250 },
  { id: 3, name: 'Kulaklık', price: 300 },
];

// Sepet: ürün id'leri. State App'te, ekranlar context ile okur.
interface CartValue { cart: number[]; add: (id: number) => void }
const CartContext = createContext<CartValue>({ cart: [], add: () => {} });

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      {PRODUCTS.map((p) => (
        <Pressable
          key={p.id}
          style={styles.row}
          onPress={() => navigation.navigate('Product', { id: p.id })}
        >
          <Text style={styles.name}>{p.name}</Text>
          <Text>{p.price} TL</Text>
        </Pressable>
      ))}
    </View>
  );
};

type ProductProps = StaticScreenProps<{ id: number }>;

const ProductScreen = ({ route }: ProductProps) => {
  const { add } = useContext(CartContext);
  const product = PRODUCTS.find((p) => p.id === route.params.id);
  if (!product) return <Text>Ürün bulunamadı</Text>;
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{product.name}</Text>
      <Text>{product.price} TL</Text>
      <Pressable style={styles.btn} onPress={() => add(product.id)}>
        <Text style={styles.btnText}>Sepete ekle</Text>
      </Pressable>
    </View>
  );
};

const CartScreen = () => {
  const { cart } = useContext(CartContext);
  const items = cart.map((id) => PRODUCTS.find((p) => p.id === id));
  const total = items.reduce((sum, p) => sum + (p ? p.price : 0), 0);
  return (
    <View style={styles.screen}>
      {items.map((p, i) => (
        <Text key={i}>{p ? p.name : '?'}</Text>
      ))}
      <Text style={styles.title}>Toplam: {total} TL</Text>
    </View>
  );
};

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Profil</Text>
  </View>
);

const Tabs = createBottomTabNavigator({
  screens: {
    Home: { screen: HomeScreen, options: { title: 'Ana Sayfa' } },
    Cart: { screen: CartScreen, options: { title: 'Sepet' } },
    Profile: { screen: ProfileScreen, options: { title: 'Profil' } },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Main: { screen: Tabs, options: { headerShown: false } },
    Product: { screen: ProductScreen, options: { title: 'Ürün Detayı' } },
  },
});

const Navigation = createStaticNavigation(RootStack);

type RootStackType = typeof RootStack;
declare module '@react-navigation/native' {
  interface RootNavigator extends RootStackType {}
}

const App = () => {
  const [cart, setCart] = useState<number[]>([]);
  const add = (id: number) => setCart([...cart, id]);
  return (
    <CartContext.Provider value={{ cart, add }}>
      <Navigation />
    </CartContext.Provider>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, gap: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 14, backgroundColor: '#EFF6FF', borderRadius: 8 },
  name: { fontWeight: 'bold' },
  title: { fontSize: 22, fontWeight: 'bold' },
  btn: { backgroundColor: '#2563EB', padding: 14, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
});

export default App;