// 3. TYPESCRIPT: props tipi ve useState<Tip>
// Bu dosya React Native projesinde (App.tsx gibi) çalışır; Node ile çalıştırılmaz.
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

// --- Props tipi: bileşenin dışarıdan alacağı verilerin şekli ---
interface ProfileCardProps {
  name: string;
  job: string;
  avatarUrl?: string; // isteğe bağlı props
}

const ProfileCard = ({ name, job }: ProfileCardProps) => (
  <View>
    <Text>{name}</Text>
    <Text>{job}</Text>
  </View>
);

// --- Props olarak fonksiyon (olay): tipi () => void ---
interface AddButtonProps {
  onAdd: () => void;
}

const AddButton = ({ onAdd }: AddButtonProps) => (
  <Pressable onPress={onAdd}>
    <Text>Ekle</Text>
  </Pressable>
);

interface Task {
  id: number;
  title: string;
  done: boolean;
}

const App = () => {
  // --- useState<Tip>: state'in tuttuğu değerin tipi ---
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>('Ece');
  // Boş dizi ile başlıyorsak tipi yazmak gerekir
  const [tasks, setTasks] = useState<Task[]>([]);
  // Başta değer yoksa: Tip | null
  const [selected, setSelected] = useState<Task | null>(null);

  const add = () => {
    setCount(count + 1);
    setTasks([...tasks, { id: count, title: 'Yeni', done: false }]);
  };

  return (
    <View>
      <ProfileCard name={name} job="Tasarımcı" />
      <Text>{count}</Text>
      <Text>{tasks.length}</Text>
      <Text>{selected ? selected.title : 'Seçili görev yok'}</Text>
      <AddButton onAdd={add} />
      {/* Örnek kullanımlar aşağıda */}
      {/* <ProfileCard name="Ece" /> hata: job eksik */}
      {/* <ProfileCard name="Ece" job={5} /> hata: job string olmalı */}
    </View>
  );
};

export default App;
