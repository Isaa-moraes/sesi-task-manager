import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { globalTasks, setGlobalTasks } from '../../../types/store';
import { Task } from '../../../types/task';

export default function CadastroScreen() {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState('');
  const [professor, setProfessor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState<'Trabalho' | 'Prova' | 'Atividade'>('Atividade');

  const salvarTarefa = () => {
    if (!titulo || !data || !professor || !descricao) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const novaTarefa: Task = {
      id: Math.random().toString(),
      titulo,
      data,
      categoria,
      descricao,
      professor
    };

    setGlobalTasks([...globalTasks, novaTarefa]);
    router.replace('/home'); // Volta atualizando a lista
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.label}>Título da Tarefa</Text>
        <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholder="Ex: Relatório de Química" />

        <Text style={styles.label}>Data de Entrega</Text>
        <TextInput style={styles.input} value={data} onChangeText={setData} placeholder="Ex: 25/06/2026" />

        <Text style={styles.label}>Professor</Text>
        <TextInput style={styles.input} value={professor} onChangeText={setProfessor} placeholder="Nome do docente" />

        <Text style={styles.label}>Descrição Detalhada</Text>
        <TextInput style={[styles.input, styles.textArea]} value={descricao} onChangeText={setDescricao} placeholder="O que deve ser feito?" multiline />

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categoryContainer}>
          {(['Atividade', 'Trabalho', 'Prova'] as const).map((cat) => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.catButton, categoria === cat && styles.catButtonActive]}
              onPress={() => setCategoria(cat)}
            >
              <Text style={[styles.catText, categoria === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={salvarTarefa}>
          <Text style={styles.saveButtonText}>Cadastrar Tarefa</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F4F5F7', 
    padding: 16 
  },
  formCard: { 
    backgroundColor: '#FFFFFF', 
    padding: 20, 
    borderRadius: 8, 
    elevation: 3, 
    marginBottom: 30 
  },
  label: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#002F6C', 
    marginTop: 12, 
    marginBottom: 4 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#DDD', 
    borderRadius: 6, 
    padding: 10, 
    fontSize: 15, 
    backgroundColor: '#FFF' 
  },
  textArea: { 
    height: 80, 
    textAlignVertical: 'top' 
  },
  categoryContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 8, 
    marginBottom: 20 
  },
  catButton: { 
    flex: 1, 
    paddingVertical: 10, 
    borderWidth: 1, 
    borderColor: '#DDD', 
    borderRadius: 20, 
    alignItems: 'center', 
    marginHorizontal: 4 
  },
  catButtonActive: { 
    backgroundColor: '#002F6C', 
    borderColor: '#002F6C' 
  },
  catText: { 
    fontSize: 13, 
    color: '#555', 
    fontWeight: '500' 
  },
  catTextActive: { 
    color: '#FFF', 
    fontWeight: 'bold' 
  },
  saveButton: { 
    backgroundColor: '#E30613', 
    padding: 14, 
    borderRadius: 6, 
    alignItems: 'center', 
    marginTop: 10 
  },
  saveButtonText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: '700' 
  }
});