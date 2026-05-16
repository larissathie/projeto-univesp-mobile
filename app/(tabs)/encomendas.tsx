import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/colors';

const API_URL = 'https://projeto-integrador-ii-p8kb.onrender.com';

export default function Encomendas() {
  const [encomendas, setEncomendas] = useState<any[]>([]);

  const apartamento = '101';

  useEffect(() => {
    carregarEncomendas();
  }, []);

  async function carregarEncomendas() {
    try {
      const response = await fetch(`${API_URL}/api/encomendas/${apartamento}`);
      const data = await response.json();

      setEncomendas(data);
    } catch (error) {
      console.log('Erro ao carregar encomendas:', error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Encomendas</Text>
          <Text style={styles.headerSub}>
            Acompanhe as entregas disponíveis na portaria
          </Text>
        </View>

        <View style={styles.resumoCard}>
          <Text style={styles.resumoLabel}>Pendentes</Text>
          <Text style={styles.resumoNumero}>{encomendas.length}</Text>
          <Text style={styles.resumoTexto}>encomenda(s) aguardando retirada</Text>
        </View>

        <Text style={styles.sectionTitle}>Lista de encomendas</Text>

        {encomendas.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyTitle}>Nenhuma encomenda pendente</Text>
            <Text style={styles.emptyText}>
              Quando uma encomenda chegar, ela aparecerá aqui.
            </Text>
          </View>
        ) : (
          encomendas.map((item: any) => (
            <View key={item.id} style={styles.item}>
              <View style={styles.iconBox}>
                <Text style={styles.icon}>📦</Text>
              </View>

              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>
                  {item.destinatario}
                </Text>

                <Text style={styles.itemDate}>
                  Chegada: {item.data}
                </Text>

                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Pendente</Text>
                </View>
              </View>
            </View>
          ))
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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

  resumoCard: {
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 18,
    elevation: 3,
  },

  resumoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },

  resumoNumero: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.primary,
    marginTop: 4,
  },

  resumoTexto: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
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
    borderRadius: 16,
    flexDirection: 'row',
    gap: 14,
    elevation: 2,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#E6F1FB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontSize: 24,
  },

  itemContent: {
    flex: 1,
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },

  itemDate: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },

  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF3CD',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 10,
  },

  statusText: {
    color: '#856404',
    fontSize: 12,
    fontWeight: '700',
  },

  emptyCard: {
    backgroundColor: '#fff',
    padding: 28,
    borderRadius: 18,
    alignItems: 'center',
    elevation: 2,
  },

  emptyIcon: {
    fontSize: 42,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textPrimary,
  },

  emptyText: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
  },
});