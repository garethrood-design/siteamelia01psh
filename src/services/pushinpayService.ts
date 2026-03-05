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
    const response = await fetch(`${API_URL}/pix/cash-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        description: productName,
        reference: `ref_${Date.now()}`
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erro da API:', errorData);
      throw new Error('Erro ao gerar PIX');
    }

    const data = await response.json();

    return {
      success: true,
      pixCode: data.qrcode || data.brcode || data.pixCode || '',
      transactionId: data.id || data.transactionId || '',
      qrCode: data.qrcode_url || data.qrCode || ''
    };
  } catch (error) {
    console.error('Erro ao gerar PIX:', error);
    throw error;
  }
}

export async function checkPaymentStatus(transactionId: string): Promise<CheckPaymentResponse> {
  try {
    const response = await fetch(`${API_URL}/pix/cash-in/${transactionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao verificar pagamento');
    }

    const data = await response.json();

    return {
      success: true,
      paid: data.status === 'paid' || data.status === 'completed',
      transactionId: data.id || transactionId
    };
  } catch (error) {
    console.error('Erro ao verificar pagamento:', error);
    throw error;
  }
}
