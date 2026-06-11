import { Stack, useRouter } from 'expo-router';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeStack() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Image source={require('../../../assets/images/logo-sesi.jpg')} style={styles.logo} resizeMode="contain" />
            </View>
          ),

          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/home/cadastro')} style={{ marginRight: 8 }}>
              <Ionicons name="add-circle" size={28} color="#E30613" />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerShadowVisible: true,
        }} 
      />
      <Stack.Screen name="details" options={{ title: 'Detalhes da Tarefa', headerTintColor: '#002F6C' }} />
      <Stack.Screen name="cadastro" options={{ title: 'Nova Tarefa', headerTintColor: '#002F6C' }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerContainer: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start' 
  },
  logo: { 
    width: 100, 
    height: 35 
   },
});
