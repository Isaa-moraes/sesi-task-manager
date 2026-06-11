import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { globalTasks, setGlobalTasks } from '../../../types/store';

export default function DetailsScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const concluirTarefa = () => {
    // Filtra removendo a tarefa com o ID selecionado
    const listaFiltrada = globalTasks.filter(task => task.id !== params.id);
    setGlobalTasks(listaFiltrada);
    
    alert('Tarefa concluída e removida com sucesso!');
    router.replace('/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.categoryBadge}>{params.categoria}</Text>
        <Text style={styles.taskTitle}>{params.titulo}</Text>
        
        <View style={styles.divider} />

        <Text style={styles.label}>Prazo de Entrega:</Text>
        <Text style={styles.value}>{params.data}</Text>

        <Text style={styles.label}>Professor Responsável:</Text>
        <Text style={styles.value}>{params.professor}</Text>

        <Text style={styles.label}>Descrição da Tarefa:</Text>
        <Text style={styles.descriptionText}>{params.descricao}</Text>

        {/* Botão de Concluir adicionado na parte inferior do Card */}
        <TouchableOpacity style={styles.doneButton} onPress={concluirTarefa}>
          <Text style={styles.doneButtonText}>Marcar como Concluída</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#F4F5F7' 
  },
  card: { 
    backgroundColor: '#FFFFFF', 
    padding: 24, borderRadius: 8, 
    elevation: 3 
  },
  categoryBadge: { 
    alignSelf: 'flex-start', 
    backgroundColor: '#E6EFF9', 
    color: '#002F6C', 
    fontSize: 11, 
    fontWeight: '700', 
    paddingHorizontal: 10,
    paddingVertical: 4, 
    borderRadius: 12, 
    textTransform: 'uppercase', 
    marginBottom: 8 
  },
  taskTitle: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#002F6C' 
  },
  divider: { 
    height: 1, 
    backgroundColor: '#E0E0E0', 
    marginVertical: 16 
  },
  label: { 
    fontSize: 13, 
    color: '#E30613', 
    fontWeight: '600', 
    textTransform: 'uppercase', 
    marginTop: 12 
  },
  value: { 
    fontSize: 16, 
    fontWeight: '500', 
    color: '#333333', 
    marginTop: 2, 
    marginBottom: 4 
  },
  descriptionText: { 
    fontSize: 15, 
    color: '#555555', 
    lineHeight: 22, 
    marginTop: 4, 
    marginBottom: 20 
  },
  doneButton: { 
    backgroundColor: '#002F6C', 
    padding: 14, 
    borderRadius: 6, 
    alignItems: 'center', 
    marginTop: 10 
  },
  doneButtonText: { 
    color: '#FFFFFF', 
    fontSize: 15, 
    fontWeight: '700' 
   }
});