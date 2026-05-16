import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
  if (!email || !senha) {
    Alert.alert('Atenção', 'Preencha e-mail e senha.');
    return;
  }

  setLoading(true);

  setTimeout(() => {
    setLoading(false);
    router.replace('/(tabs)');
  }, 500);
}

  async function handleSignUp() {
  Alert.alert(
    'Cadastro',
    'O cadastro deve ser realizado pelo síndico no sistema web.'
  );
}

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Cabeçalho com logo */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/new-logo-cond.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.appName}>Condo Secure</Text>
        <Text style={styles.tagline}>PORTARIA DIGITAL INTELIGENTE</Text>
      </View>

      {/* Formulário */}
      <View style={styles.form}>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-MAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor={Colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>SENHA</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={Colors.textSecondary}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.btnLogin}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.btnLoginText}>Acessar</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignUp}>
          <Text style={{ textAlign: 'center', color: Colors.primary }}>
            Criar conta
          </Text>
        </TouchableOpacity>

        <Text style={styles.helpText}>
          Não tem conta? Fale com o síndico do seu condomínio.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 80,
    paddingBottom: 80,
    alignItems: 'center',
    gap: 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginTop: 8,
  },
  tagline: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1.5,
  },
  form: {
    margin: 24,
    padding: 24,
    backgroundColor: Colors.white,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    gap: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: Colors.textPrimary,
    backgroundColor: Colors.white,
  },
  btnLogin: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  btnLoginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  helpText: {
    textAlign: 'center',
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});
