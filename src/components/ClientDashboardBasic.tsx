'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Plus, 
  CreditCard,
  CheckCircle,
  Crown,
  Zap,
  FileText
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  subscriptionPack: string;
}

interface Pack {
  id: string;
  name: string;
  price: number;
  features: string[];
  isActive: boolean;
  maxDocuments?: number | null;
  maxTemplates?: number | null;
  hasAIGeneration: boolean;
  paymentLink?: string | null;
  durationMonths: number;
}

export default function ClientDashboard() {
  const router = useRouter();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Récupérer les informations de l'utilisateur et les packs au chargement
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les infos utilisateur
        const userResponse = await fetch('/api/auth/me');
        const userData = await userResponse.json();
        
        if (userData.success && userData.user) {
          setUser(userData.user);
        }

        // Récupérer les packs disponibles
        const packsResponse = await fetch('/api/admin/packs');
        const packsData = await packsResponse.json();
        
        if (packsData.success && packsData.packs) {
          // Filtrer pour ne montrer que les packs payants (starter exclu)
          const paidPacks = packsData.packs.filter((pack: Pack) => pack.price > 0);
          setPacks(paidPacks);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const documentTemplates = [
    { id: 1, name: 'CV Moderne', category: 'Professionnel', description: 'Design épuré et professionnel' },
    { id: 2, name: 'Lettre de motivation', category: 'Professionnel', description: 'Lettres convaincantes' },
    { id: 3, name: 'Contrat de location', category: 'Administratif', description: 'Contrats juridiques' },
    { id: 4, name: 'Facture', category: 'Commercial', description: 'Factures professionnelles' },
    { id: 5, name: 'Devis', category: 'Commercial', description: 'Devis détaillés' },
    { id: 6, name: 'Rapport de projet', category: 'Professionnel', description: 'Rapports structurés' }
  ];

  const handleCreateDocument = () => {
    // Si l'utilisateur a un pack payant, il peut créer des documents
    if (user?.subscriptionPack && user.subscriptionPack !== 'Starter') {
      alert(`Fonctionnalité de création de documents avec votre ${user.subscriptionPack}`);
      // TODO: Rediriger vers la page de création de documents
    } else {
      // Rediriger directement vers l'achat d'un pack
      setShowSubscriptionModal(true);
    }
  };

  const handleManageSubscription = () => {
    setShowSubscriptionModal(true);
  };

  const handleSelectPack = async (pack: Pack) => {
    setSelectedPack(pack);
    setShowSubscriptionModal(false);
    
    try {
      // Récupérer les infos utilisateur pour la vérification
      const userResponse = await fetch('/api/auth/me');
      const userData = await userResponse.json();
      
      if (!userData.success || !userData.user) {
        alert('Erreur: utilisateur non connecté');
        return;
      }

      // Utiliser directement le lien de paiement Chariow du pack
      if (pack.paymentLink && pack.paymentLink !== '#') {
        // Afficher un message pendant que l'utilisateur effectue le paiement
        alert(`Redirection vers le paiement sécurisé Chariow pour le ${pack.name} - ${pack.price.toLocaleString()} FCFA/mois\n\nVous allez être redirigé vers la page de paiement sécurisée.\nAprès le paiement, vous serez redirigé vers votre tableau de bord avec votre nouvel abonnement.`);
        
        // Rediriger directement vers le lien Chariow
        window.open(pack.paymentLink, '_blank');
        
        // Optionnel: Vérifier périodiquement si le paiement a été effectué
        const checkPayment = setInterval(async () => {
          try {
            const userResponse = await fetch('/api/auth/me');
            const userData = await userResponse.json();
            
            if (userData.success && userData.user && userData.user.subscriptionPack !== 'Starter' && userData.user.subscriptionPack) {
              clearInterval(checkPayment);
              // Le paiement a été réussi, recharger la page pour mettre à jour l'interface
              window.location.reload();
            }
          } catch (error) {
            console.error('Error checking payment status:', error);
          }
        }, 5000); // Vérifier toutes les 5 secondes
        
        // Arrêter de vérifier après 5 minutes
        setTimeout(() => {
          clearInterval(checkPayment);
        }, 300000);
      } else {
        alert(`Ce pack n'a pas de lien de paiement configuré. Veuillez contacter l'administrateur.`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Erreur lors de la redirection vers le paiement');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de votre tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/')}
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                ← Accueil
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Docafrik</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-gray-100 text-gray-800">
                Pack {user?.subscriptionPack || 'Starter'}
              </Badge>
              <button 
                onClick={() => router.push('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de bord client
          </h1>
          <p className="text-gray-600">
            Bienvenue dans votre espace personnel
          </p>
        </div>

        {/* Current Pack Status */}
        <div className={`${user?.subscriptionPack === 'Starter' ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'} border rounded-lg p-4 mb-8`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`${user?.subscriptionPack === 'Starter' ? 'text-orange-800' : 'text-green-800'} font-semibold`}>
                Votre abonnement actuel
              </h2>
              <p className={`${user?.subscriptionPack === 'Starter' ? 'text-orange-700' : 'text-green-700'}`}>
                {user?.subscriptionPack || 'Starter'} - {
                  user?.subscriptionPack === 'Starter' 
                    ? 'Aucune fonctionnalité accessible. Souscrivez à un pack pour commencer.' 
                    : 'Accès complet à toutes les fonctionnalités'
                }
              </p>
            </div>
            {user?.subscriptionPack === 'Starter' && (
              <Button 
                onClick={handleManageSubscription}
                className="bg-orange-600 text-white hover:bg-orange-700"
              >
                <Crown className="h-4 w-4 mr-2" />
                Choisir un pack
              </Button>
            )}
          </div>
        </div>

        {/* Message pour les utilisateurs Starter */}
        {user?.subscriptionPack === 'Starter' && (
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-8 mb-8 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-orange-800 mb-3">
                Bienvenue dans Docafrik !
              </h2>
              <p className="text-orange-700 mb-6 text-lg">
                Votre pack Starter ne vous donne accès à aucune fonctionnalité. 
                Choisissez l'un de nos packs payants pour commencer à créer des documents professionnels.
              </p>
              <Button 
                onClick={handleManageSubscription}
                className="bg-orange-600 text-white hover:bg-orange-700 px-8 py-3 text-lg"
              >
                <Crown className="h-5 w-5 mr-2" />
                Découvrir nos packs
              </Button>
            </div>
          </div>
        )}

        {/* Simple Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Mes Documents</h2>
            <p className="text-gray-600 mb-4">
              {user?.subscriptionPack === 'Starter' 
                ? 'Vous devez souscrire à un pack pour accéder aux fonctionnalités de création de documents.'
                : 'Vous n\'avez pas encore de documents. Créez votre premier document !'
              }
            </p>
            <Button 
              onClick={handleCreateDocument}
              className="w-full"
              variant={user?.subscriptionPack === 'Starter' ? "default" : "default"}
            >
              {user?.subscriptionPack === 'Starter' ? (
                <>
                  <Crown className="h-4 w-4 mr-2" />
                  Choisir un abonnement
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Créer un document
                </>
              )}
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Mon Abonnement</h2>
            <p className="text-gray-600 mb-4">
              Votre abonnement actuel : {user?.subscriptionPack || 'Starter'}
            </p>
            <Button 
              onClick={handleManageSubscription}
              variant="outline" 
              className="w-full"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Gérer mon abonnement
            </Button>
          </div>
        </div>

        {/* Templates Preview - uniquement pour les utilisateurs avec un pack payant */}
        {user?.subscriptionPack && user.subscriptionPack !== 'Starter' && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Modèles disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documentTemplates.map((template) => (
                <Card key={template.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <FileText className="h-4 w-4 text-blue-500" />
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      {template.category}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        alert(`Création d'un document avec le modèle: ${template.name}`);
                      }}
                    >
                      <FileText className="h-3 w-3 mr-2" />
                      Utiliser ce modèle
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Subscription Modal */}
      <Dialog open={showSubscriptionModal} onOpenChange={setShowSubscriptionModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-2xl">
              <Crown className="h-6 w-6" />
              <span>Tarifs simples et transparents</span>
            </DialogTitle>
            <DialogDescription className="text-lg">
              Choisissez le pack qui correspond à vos besoins
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto my-8">
            {packs.map((pack) => (
              <Card 
                key={pack.id} 
                className={`bg-white border rounded-xl p-8 transition-all ${
                  pack.name === 'Pack 2 Pro' 
                    ? 'border-2 border-blue-600 shadow-lg' 
                    : 'border border-gray-200 hover:border-blue-300 hover:shadow-lg'
                }`}
              >
                {pack.name === 'Pack 2 Pro' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Populaire
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{pack.name.replace('Pack ', '')}</h3>
                  <p className="text-sm text-gray-600">
                    {pack.name === 'Pack 1 Essentiel' && 'Pour les besoins basiques'}
                    {pack.name === 'Pack 2 Pro' && 'Pour les professionnels'}
                    {pack.name === 'Pack 3 Complet' && 'Accès illimité'}
                  </p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-semibold tracking-tight">{pack.price.toLocaleString()}</span>
                    <span className="text-gray-600 ml-2">FCFA/mois</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">
                      {pack.maxDocuments === null ? 'Documents illimités' : `${pack.maxDocuments} documents/mois`}
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">
                      {pack.maxTemplates === null ? 'Toutes les catégories' : `${pack.maxTemplates} modèles`}
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">
                      {pack.hasAIGeneration ? 'Génération par IA' : 'Modèles de base'}
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Export PDF et Word</span>
                  </div>
                  {pack.name === 'Pack 2 Pro' && (
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Chat IA Coach</span>
                    </div>
                  )}
                  {pack.name === 'Pack 3 Complet' && (
                    <>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Chat IA Coach 24/7</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Support prioritaire</span>
                      </div>
                    </>
                  )}
                </div>
                
                <Button 
                  className={`w-full ${
                    pack.name === 'Pack 2 Pro' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'border border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelectPack(pack)}
                  variant={pack.name === 'Pack 2 Pro' ? "default" : "outline"}
                >
                  {pack.name === 'Pack 2 Pro' ? (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Choisir ce pack
                    </>
                  ) : (
                    'Choisir ce pack'
                  )}
                </Button>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center items-center pt-4 border-t">
            <p className="text-sm text-gray-600">
              Paiement sécurisé via Chariow • Annulation à tout moment
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}