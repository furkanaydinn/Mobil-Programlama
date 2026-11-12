import { Platform, StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

interface Person {
  id: number;
  name: string;
  job: string;
  online: boolean;
}

const PEOPLE: Person[] = [
  { id: 1, name: 'Cafer Çelik', job: 'Tasarımcı', online: true },
  { id: 2, name: 'Beyza Çetin', job: 'Mobil Geliştirici', online: false },
  { id: 3, name: 'Baran Katırcı', job: 'Veri Analisti', online: true },
];

interface CardProps {
  name: string;
  job: string;
  online: boolean;
}

const ProfileCard = ({ name, job, online }: CardProps) => (
  <View style={styles.card}>
    <View style={styles.avatar}>
      <Text style={styles.initial}>{name[0]}</Text>
    </View>
    <View style={styles.info}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.job}>{job}</Text>
    </View>
    <View style={[styles.badge, online ? styles.on : styles.off]}>
      <Text style={styles.badgeText}>{online ? 'Çevrimiçi' : 'Meşgul'}</Text>
    </View>
  </View>
);

const Screen = () => {
  const insets = useSafeAreaInsets();
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
      <Text style={styles.header}>Profiller</Text>
      {PEOPLE.map((p) => (
        <ProfileCard key={p.id} name={p.name} job={p.job} online={p.online} />
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
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
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
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 17, fontWeight: 'bold' },
  job: { color: '#6B7280', marginTop: 2 },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  on: { backgroundColor: '#16A34A' },
  off: { backgroundColor: '#9CA3AF' },
  badgeText: { color: 'white', fontSize: 11, fontWeight: 'bold' },
});

export default App;