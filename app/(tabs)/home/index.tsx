import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { setGlobalTasks } from '../../../types/store';
import { globalTasks } from '../../../types/store';
import { Task } from '../../../types/task';

const SESI_COLORS = {
  primaryRed: '#E30613',
  darkBlue: '#002F6C',
  textGray: '#555555',
  lightGray: '#F4F5F7',
  white: '#FFFFFF',
};

const categoryColors = {
  Prova: '#E30613',
  Trabalho: '#002F6C',
  Atividade: '#28A745',
};

export default function HomeScreen() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    setShowWelcome(true);

    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setTasks([...globalTasks]);
    }, [])
  );

  const filteredTasks = tasks.filter((task) =>
    task.titulo.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.taskCard}
      onPress={() =>
        router.push({
          pathname: '/home/details',
          params: { ...item },
        })
      }
      onLongPress={() => {
        if (confirm(`Deseja excluir "${item.titulo}"?`)) {
          const novasTasks = globalTasks.filter(
            task => task.id !== item.id
          );

          setGlobalTasks(novasTasks);
          setTasks([...novasTasks]);
        }
      }}
    >
      <View style={styles.brandIndicator} />

      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.taskTitle}>{item.titulo}</Text>

          <Text style={styles.taskDate}>
            📅 {item.data}
          </Text>

          <Text style={styles.professorText}>
            👨‍🏫 {item.professor}
          </Text>
        </View>

        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                categoryColors[item.categoria] + '20',
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              {
                color: categoryColors[item.categoria],
              },
            ]}
          >
            {item.categoria}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {showWelcome && (
        <View style={styles.toastOverlay}>
          <View style={styles.toast}>
            <Text style={styles.toastEmoji}>👋</Text>

            <Text style={styles.toastTitle}>
              Bem-vinda!
            </Text>

            <Text style={styles.toastText}>
              Sesi Task Manager
            </Text>
          </View>
        </View>
      )}

      <View style={styles.headerInfo}>
        <Text style={styles.welcomeText}>
          Olá, Isadora 👋
        </Text>

        <Text style={styles.taskCount}>
          Você possui {tasks.length} tarefa
          {tasks.length !== 1 ? 's' : ''} pendente
          {tasks.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Pesquisar tarefa..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📝</Text>

            <Text style={styles.emptyTitle}>
              Nenhuma tarefa encontrada
            </Text>

            <Text style={styles.emptySubtitle}>
              Tente pesquisar outro nome ou adicione uma nova tarefa
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SESI_COLORS.lightGray,
  },

  toastOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },

  toast: {
    width: '75%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 22,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  toastEmoji: {
    fontSize: 34,
    marginBottom: 10,
  },

  toastTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#002F6C',
    textAlign: 'center',
  },

  toastText: {
    fontSize: 14,
    color: '#555555',
    marginTop: 6,
    textAlign: 'center',
  },

  headerInfo: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: SESI_COLORS.darkBlue,
  },

  taskCount: {
    fontSize: 14,
    color: SESI_COLORS.textGray,
    marginTop: 4,
    marginBottom: 12,
  },

  searchInput: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 15,
    elevation: 2,
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  taskCard: {
    backgroundColor: SESI_COLORS.white,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  brandIndicator: {
    width: 6,
    backgroundColor: SESI_COLORS.primaryRed,
  },

  cardContent: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textContainer: {
    flex: 1,
    paddingRight: 8,
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: SESI_COLORS.darkBlue,
  },

  taskDate: {
    fontSize: 13,
    color: SESI_COLORS.textGray,
    marginTop: 4,
    fontWeight: '500',
  },

  professorText: {
    fontSize: 13,
    color: SESI_COLORS.textGray,
    marginTop: 3,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
  },

  emptyIcon: {
    fontSize: 50,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: SESI_COLORS.darkBlue,
    marginTop: 12,
  },

  emptySubtitle: {
    fontSize: 14,
    color: SESI_COLORS.textGray,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});