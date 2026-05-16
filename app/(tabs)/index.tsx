import { Colors } from '@/constants/colors';
const API_URL = 'https://projeto-integrador-ii-p8kb.onrender.com';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [encomendasPendentes, setEncomendasPendentes] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);
  const [nomeUsuario, setNomeUsuario] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
  try {
    // Encomendas do apartamento 101
    const responseEncomendas = await fetch(`${API_URL}/api/encomendas/101`);
    const dadosEncomendas = await responseEncomendas.json();

    setEncomendasPendentes(dadosEncomendas.length || 0);

    // Dados financeiros
    const responseFinanceiro = await fetch(`${API_URL}/api/financeiro/relatorio`);
    const dadosFinanceiro = await responseFinanceiro.json();

    setTotalGastos(dadosFinanceiro.resumo.total_saidas || 0);

    // Por enquanto, nome fixo
    setNomeUsuario('Morador');

  } catch (error) {
    console.log('Erro ao carregar dados:', error);
  }
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
})};
