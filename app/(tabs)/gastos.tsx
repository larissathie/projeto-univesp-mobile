import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const API_URL = 'https://projeto-integrador-ii-p8kb.onrender.com';

export default function Gastos() {
  const [financeiro, setFinanceiro] = useState<any>(null);

  useEffect(() => {
    async function carregarFinanceiro() {
      try {
        const response = await fetch(`${API_URL}/api/financeiro/relatorio`);
        const data = await response.json();

        setFinanceiro(data);
      } catch (error) {
        console.error('Erro ao carregar financeiro:', error);
      }
    }

    carregarFinanceiro();
  }, []);

  if (!financeiro) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Resumo Financeiro</Text>

      <View style={styles.card}>
        <Text>Saldo Atual: R$ {financeiro.resumo.saldo_atual}</Text>
        <Text>Total Entradas: R$ {financeiro.resumo.total_entradas}</Text>
        <Text>Total Saídas: R$ {financeiro.resumo.total_saidas}</Text>
      </View>

      <Text style={styles.subtitulo}>Entradas</Text>

      {financeiro.detalhes.entradas.map((entrada: any) => (
        <View key={entrada.id} style={styles.item}>
          <Text>{entrada.descricao}</Text>
          <Text>R$ {entrada.valor}</Text>
          <Text>{entrada.data}</Text>
        </View>
      ))}

      <Text style={styles.subtitulo}>Saídas</Text>

      {financeiro.detalhes.saidas.map((saida: any) => (
        <View key={saida.id} style={styles.item}>
          <Text>{saida.descricao}</Text>
          <Text>R$ {saida.valor}</Text>
          <Text>{saida.categoria}</Text>
          <Text>{saida.data}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  item: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
});