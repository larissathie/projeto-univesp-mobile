-- =============================================
-- CONDO SECURE — Script do banco de dados
-- Cole este SQL no Supabase SQL Editor
-- =============================================

-- Tabela de moradores
CREATE TABLE moradores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  cpf TEXT UNIQUE NOT NULL,
  telefone TEXT NOT NULL,
  apartamento TEXT NOT NULL,
  bloco TEXT,
  perfil TEXT NOT NULL DEFAULT 'morador',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de encomendas
CREATE TABLE encomendas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  morador_id UUID REFERENCES moradores(id) ON DELETE CASCADE,
  transportadora TEXT NOT NULL,
  tipo TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'aguardando',
  notificado_whatsapp BOOLEAN DEFAULT FALSE,
  data_chegada TIMESTAMPTZ DEFAULT NOW(),
  data_retirada TIMESTAMPTZ,
  observacoes TEXT
);

-- Tabela de gastos
CREATE TABLE gastos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descricao TEXT,
  valor NUMERIC(10,2) NOT NULL,
  categoria TEXT NOT NULL,
  mes_referencia TEXT NOT NULL,
  comprovante_url TEXT,
  criado_por UUID REFERENCES moradores(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE moradores ENABLE ROW LEVEL SECURITY;
ALTER TABLE encomendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE gastos ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso
CREATE POLICY "Sindico acessa tudo em moradores" ON moradores
  FOR ALL USING (auth.jwt() ->> 'perfil' = 'sindico');

CREATE POLICY "Morador ve seus proprios dados" ON moradores
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Sindico gerencia encomendas" ON encomendas
  FOR ALL USING (auth.jwt() ->> 'perfil' = 'sindico');

CREATE POLICY "Morador ve suas encomendas" ON encomendas
  FOR SELECT USING (
    morador_id IN (SELECT id FROM moradores WHERE email = auth.email())
  );

CREATE POLICY "Todos moradores veem gastos" ON gastos
  FOR SELECT USING (TRUE);

CREATE POLICY "Sindico gerencia gastos" ON gastos
  FOR ALL USING (auth.jwt() ->> 'perfil' = 'sindico');
