import { Redirect } from 'expo-router';

export default function Index() {
  // Redireciona automaticamente para a aba home inicial
  return <Redirect href="/home" />;
}

//  corrige o erro Unmatched Route 