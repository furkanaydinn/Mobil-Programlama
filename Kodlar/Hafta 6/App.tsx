import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

interface Person {
  id: number;
  name: string;
  job: string;
}

const PEOPLE: Person[] = [
  { id: 1, name: 'Yusuf Aydın', job: 'Tasarımcı' },
  { id: 2, name: 'Yigit Kale', job: 'Mobil Geliştirici' },
  { id: 3, name: 'Sunanur Çelik', job: 'Veri Analisti' },
];

interface CardProps {
  person: Person;
  following: boolean;
  onToggle: () => void;
}

const ProfileCard = ({ person, following, onToggle }: CardProps) => (
  <View style={styles.card}>
    <View style={styles.avatar}>
      <Text style={styles.initial}>{person.name[0]}</Text>
    </View>
    <View style={styles.info}>
      <Text style={styles.name}>{person.name}</Text>
      <Text style={styles.job}>{person.job}</Text>
    </View>
    <Pressable
      style={[styles.btn, following && styles.btnOn]}
      onPress={onToggle}
    >
      <Text style={[styles.btnText, following && styles.btnTextOn]}>
        {following ? 'Takip ediliyor' : 'Takip et'}
      </Text>
    </Pressable>
  </View>
);

const Screen = () => {
  const insets = useSafeAreaInsets();
  const [followed, setFollowed] = useState<number[]>([]);

  const toggle = (id: number) =>
    setFollowed(
      followed.includes(id)
        ? followed.filter((i) => i !== id)
        : [...followed, id],
    );

  return (
    <View
      style={[
        styles.screen,
        {
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 16,
          paddingLeft: insets.left + 16,
          paddingRight: insets.right + 16,
        },
      ]}
    >
      <Text style={styles.header}>Takip edilen: {followed.length}</Text>
      {PEOPLE.map((p) => (
        <ProfileCard
          key={p.id}
          person={p}
          following={followed.includes(p.id)}
          onToggle={() => toggle(p.id)}
        />
      ))}
    </View>
  );
};

const App = () => (
  <SafeAreaProvider>
    <Screen />
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 4 },
    }),
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 16, fontWeight: 'bold' },
  job: { color: '#6B7280', marginTop: 2 },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2563EB',
    backgroundColor: 'white',
  },
  btnOn: { backgroundColor: '#2563EB' },
  btnText: { color: '#2563EB', fontSize: 13, fontWeight: 'bold' },
  btnTextOn: { color: 'white' },
});

export default App;