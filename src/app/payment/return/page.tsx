'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Home, RefreshCw } from 'lucide-react';

interface PaymentData {
  success: boolean;
  transactionId?: string;
  packName?: string;
  amount?: number;
  message?: string;
}

function PaymentReturnContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        // Récupérer les paramètres de l'URL
        const transactionId = searchParams.get('transaction_id');
        const status = searchParams.get('status');
        const packName = searchParams.get('pack');
        const amount = searchParams.get('amount');
        const userId = searchParams.get('user_id');

        if (!transactionId || !userId) {
          setError('Paramètres de paiement manquants');
          setIsLoading(false);
          return;
        }

        // Appeler l'API pour confirmer le paiement
        const response = await fetch('/api/client/confirm-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transactionId,
            status,
            packName,
            amount: amount ? parseInt(amount) : undefined,
            userId
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setPaymentData({
            success: true,
            transactionId,
            packName: data.packName || packName,
            amount: data.amount || (amount ? parseInt(amount) : undefined),
            message: data.message
          });
        } else {
          setError(data.error || 'Erreur lors de la confirmation du paiement');
        }
      } catch (err) {
        console.error('Payment confirmation error:', err);
        setError('Une erreur est survenue lors de la confirmation de votre paiement');
      } finally {
        setIsLoading(false);
      }
    };

    confirmPayment();
  }, [searchParams]);

  const handleGoToDashboard = () => {
    router.push('/client');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <RefreshCw className="h-12 w-12 text-blue-600 animate-spin" />
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Confirmation de votre paiement...
                </h2>
                <p className="text-gray-600">
                  Veuillez patienter pendant que nous vérifions votre transaction.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !paymentData?.success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <RefreshCw className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Erreur de paiement
                </h2>
                <p className="text-gray-600 mb-6">
                  {error || 'Une erreur est survenue lors du traitement de votre paiement.'}
                </p>
                <div className="space-y-2">
                  <Button 
                    onClick={handleGoToDashboard}
                    className="w-full"
                  >
                    Retour au tableau de bord
                  </Button>
                  <Button 
                    onClick={handleGoHome}
                    variant="outline"
                    className="w-full"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Accueil
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Paiement réussi ! 🎉
              </h2>
              <p className="text-gray-600 mb-6">
                Votre abonnement a été activé avec succès.
              </p>
              
              {paymentData.packName && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-blue-900 mb-1">
                        Pack {paymentData.packName}
                  </h3>
                  {paymentData.amount && (
                    <p className="text-blue-700 text-sm">
                      {paymentData.amount.toLocaleString()} FCFA
                    </p>
                  )}
                  {paymentData.transactionId && (
                    <p className="text-blue-600 text-xs mt-1">
                      Transaction: {paymentData.transactionId}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Button 
                  onClick={handleGoToDashboard}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Accéder à mon tableau de bord
                </Button>
                <Button 
                  onClick={handleGoHome}
                  variant="outline"
                  className="w-full"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Accueil
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentReturnPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <RefreshCw className="h-12 w-12 text-blue-600 animate-spin" />
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Chargement...
                </h2>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <PaymentReturnContent />
    </Suspense>
  );
}