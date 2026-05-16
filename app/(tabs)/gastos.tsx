import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/colors';

const API_URL = 'https://projeto-integrador-ii-p8kb.onrender.com';

export default function Gastos() {
  const [financeiro, setFinanceiro] = useState<any>(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarFinanceiro();
  }, []);

  async function carregarFinanceiro() {
    try {
      const response = await fetch(`${API_URL}/api/financeiro/relatorio`);
      const data = await response.json();

      console.log('DADOS FINANCEIRO:', data);

      setFinanceiro(data);
    } catch (error) {
      console.log('Erro ao carregar financeiro:', error);
      setErro('Erro ao carregar dados financeiros.');
    }
  }

  if (erro) {
    return (
      <View style={styles.loading}>
        <Text>{erro}</Text>
      </View>
    );
  }

  if (!financeiro) {
    return (
      <View style={styles.loading}>
        <Text>Carregando financeiro...</Text>
      </View>
    );
  }

  const saldo = Number(financeiro.resumo?.saldo_atual || 0);
  const entradas = Number(financeiro.resumo?.total_entradas || 0);
  const saidas = Number(financeiro.resumo?.total_saidas || 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Financeiro</Text>
          <Text style={styles.headerSub}>Resumo dos gastos do condomínio</Text>
        </View>

        <View style={styles.saldoCard}>
          <Text style={styles.saldoLabel}>Saldo atual</Text>
          <Text style={styles.saldoValor}>R$ {saldo.toFixed(2)}</Text>
        </View>

        <View style={styles.cardsRow}>
          <View style={[styles.card, styles.cardEntrada]}>
            <Text style={styles.cardLabel}>Entradas</Text>
            <Text style={styles.cardValor}>R$ {entradas.toFixed(2)}</Text>
          </View>

          <View style={[styles.card, styles.cardSaida]}>
            <Text style={styles.cardLabel}>Saídas</Text>
            <Text style={styles.cardValor}>R$ {saidas.toFixed(2)}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Entradas</Text>

        {financeiro.detalhes?.entradas?.map((entrada: any) => (
          <View key={`entrada-${entrada.id}`} style={styles.item}>
            <View>
              <Text style={styles.itemTitle}>{entrada.descricao}</Text>
              <Text style={styles.itemDate}>{entrada.data}</Text>
            </View>

            <Text style={styles.valorEntrada}>
              + R$ {Number(entrada.valor).toFixed(2)}
            </Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Saídas</Text>

        {financeiro.detalhes?.saidas?.map((saida: any) => (
          <View key={`saida-${saida.id}`} style={styles.item}>
            <View>
              <Text style={styles.itemTitle}>{saida.descricao}</Text>
              <Text style={styles.itemDate}>{saida.categoria} • {saida.data}</Text>
            </View>

            <Text style={styles.valorSaida}>
              - R$ {Number(saida.valor).toFixed(2)}
            </Text>
          </View>
        ))}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    padding: 24,
    gap: 18,
  },

  header: {
    backgroundColor: Colors.primary,
    padding: 24,
    borderRadius: 18,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
  },

  headerSub: {
    color: 'rgba(255,255,255,0.75)',
    marginTop: 6,
    fontSize: 14,
  },

  saldoCard: {
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 18,
    elevation: 3,
  },

  saldoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },

  saldoValor: {
    fontSize: 30,
    fontWeight: '800',
    color: Colors.primary,
    marginTop: 6,
  },

  cardsRow: {
    flexDirection: 'row',
    gap: 12,
  },

  card: {
    flex: 1,
    padding: 18,
    borderRadius: 16,
  },

  cardEntrada: {
    backgroundColor: '#E1F5EE',
  },

  cardSaida: {
    backgroundColor: '#FDE8E8',
  },

  cardLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  cardValor: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 6,
    color: Colors.textPrimary,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 8,
  },

  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },

  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  itemDate: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },

  valorEntrada: {
    color: '#16825D',
    fontWeight: '800',
  },

  valorSaida: {
    color: '#D9364A',
    fontWeight: '800',
  },
});