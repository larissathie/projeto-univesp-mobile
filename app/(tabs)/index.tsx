import { Colors } from '@/constants/colors';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const API_URL = 'https://projeto-integrador-ii-p8kb.onrender.com';

export default function HomeScreen() {
  const [encomendasPendentes, setEncomendasPendentes] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);
  const [nomeUsuario, setNomeUsuario] = useState('Morador');

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const responseEncomendas = await fetch(`${API_URL}/api/encomendas/101`);
      const dadosEncomendas = await responseEncomendas.json();

      setEncomendasPendentes(dadosEncomendas.length || 0);

      const responseFinanceiro = await fetch(`${API_URL}/api/financeiro/relatorio`);
      const dadosFinanceiro = await responseFinanceiro.json();

      setTotalGastos(dadosFinanceiro.resumo.total_saidas || 0);
      setNomeUsuario('Morador');
    } catch (error) {
      console.log('Erro ao carregar dados:', error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.header}>
          <Text style={styles.greeting}>Olá, {nomeUsuario}</Text>
          <Text style={styles.subtitle}>Bem-vindo ao app do condomínio</Text>
        </View>

        <View style={styles.cardsRow}>
          <View style={[styles.card, styles.cardBlue]}>
            <Text style={styles.cardNumber}>{encomendasPendentes}</Text>
            <Text style={styles.cardLabel}>Encomendas pendentes</Text>
          </View>

          <View style={[styles.card, styles.cardGreen]}>
            <Text style={styles.cardNumber}>R$ {totalGastos}</Text>
            <Text style={styles.cardLabel}>Total de gastos</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acesso rápido</Text>

          <TouchableOpacity
            style={styles.quickBtn}
            onPress={() => router.push('/(tabs)/encomendas')}
          >
            <Text style={styles.quickBtnIcon}>📦</Text>
            <View>
              <Text style={styles.quickBtnTitle}>Encomendas</Text>
              <Text style={styles.quickBtnSub}>Consultar entregas pendentes</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickBtn}
            onPress={() => router.push('/(tabs)/gastos')}
          >
            <Text style={styles.quickBtnIcon}>💰</Text>
            <View>
              <Text style={styles.quickBtnTitle}>Gastos</Text>
              <Text style={styles.quickBtnSub}>Acompanhar financeiro do condomínio</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 24, gap: 20 },

  header: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 24,
  },

  greeting: { fontSize: 22, fontWeight: '800', color: '#fff' },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 },

  cardsRow: { flexDirection: 'row', gap: 12 },

  card: { flex: 1, borderRadius: 14, padding: 16, gap: 8 },
  cardBlue: { backgroundColor: '#E6F1FB' },
  cardGreen: { backgroundColor: '#E1F5EE' },

  cardNumber: { fontSize: 18, fontWeight: '800', color: Colors.primary },
  cardLabel: { fontSize: 12, color: Colors.textSecondary },

  section: { gap: 10 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  quickBtn: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    elevation: 2,
  },

  quickBtnIcon: { fontSize: 24 },
  quickBtnTitle: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  quickBtnSub: { fontSize: 12, color: Colors.textSecondary },
});
