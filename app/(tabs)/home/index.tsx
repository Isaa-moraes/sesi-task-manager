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

export default function HomeScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  // Atualiza a lista toda vez que a tela ganha foco de navegação
  useFocusEffect(
    useCallback(() => {
      setTasks([...globalTasks]);
    }, [])
  );

  // Função para renderizar cada item da lista (Exibe apenas as info básicas solicitadas)
  const renderItem = ({ item }: { item: Task }) => (
    <TouchableOpacity 
      style={styles.taskCard}
      onPress={() => router.push({ pathname: '/home/details', params: { ...item } })}
    >
      {/* Indicador lateral vermelho para dar o destaque da marca */}
      <View style={styles.brandIndicator} />
      
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.taskTitle}>{item.titulo}</Text>
          <Text style={styles.taskDate}>Prazo: {item.data}</Text>
        </View>
        
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.categoria}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma tarefa pendente! 🎉</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: SESI_COLORS.lightGray 
  },
  list: { 
    padding: 16 
  },
  taskCard: { 
    backgroundColor: SESI_COLORS.white, 
    borderRadius: 8, 
    marginBottom: 12, 
    flexDirection: 'row', 
    overflow: 'hidden', 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
  badge: { 
    backgroundColor: '#E6EFF9', 
    paddingHorizontal: 10, 
    paddingVertical: 6, 
    borderRadius: 20, 
  },
  badgeText: { 
    fontSize: 11, 
    fontWeight: '700', 
    color: SESI_COLORS.darkBlue,
    textTransform: 'uppercase',
  },
  emptyText: { 
    textAlign: 'center', 
    color: '#777777', 
    marginTop: 40, 
    fontSize: 16,
    fontWeight: '500'
  }
});
