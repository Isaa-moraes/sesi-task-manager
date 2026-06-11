import { StyleSheet, Text, View } from 'react-native';

export default function SobreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sesi Task Manager</Text>
      <Text style={styles.text}>Desenvolvido por: Isadora Moraes</Text>
      <Text style={styles.text}>RM: 2625</Text>
      <Text style={styles.text}>Curso: DS - Desenvolvimento de Sistemas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 16 
  },
  text: { 
    fontSize: 16, 
    color: '#444', 
    marginBottom: 8 
   }
});
