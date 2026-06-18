import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { globalTasks, setGlobalTasks } from '../../../types/store';

const categoryColors = {
  Prova: '#E30613',
  Trabalho: '#002F6C',
  Atividade: '#28A745',
};

export default function DetailsScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const categoria =
    (params.categoria as keyof typeof categoryColors) ?? 'Atividade';

  const concluirTarefa = () => {
    if (!confirm('Deseja marcar esta tarefa como concluída?')) {
      return;
    }

    const taskId = String(params.id);

    const listaFiltrada = globalTasks.filter(
      (task) => task.id !== taskId
    );

    setGlobalTasks(listaFiltrada);

    alert('Tarefa concluída com sucesso!');

    router.replace('/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View
          style={[
            styles.categoryBadge,
            {
              backgroundColor:
                categoryColors[categoria] + '20',
            },
          ]}
        >
          <Text
            style={[
              styles.categoryBadgeText,
              {
                color: categoryColors[categoria],
              },
            ]}
          >
            {params.categoria}
          </Text>
        </View>

        <Text style={styles.taskTitle}>
          {params.titulo}
        </Text>

        <View style={styles.divider} />

        <View style={styles.infoBlock}>
          <Text style={styles.label}>
            📅 Prazo de Entrega
          </Text>

          <Text style={styles.value}>
            {params.data}
          </Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>
            👨‍🏫 Professor Responsável
          </Text>

          <Text style={styles.value}>
            {params.professor}
          </Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>
            📝 Descrição da Tarefa
          </Text>

          <Text style={styles.descriptionText}>
            {params.descricao}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.doneButton}
          onPress={concluirTarefa}
        >
          <Text style={styles.doneButtonText}>
            ✓ Marcar como Concluída
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
    padding: 16,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },

  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },

  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  taskTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#002F6C',
    lineHeight: 30,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
  },

  infoBlock: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#E30613',
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },

  descriptionText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
  },

  doneButton: {
    backgroundColor: '#28A745',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});