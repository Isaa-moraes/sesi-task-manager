import { Stack } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

export default function HomeStack() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Image 
                source={require('../../../assets/images/logo-sesi.jpg')} 
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerShadowVisible: true, 
        }} 
      />
      <Stack.Screen 
        name="details" 
        options={{ 
          title: 'Detalhes da Tarefa',
          headerTintColor: '#002F6C', 
        }} 
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: 120,
    height: 40,
  },
});
