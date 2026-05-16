import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const API_URL = 'https://projeto-integrador-ii-p8kb.onrender.com';

export default function EncomendasScreen() {

  const [encomendas, setEncomendas] = useState<any[]>([]);

  // TROQUE PELO APARTAMENTO REAL DO USUÁRIO
  const apartamento = '101';

  useEffect(() => {

    async function carregarEncomendas() {

      try {

        const response = await fetch(
          `${API_URL}/api/encomendas/${apartamento}`
        );

        const data = await response.json();

        setEncomendas(data);

      } catch (error) {
        console.error('Erro ao carregar encomendas:', error);
      }
    }

    carregarEncomendas();

  }, []);

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.titulo}>
        Encomendas Pendentes
      </Text>

      {encomendas.length === 0 ? (
        <Text>Nenhuma encomenda pendente.</Text>
      ) : (
        encomendas.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.nome}>
              {item.destinatario}
            </Text>

            <Text>
              Data: {item.data}
            </Text>
          </View>
        ))
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },

  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  }

});