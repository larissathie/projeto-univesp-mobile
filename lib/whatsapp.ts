// Integração com Evolution API para envio de notificações via WhatsApp

const EVOLUTION_URL = process.env.EXPO_PUBLIC_EVOLUTION_API_URL;
const EVOLUTION_KEY = process.env.EXPO_PUBLIC_EVOLUTION_API_KEY;

export async function notificarMoradorWhatsApp(
  telefone: string,
  nome: string,
  apartamento: string,
  transportadora: string,
  tipo: string
): Promise<boolean> {
  try {
    const mensagem =
      `📦 *Nova Encomenda - Condo Secure*\n\n` +
      `Olá, *${nome}*! Uma encomenda chegou para você:\n\n` +
      `🏢 Apartamento: ${apartamento}\n` +
      `📬 Transportadora: ${transportadora}\n` +
      `📦 Tipo: ${tipo}\n` +
      `⏰ Chegou agora\n\n` +
      `Retire na portaria com documento de identidade.`;

    const response = await fetch(`${EVOLUTION_URL}/message/sendText/condosecure`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_KEY!,
      },
      body: JSON.stringify({
        number: `55${telefone.replace(/\D/g, '')}`,
        text: mensagem,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
    return false;
  }
}
