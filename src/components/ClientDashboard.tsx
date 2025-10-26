'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Plus, 
  Download, 
  Edit, 
  Trash2, 
  ExternalLink,
  CreditCard,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Pack {
  id: string;
  name: string;
  price: number;
  features: string;
  paymentLink?: string;
  maxDocuments?: number;
  maxTemplates?: number;
  hasAIGeneration: boolean;
  durationMonths: number;
}

interface Document {
  id: string;
  title: string;
  templateName: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}

interface Subscription {
  id: string;
  packType: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'SUSPENDED';
  startDate: string;
  endDate: string;
  pack: Pack;
}

interface DashboardData {
  subscriptions: Subscription[];
  currentPack: string | null;
  packExpiresAt: string | null;
}

export default function ClientDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
    fetchPacks();
    fetchDocuments();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/client/subscriptions');
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchPacks = async () => {
    try {
      const response = await fetch('/api/client/packs');
      if (response.ok) {
        const data = await response.json();
        setPacks(data);
      }
    } catch (error) {
      console.error('Error fetching packs:', error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/client/documents');
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchasePack = async (packId: string) => {
    try {
      const response = await fetch('/api/client/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packId })
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Abonnement créé",
          description: "Votre abonnement a été créé avec succès",
        });

        // Redirect to payment if link available
        if (data.paymentLink) {
          window.open(data.paymentLink, '_blank');
        }

        fetchDashboardData();
      } else {
        throw new Error('Failed to create subscription');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'abonnement",
        variant: "destructive",
      });
    }
  };

  const handleCreateDocument = async (templateId: string, templateName: string) => {
    try {
      const response = await fetch('/api/client/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Nouveau document - ${templateName}`,
          templateId,
          templateName,
          content: `<p>Contenu du document ${templateName}</p>`
        })
      });

      if (response.ok) {
        const document = await response.json();
        toast({
          title: "Document créé",
          description: "Votre document a été créé avec succès",
        });
        fetchDocuments();
      } else {
        throw new Error('Failed to create document');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le document",
        variant: "destructive",
      });
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    try {
      const response = await fetch(`/api/client/documents/${documentId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast({
          title: "Document supprimé",
          description: "Le document a été supprimé avec succès",
        });
        fetchDocuments();
      } else {
        throw new Error('Failed to delete document');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le document",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      ACTIVE: 'default',
      EXPIRED: 'destructive',
      CANCELLED: 'secondary',
      SUSPENDED: 'outline',
      DRAFT: 'secondary',
      PUBLISHED: 'default',
      ARCHIVED: 'outline'
    };

    const colors: Record<string, string> = {
      ACTIVE: 'bg-green-100 text-green-800',
      EXPIRED: 'bg-red-100 text-red-800',
      CANCELLED: 'bg-gray-100 text-gray-800',
      SUSPENDED: 'bg-yellow-100 text-yellow-800',
      DRAFT: 'bg-gray-100 text-gray-800',
      PUBLISHED: 'bg-green-100 text-green-800',
      ARCHIVED: 'bg-blue-100 text-blue-800'
    };

    return (
      <Badge className={colors[status] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Chargement de votre tableau de bord...</p>
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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Docafrik</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#templates" className="text-gray-700 hover:text-blue-600 transition-colors">
                Modèles
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
                Tarifs
              </a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                Fonctionnalités
              </a>
            </nav>
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
            Gérez vos abonnements et créez vos documents
          </p>
        </div>

        {/* Current Subscription Status */}
        {dashboardData?.currentPack && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Votre abonnement actuel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{dashboardData.currentPack}</h3>
                  <p className="text-sm text-gray-600">
                    Expire le {formatDate(dashboardData.packExpiresAt!)}
                  </p>
                </div>
                {getStatusBadge(dashboardData.subscriptions[0]?.status || 'ACTIVE')}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="documents">Mes Documents</TabsTrigger>
            <TabsTrigger value="templates">Modèles</TabsTrigger>
            <TabsTrigger value="subscription">Abonnement</TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Mes Documents</CardTitle>
                    <CardDescription>
                      Gérez tous vos documents créés
                    </CardDescription>
                  </div>
                  <Button onClick={() => window.location.href = '/templates'}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {documents.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Aucun document
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Créez votre premier document à partir d'un modèle
                    </p>
                    <Button onClick={() => window.location.href = '/templates'}>
                      <Plus className="h-4 w-4 mr-2" />
                      Créer un document
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-4">
                          <FileText className="h-8 w-8 text-blue-600" />
                          <div>
                            <h4 className="font-medium">{doc.title}</h4>
                            <p className="text-sm text-gray-600">
                              {doc.templateName} • Modifié le {formatDate(doc.updatedAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(doc.status)}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.location.href = `/editor/${doc.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {/* Download logic */}}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteDocument(doc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Modèles disponibles</CardTitle>
                <CardDescription>
                  Créez des documents à partir des modèles inclus dans votre abonnement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { id: '1', name: 'Lettre de motivation', category: 'Professionnel' },
                    { id: '2', name: 'CV Moderne', category: 'Professionnel' },
                    { id: '3', name: 'Contrat de location', category: 'Administratif' },
                    { id: '4', name: 'Facture', category: 'Commercial' },
                    { id: '5', name: 'Rapport de projet', category: 'Professionnel' },
                    { id: '6', name: 'Devis', category: 'Commercial' },
                  ].map((template) => (
                    <Card key={template.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription>{template.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          className="w-full"
                          onClick={() => handleCreateDocument(template.id, template.name)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Créer à partir de ce modèle
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gérer mon abonnement</CardTitle>
                <CardDescription>
                  Upgradez ou réabonnez-vous à nos packs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {packs.map((pack) => {
                    const features = JSON.parse(pack.features || '[]');
                    const isCurrentPack = dashboardData?.currentPack === pack.name;
                    
                    return (
                      <Card 
                        key={pack.id} 
                        className={`relative ${isCurrentPack ? 'ring-2 ring-blue-500' : ''}`}
                      >
                        {isCurrentPack && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-blue-500">Actuel</Badge>
                          </div>
                        )}
                        <CardHeader className="text-center">
                          <CardTitle className="text-xl">{pack.name}</CardTitle>
                          <div className="text-3xl font-bold">
                            {pack.price.toLocaleString()} FCFA
                          </div>
                          <CardDescription>
                            {pack.durationMonths} mois
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <ul className="space-y-2">
                            {features.map((feature: string, index: number) => (
                              <li key={index} className="flex items-center text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <Button
                            className="w-full"
                            variant={isCurrentPack ? "outline" : "default"}
                            onClick={() => !isCurrentPack && handlePurchasePack(pack.id)}
                            disabled={isCurrentPack}
                          >
                            {isCurrentPack ? 'Abonnement actuel' : "S'abonner"}
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}