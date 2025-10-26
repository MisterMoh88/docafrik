'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Package,
  Crown,
  Star,
  CheckCircle,
  AlertCircle,
  Users,
  TrendingUp,
  CreditCard,
  Gift,
  Zap,
  Shield
} from 'lucide-react'
import Link from 'next/link'

interface Pack {
  id: string
  name: string
  description: string
  price: number
  currency: string
  billingCycle: 'monthly' | 'yearly' | 'lifetime'
  features: string[]
  maxDocuments: number
  maxDownloads: number
  prioritySupport: boolean
  customTemplates: boolean
  advancedAnalytics: boolean
  isActive: boolean
  sortOrder: number
  usersCount: number
  revenue: number
  createdAt: string
  updatedAt: string
  popular?: boolean
}

const mockPacks: Pack[] = [
  {
    id: 'free',
    name: 'Pack Gratuit',
    description: 'Idéal pour découvrir la plateforme',
    price: 0,
    currency: 'XOF',
    billingCycle: 'monthly',
    features: [
      '3 documents par mois',
      'Templates de base',
      'Support communautaire',
      'Export PDF basique'
    ],
    maxDocuments: 3,
    maxDownloads: 10,
    prioritySupport: false,
    customTemplates: false,
    advancedAnalytics: false,
    isActive: true,
    sortOrder: 1,
    usersCount: 1250,
    revenue: 0,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'premium',
    name: 'Pack Premium',
    description: 'Pour les professionnels exigeants',
    price: 5000,
    currency: 'XOF',
    billingCycle: 'monthly',
    features: [
      'Documents illimités',
      'Tous les templates premium',
      'Support prioritaire',
      'Export PDF & Word',
      'Personnalisation avancée',
      'Analytics détaillées'
    ],
    maxDocuments: -1,
    maxDownloads: -1,
    prioritySupport: true,
    customTemplates: true,
    advancedAnalytics: true,
    isActive: true,
    sortOrder: 2,
    usersCount: 890,
    revenue: 4450000,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Pack Enterprise',
    description: 'Solution complète pour les entreprises',
    price: 25000,
    currency: 'XOF',
    billingCycle: 'monthly',
    features: [
      'Tout le Premium +',
      'Utilisateurs illimités',
      'API d\'intégration',
      'Dédicataire personnel',
      'Formation incluse',
      'SLA garanti',
      'Hébergement privé'
    ],
    maxDocuments: -1,
    maxDownloads: -1,
    prioritySupport: true,
    customTemplates: true,
    advancedAnalytics: true,
    isActive: true,
    sortOrder: 3,
    usersCount: 45,
    revenue: 1125000,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-10'
  },
  {
    id: 'student',
    name: 'Pack Étudiant',
    description: 'Offre spéciale pour les étudiants',
    price: 1500,
    currency: 'XOF',
    billingCycle: 'monthly',
    features: [
      '10 documents par mois',
      'Templates essentiels',
      'Support email',
      'Export PDF',
      'Vérification étudiante requise'
    ],
    maxDocuments: 10,
    maxDownloads: 50,
    prioritySupport: false,
    customTemplates: false,
    advancedAnalytics: false,
    isActive: false,
    sortOrder: 4,
    usersCount: 0,
    revenue: 0,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  }
]

const billingCycles = [
  { value: 'monthly', label: 'Mensuel' },
  { value: 'yearly', label: 'Annuel' },
  { value: 'lifetime', label: 'À vie' }
]

export default function AdminPacksPage() {
  const [packs, setPacks] = useState<Pack[]>(mockPacks)
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    currency: 'XOF',
    billingCycle: 'monthly' as const,
    features: [''],
    maxDocuments: 10,
    maxDownloads: 50,
    prioritySupport: false,
    customTemplates: false,
    advancedAnalytics: false,
    sortOrder: 1
  })
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const filteredPacks = packs.filter(pack =>
    pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pack.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreatePack = async () => {
    setIsLoading(true)
    
    try {
      const newPack: Pack = {
        id: formData.name.toLowerCase().replace(/\s+/g, '-'),
        ...formData,
        isActive: true,
        usersCount: 0,
        revenue: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      }
      
      setPacks([...packs, newPack])
      setIsCreateDialogOpen(false)
      resetFormData()
      setNotification({ type: 'success', message: 'Pack créé avec succès!' })
    } catch (error) {
      setNotification({ type: 'error', message: 'Erreur lors de la création du pack' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditPack = async () => {
    if (!selectedPack) return
    
    setIsLoading(true)
    
    try {
      const updatedPacks = packs.map(pack =>
        pack.id === selectedPack.id
          ? { ...pack, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
          : pack
      )
      
      setPacks(updatedPacks)
      setIsEditDialogOpen(false)
      setSelectedPack(null)
      resetFormData()
      setNotification({ type: 'success', message: 'Pack mis à jour avec succès!' })
    } catch (error) {
      setNotification({ type: 'error', message: 'Erreur lors de la mise à jour du pack' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePack = async (packId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce pack?')) return
    
    try {
      setPacks(packs.filter(pack => pack.id !== packId))
      setNotification({ type: 'success', message: 'Pack supprimé avec succès!' })
    } catch (error) {
      setNotification({ type: 'error', message: 'Erreur lors de la suppression du pack' })
    }
  }

  const handleToggleActive = async (packId: string) => {
    try {
      const updatedPacks = packs.map(pack =>
        pack.id === packId
          ? { ...pack, isActive: !pack.isActive }
          : pack
      )
      setPacks(updatedPacks)
      setNotification({ type: 'success', message: 'Statut du pack mis à jour!' })
    } catch (error) {
      setNotification({ type: 'error', message: 'Erreur lors de la mise à jour du statut' })
    }
  }

  const openEditDialog = (pack: Pack) => {
    setSelectedPack(pack)
    setFormData({
      name: pack.name,
      description: pack.description,
      price: pack.price,
      currency: pack.currency,
      billingCycle: pack.billingCycle,
      features: pack.features,
      maxDocuments: pack.maxDocuments,
      maxDownloads: pack.maxDownloads,
      prioritySupport: pack.prioritySupport,
      customTemplates: pack.customTemplates,
      advancedAnalytics: pack.advancedAnalytics,
      sortOrder: pack.sortOrder
    })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (pack: Pack) => {
    setSelectedPack(pack)
    setIsViewDialogOpen(true)
  }

  const resetFormData = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      currency: 'XOF',
      billingCycle: 'monthly',
      features: [''],
      maxDocuments: 10,
      maxDownloads: 50,
      prioritySupport: false,
      customTemplates: false,
      advancedAnalytics: false,
      sortOrder: 1
    })
  }

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] })
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({ ...formData, features: newFeatures })
  }

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData({ ...formData, features: newFeatures })
  }

  const getBillingCycleLabel = (cycle: string) => {
    const labels = {
      'monthly': 'Mensuel',
      'yearly': 'Annuel',
      'lifetime': 'À vie'
    }
    return labels[cycle as keyof typeof labels] || cycle
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency === 'XOF' ? 'XOF' : 'EUR',
      minimumFractionDigits: 0
    }).format(price).replace('XOF', 'FCFA')
  }

  const totalRevenue = packs.reduce((acc, pack) => acc + pack.revenue, 0)
  const totalUsers = packs.reduce((acc, pack) => acc + pack.usersCount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Packs</h1>
              <p className="text-sm text-gray-600">Configurez les packs d'abonnements et tarifs</p>
            </div>
            <Link href="/admin">
              <Button variant="outline">
                ← Retour admin
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4`}>
          <div className={`p-4 rounded-lg flex items-center space-x-2 ${
            notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{packs.length}</div>
              <div className="text-sm text-gray-600">Total packs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {packs.filter(p => p.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Packs actifs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{totalUsers}</div>
              <div className="text-sm text-gray-600">Total abonnés</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {formatPrice(totalRevenue, 'XOF')}
              </div>
              <div className="text-sm text-gray-600">Revenus mensuels</div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et actions */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un pack..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau pack
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Créer un nouveau pack</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom du pack</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Pack Premium"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="price">Prix</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                          placeholder="5000"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Décrivez les avantages de ce pack..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingCycle">Cycle de facturation</Label>
                        <Select value={formData.billingCycle} onValueChange={(value: any) => setFormData({ ...formData, billingCycle: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {billingCycles.map(cycle => (
                              <SelectItem key={cycle.value} value={cycle.value}>{cycle.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="sortOrder">Ordre d'affichage</Label>
                        <Input
                          id="sortOrder"
                          type="number"
                          value={formData.sortOrder}
                          onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 1 })}
                          placeholder="1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="maxDocuments">Documents max</Label>
                        <Input
                          id="maxDocuments"
                          type="number"
                          value={formData.maxDocuments}
                          onChange={(e) => setFormData({ ...formData, maxDocuments: parseInt(e.target.value) || 0 })}
                          placeholder="-1 pour illimité"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="maxDownloads">Téléchargements max</Label>
                        <Input
                          id="maxDownloads"
                          type="number"
                          value={formData.maxDownloads}
                          onChange={(e) => setFormData({ ...formData, maxDownloads: parseInt(e.target.value) || 0 })}
                          placeholder="-1 pour illimité"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Fonctionnalités</Label>
                      <div className="space-y-2">
                        {formData.features.map((feature, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={feature}
                              onChange={(e) => updateFeature(index, e.target.value)}
                              placeholder="Ajouter une fonctionnalité..."
                            />
                            {formData.features.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeFeature(index)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addFeature}
                          className="w-full"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Ajouter une fonctionnalité
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Options avancées</Label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.prioritySupport}
                            onChange={(e) => setFormData({ ...formData, prioritySupport: e.target.checked })}
                          />
                          <span className="text-sm">Support prioritaire</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.customTemplates}
                            onChange={(e) => setFormData({ ...formData, customTemplates: e.target.checked })}
                          />
                          <span className="text-sm">Templates personnalisés</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.advancedAnalytics}
                            onChange={(e) => setFormData({ ...formData, advancedAnalytics: e.target.checked })}
                          />
                          <span className="text-sm">Analytics avancées</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleCreatePack} disabled={isLoading}>
                        {isLoading ? 'Création...' : 'Créer le pack'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Liste des packs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPacks.map((pack) => (
            <Card key={pack.id} className={`relative ${pack.popular ? 'border-blue-500 border-2' : ''}`}>
              {pack.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Populaire
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl">{pack.name}</CardTitle>
                  <Badge variant={pack.isActive ? 'default' : 'secondary'}>
                    {pack.isActive ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  {formatPrice(pack.price, pack.currency)}
                  <span className="text-sm text-gray-500 font-normal">
                    /{getBillingCycleLabel(pack.billingCycle).toLowerCase()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{pack.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Utilisateurs:</span>
                      <span className="font-medium">{pack.usersCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Revenus:</span>
                      <span className="font-medium">{formatPrice(pack.revenue, pack.currency)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3">
                    <h4 className="font-medium mb-2">Fonctionnalités:</h4>
                    <ul className="text-sm space-y-1">
                      {pack.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                      {pack.features.length > 3 && (
                        <li className="text-gray-500">+{pack.features.length - 3} autres...</li>
                      )}
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openViewDialog(pack)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(pack)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleActive(pack.id)}
                    >
                      {pack.isActive ? (
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePack(pack.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialog de visualisation */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du pack</DialogTitle>
          </DialogHeader>
          {selectedPack && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold">{selectedPack.name}</h3>
                <div className="text-3xl font-bold text-blue-600 mt-2">
                  {formatPrice(selectedPack.price, selectedPack.currency)}
                  <span className="text-sm text-gray-500 font-normal">
                    /{getBillingCycleLabel(selectedPack.billingCycle).toLowerCase()}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">{selectedPack.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Statut</Label>
                  <p className="font-medium">
                    <Badge variant={selectedPack.isActive ? 'default' : 'secondary'}>
                      {selectedPack.isActive ? 'Actif' : 'Inactif'}
                    </Badge>
                  </p>
                </div>
                <div>
                  <Label>Utilisateurs</Label>
                  <p className="font-medium">{selectedPack.usersCount}</p>
                </div>
                <div>
                  <Label>Revenus mensuels</Label>
                  <p className="font-medium">{formatPrice(selectedPack.revenue, selectedPack.currency)}</p>
                </div>
                <div>
                  <Label>Ordre d'affichage</Label>
                  <p className="font-medium">{selectedPack.sortOrder}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Limites</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label>Documents max</Label>
                    <p className="font-medium">
                      {selectedPack.maxDocuments === -1 ? 'Illimité' : selectedPack.maxDocuments}
                    </p>
                  </div>
                  <div>
                    <Label>Téléchargements max</Label>
                    <p className="font-medium">
                      {selectedPack.maxDownloads === -1 ? 'Illimité' : selectedPack.maxDownloads}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Fonctionnalités incluses</h4>
                <ul className="space-y-2">
                  {selectedPack.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Options avancées</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-blue-500" />
                    <span>Support prioritaire: {selectedPack.prioritySupport ? 'Oui' : 'Non'}</span>
                  </div>
                  <div className="flex items-center">
                    <Gift className="w-4 h-4 mr-2 text-purple-500" />
                    <span>Templates personnalisés: {selectedPack.customTemplates ? 'Oui' : 'Non'}</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-orange-500" />
                    <span>Analytics avancées: {selectedPack.advancedAnalytics ? 'Oui' : 'Non'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog d'édition */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le pack</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Nom du pack</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-price">Prix</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-billingCycle">Cycle de facturation</Label>
                <Select value={formData.billingCycle} onValueChange={(value: any) => setFormData({ ...formData, billingCycle: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {billingCycles.map(cycle => (
                      <SelectItem key={cycle.value} value={cycle.value}>{cycle.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="edit-sortOrder">Ordre d'affichage</Label>
                <Input
                  id="edit-sortOrder"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-maxDocuments">Documents max</Label>
                <Input
                  id="edit-maxDocuments"
                  type="number"
                  value={formData.maxDocuments}
                  onChange={(e) => setFormData({ ...formData, maxDocuments: parseInt(e.target.value) || 0 })}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-maxDownloads">Téléchargements max</Label>
                <Input
                  id="edit-maxDownloads"
                  type="number"
                  value={formData.maxDownloads}
                  onChange={(e) => setFormData({ ...formData, maxDownloads: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            
            <div>
              <Label>Fonctionnalités</Label>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                    />
                    {formData.features.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addFeature}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une fonctionnalité
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Options avancées</Label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.prioritySupport}
                    onChange={(e) => setFormData({ ...formData, prioritySupport: e.target.checked })}
                  />
                  <span className="text-sm">Support prioritaire</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.customTemplates}
                    onChange={(e) => setFormData({ ...formData, customTemplates: e.target.checked })}
                  />
                  <span className="text-sm">Templates personnalisés</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.advancedAnalytics}
                    onChange={(e) => setFormData({ ...formData, advancedAnalytics: e.target.checked })}
                  />
                  <span className="text-sm">Analytics avancées</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleEditPack} disabled={isLoading}>
                {isLoading ? 'Modification...' : 'Modifier le pack'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}