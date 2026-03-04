import { useState } from 'react';
import { Rocket, Clock, Video, MessageCircle, Lock, Gift } from 'lucide-react';
import { generatePixPayment, checkPaymentStatus } from '../services/pushinpayService';

interface ProductCardProps {
  title: string;
  price: number;
  oldPrice: number;
  discount: string;
  benefits: Array<{ icon: string; text: string }>;
  videoUrl: string;
  productName: string;
}

export function ProductCard({ title, price, oldPrice, discount, benefits, videoUrl, productName }: ProductCardProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [pixCode, setPixCode] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleGeneratePix = async () => {
    setLoading(true);
    try {
      const response = await generatePixPayment(price, productName);
      setPixCode(response.pixCode);
      setTransactionId(response.transactionId);
      setShowPayment(true);
    } catch (error) {
      alert('Erro ao gerar PIX. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    alert('Código PIX copiado!');
  };

  const handleVerifyPayment = async () => {
    setVerifying(true);
    try {
      const response = await checkPaymentStatus(transactionId);
      if (response.paid) {
        alert('Pagamento confirmado! Você receberá o acesso em instantes.');
        setShowPayment(false);
      } else {
        alert('Pagamento ainda não identificado. Aguarde alguns instantes e tente novamente.');
      }
    } catch (error) {
      alert('Erro ao verificar pagamento. Tente novamente.');
    } finally {
      setVerifying(false);
    }
  };

  const getBenefitIcon = (icon: string) => {
    switch (icon) {
      case 'video':
        return <Video size={18} className="text-amber-500" />;
      case 'message':
        return <MessageCircle size={18} className="text-amber-500" />;
      case 'lock':
        return <Lock size={18} className="text-amber-500" />;
      default:
        return <Gift size={18} className="text-amber-500" />;
    }
  };

  if (showPayment) {
    return (
      <div className="bg-[#2a2a2a]/90 rounded-3xl border border-amber-500/10 p-6 flex flex-col gap-5">
        <h3 className="text-2xl font-bold text-center text-amber-500">Pagamento via PIX</h3>

        <div className="bg-[#1f1f1f] rounded-2xl p-4 border border-amber-500/20">
          <p className="text-lg font-semibold text-white">💰 Valor: R$ {price.toFixed(2).replace('.', ',')}</p>
        </div>

        <div className="bg-[#1f1f1f] rounded-2xl p-4 border border-amber-500/20">
          <h4 className="text-white font-semibold mb-3">Como pagar:</h4>
          <ol className="text-gray-300 text-sm space-y-2">
            <li><span className="text-amber-500 font-bold">1.</span> Copie o código PIX abaixo</li>
            <li><span className="text-amber-500 font-bold">2.</span> Abra o app do seu banco</li>
            <li><span className="text-amber-500 font-bold">3.</span> Escolha PIX Copia e Cola</li>
            <li><span className="text-amber-500 font-bold">4.</span> Cole o código e confirme</li>
            <li><span className="text-amber-500 font-bold">5.</span> Clique em "Verificar Pagamento"</li>
          </ol>
        </div>

        <div className="bg-[#1f1f1f] rounded-2xl p-4 border border-amber-500/20">
          <p className="text-xs text-gray-400 mb-2">Código PIX:</p>
          <p className="text-white text-xs break-all font-mono">{pixCode}</p>
        </div>

        <button
          onClick={handleCopyPix}
          className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition font-bold text-white text-lg flex items-center justify-center gap-2"
        >
          📋 Copiar Código PIX
        </button>

        <button
          onClick={handleVerifyPayment}
          disabled={verifying}
          className="w-full py-4 rounded-2xl bg-amber-600 hover:bg-amber-700 transition font-bold text-white text-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {verifying ? 'Verificando...' : '✔️ Verificar Pagamento'}
        </button>

        <p className="text-center text-gray-400 text-sm">Após pagar, clique em "Verificar Pagamento"</p>
      </div>
    );
  }

  return (
    <div className="bg-[#2a2a2a]/90 rounded-3xl border border-amber-500/10 overflow-hidden">
      <div className="relative">
        <div className="absolute top-3 left-3 bg-red-600 px-3 py-1 rounded-md z-10">
          <span className="text-white text-xs font-bold uppercase">Prévia</span>
        </div>
        <video
          src={videoUrl}
          loop
          muted
          autoPlay
          playsInline
          className="w-full h-[240px] object-cover bg-black"
        />
      </div>

      <div className="p-5 flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-center text-amber-500">{title}</h3>

        <div className="bg-red-950/50 border border-red-800/50 rounded-xl p-3 flex items-center justify-center gap-2">
          <Clock size={18} className="text-red-400" />
          <span className="text-white font-semibold">Apenas R$ {price.toFixed(2).replace('.', ',')} HOJE</span>
        </div>

        <div className="space-y-2">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-3">
              {getBenefitIcon(benefit.icon)}
              <span className="text-gray-200">{benefit.text}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#1f1f1f] rounded-2xl p-4 border border-amber-500/20 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="text-gray-400 line-through text-sm">R$ {oldPrice.toFixed(2).replace('.', ',')}</span>
            <span className="text-amber-500 text-3xl font-bold">R$ {price.toFixed(2).replace('.', ',')}</span>
          </div>
          <span className="text-green-400 font-semibold text-sm">{discount} • Acesso Vitalício</span>
        </div>

        <button
          onClick={handleGeneratePix}
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-amber-600 hover:bg-amber-700 transition font-bold text-white text-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Rocket size={20} />
          {loading ? 'Gerando...' : 'GERAR PIX'}
        </button>

        <p className="text-center text-gray-400 text-sm">Pagamento via PIX • Liberação Imediata</p>
      </div>
    </div>
  );
}
