import type { ReactNode } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

interface CardProps {
  children: ReactNode;
}

function Card({ children }: CardProps) {
  return (
    <View style={{ padding: 16, marginBottom: 12, backgroundColor: '#EFF6FF' }}>
      {children}
    </View>
  );
}

interface ProfileCardProps {
  name: string;
  job: string;
  avatarUrl?: string;
}

function ProfileCard({ name, job, avatarUrl }: ProfileCardProps) {
  const follow = () => console.log(name);
  return (
    <Card>
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          style={{ width: 64, height: 64 }}
        />
      ) : null}
      <Text style={{ fontWeight: 'bold' }}>{name}</Text>
      <Text>{job}</Text>
      <Pressable onPress={follow} style={{ paddingTop: 8 }}>
        <Text style={{ color: '#2563EB' }}>Takip Et</Text>
      </Pressable>
    </Card>
  );
}

function App() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <ProfileCard name="Berkay Yılbat" job="Tasarımcı" />
      <ProfileCard name="Nevin Bingöl" job="Mobil Geliştirici" />
      <ProfileCard
        name="Efe Küçük"
        job="Veri Analisti"
        avatarUrl="https://example.com/efe.jpg"
      />
    </ScrollView>
  );
}

export default App;