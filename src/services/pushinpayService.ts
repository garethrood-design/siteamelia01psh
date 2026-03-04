const API_URL = import.meta.env.VITE_PUSHINPAY_API_URL;
const API_TOKEN = import.meta.env.VITE_PUSHINPAY_TOKEN;

export interface GeneratePixResponse {
  success: boolean;
  pixCode: string;
  transactionId: string;
  qrCode?: string;
}

export interface CheckPaymentResponse {
  success: boolean;
  paid: boolean;
  transactionId: string;
}

export async function generatePixPayment(amount: number, productName: string): Promise<GeneratePixResponse> {
  try {
    const response = await fetch(`${API_URL}/generate-pix`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify({
        amount,
        productName,
        timestamp: Date.now()
      })
    });

    if (!response.ok) {
      throw new Error('Erro ao gerar PIX');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao gerar PIX:', error);
    throw error;
  }
}

export async function checkPaymentStatus(transactionId: string): Promise<CheckPaymentResponse> {
  try {
    const response = await fetch(`${API_URL}/check-payment/${transactionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao verificar pagamento');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao verificar pagamento:', error);
    throw error;
  }
}
