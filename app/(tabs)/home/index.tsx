import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
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

  useFocusEffect(
    useCallback(() => {
      setTasks([...globalTasks]);
    }, [])
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

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📝</Text>

            <Text style={styles.emptyTitle}>
              Nenhuma tarefa cadastrada
            </Text>

            <Text style={styles.emptySubtitle}>
              Clique no botão + para criar uma tarefa
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