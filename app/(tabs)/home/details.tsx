// Tela de detalhes da tarefa, exibindo informações completas
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen() {
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Título:</Text>
        <Text style={styles.value}>{params.titulo}</Text>

        <Text style={styles.label}>Data de Entrega:</Text>
        <Text style={styles.value}>{params.data}</Text>

        <Text style={styles.label}>Categoria:</Text>
        <Text style={styles.value}>{params.categoria}</Text>

        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.value}>{params.descricao}</Text>

        <Text style={styles.label}>Professor:</Text>
        <Text style={styles.value}>{params.professor}</Text>
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
    padding: 24, 
    borderRadius: 8, 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    marginBottom: 8,
  },
  taskTitle: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#002F6C',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  label: { 
    fontSize: 13, 
    color: '#E30613',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 12,
  },
  value: { 
    fontSize: 16, 
    fontWeight: '500', 
    color: '#333333',
    marginTop: 2,
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 15,
    color: '#555555',
    lineHeight: 22,
    marginTop: 4,
  }
});