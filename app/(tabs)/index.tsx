import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Colors } from '@/constants/colors';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [encomendasPendentes, setEncomendasPendentes] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);
  const [nomeUsuario, setNomeUsuario] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 👇 Nome (se existir tabela)
      const { data: morador } = await supabase
        .from('moradores')
        .select('nome')
        .eq('email', user.email)
        .single();

      if (morador?.nome) {
        setNomeUsuario(morador.nome.split(' ')[0]);
      }

      // 👇 Encomendas (seguro)
      const { count } = await supabase
        .from('encomendas')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'aguardando');

      setEncomendasPendentes(count || 0);

      // 👇 Gastos (seguro)
      const mesAtual = new Date().toISOString().slice(0, 7);

      const { data: gastos } = await supabase
        .from('gastos')
        .select('valor')
        .eq('mes_referencia', mesAtual);

      const total = gastos?.reduce((acc, g) => acc + Number(g.valor), 0) || 0;
      setTotalGastos(total);

    } catch (error) {
      console.log('Erro ao carregar dados:', error);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Olá, {nomeUsuario || 'morador'}! 👋
        </Text>
        <Text style={styles.subtitle}>Bem-vindo ao Condo Secure</Text>
      </View>

      <View style={styles.cardsRow}>
        <TouchableOpacity
          style={[styles.card, styles.cardBlue]}
          onPress={() => router.push('/(tabs)/encomendas')}
        >
          <Text style={styles.cardNumber}>{encomendasPendentes}</Text>
          <Text style={styles.cardLabel}>Encomendas{'\n'}aguardando</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardGreen]}
          onPress={() => router.push('/(tabs)/gastos')}
        >
          <Text style={styles.cardNumber}>
            R$ {totalGastos.toFixed(2)}
          </Text>
          <Text style={styles.cardLabel}>Gastos do{'\n'}mês</Text>
        </TouchableOpacity>
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
            <Text style={styles.quickBtnSub}>Ver todas</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickBtn}
          onPress={() => router.push('/(tabs)/gastos')}
        >
          <Text style={styles.quickBtnIcon}>💰</Text>
          <View>
            <Text style={styles.quickBtnTitle}>Gastos</Text>
            <Text style={styles.quickBtnSub}>Ver detalhes</Text>
          </View>
        </TouchableOpacity>

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
