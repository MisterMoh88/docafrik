'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useClientAuth } from '@/hooks/useClientAuth'
import { 
  Users, 
  FileText, 
  CreditCard, 
  Settings, 
  Search, 
  Edit, 
  Eye, 
  Check, 
  X, 
  Calendar,
  TrendingUp,
  Package,
  DollarSign,
  LogOut,
  Plus,
  Trash2,
  Save,
  RefreshCw,
  Copy,
  Download,
  Upload,
  Sparkles,
  Code,
  FileCheck,
  Layers
} from 'lucide-react'

interface User {
  id: string
  email: string
  name: string | null
  phone: string | null
  role: string
  isActive: boolean
  packType: string | null
  packExpiresAt: string | null
  selectedCategory: string | null
  createdAt: string
  updatedAt: string
  documentCount: number
  totalPayments: number
}

interface Stats {
  totalUsers: number
  activeUsers: number
  totalDocuments: number
  totalRevenue: number
  recentSignups: number
  packDistribution: Record<string, number>
}

interface Template {
  id: string
  name: string
  category: string
  description: string
  htmlContent: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface Pack {
  id: string
  name: string
  price: number
  features: string[]
  paymentLink?: string
  isActive: boolean
  maxDocuments?: number
  maxTemplates?: number
  hasAIGeneration?: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminDashboard() {
  const { logout } = useClientAuth()
  const [users, setUsers] = useState<User[]>([])
  const [templates, setTemplates] = useState<Template[]>([])
  const [packs, setPacks] = useState<Pack[]>([])
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeUsers: 0,
    totalDocuments: 0,
    totalRevenue: 0,
    recentSignups: 0,
    packDistribution: {}
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [isPackModalOpen, setIsPackModalOpen] = useState(false)
  const [isNewTemplate, setIsNewTemplate] = useState(false)
  const [isNewPack, setIsNewPack] = useState(false)

  useEffect(() => {
    // Charger les données simulées pour le mode statique
    loadMockData()
  }, [])

  const loadMockData = () => {
    // Données simulées pour le mode statique
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'admin@docafrik.com',
        name: 'Admin DocAfrik',
        phone: '+223 00 00 00 00',
        role: 'ADMIN',
        isActive: true,
        packType: 'COMPLET',
        packExpiresAt: '2024-12-31',
        selectedCategory: 'professionnels',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        documentCount: 150,
        totalPayments: 10000
      },
      {
        id: '2',
        email: 'client@example.com',
        name: 'Client Test',
        phone: '+223 01 23 45 67',
        role: 'CLIENT',
        isActive: true,
        packType: 'ESSENTIEL',
        packExpiresAt: '2024-06-30',
        selectedCategory: 'administratifs',
        createdAt: '2024-02-15',
        updatedAt: '2024-02-15',
        documentCount: 25,
        totalPayments: 2000
      }
    ]

    const mockTemplates: Template[] = [
      {
        id: '1',
        name: 'CV Moderne',
        category: 'professionnels',
        description: 'CV moderne et épuré',
        htmlContent: '<html>...</html>',
        isActive: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ]

    const mockPacks: Pack[] = [
      {
        id: '1',
        name: 'Pack Essentiel',
        price: 2000,
        features: ['20 documents', '1 catégorie', 'Support email'],
        isActive: true,
        maxDocuments: 20,
        maxTemplates: 1,
        hasAIGeneration: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ]

    setUsers(mockUsers)
    setTemplates(mockTemplates)
    setPacks(mockPacks)
    
    const mockStats: Stats = {
      totalUsers: mockUsers.length,
      activeUsers: mockUsers.filter(u => u.isActive).length,
      totalDocuments: mockUsers.reduce((sum, u) => sum + u.documentCount, 0),
      totalRevenue: mockUsers.reduce((sum, u) => sum + u.totalPayments, 0),
      recentSignups: 1,
      packDistribution: {
        'ESSENTIEL': 1,
        'COMPLET': 1
      }
    }
    
    setStats(mockStats)
    setLoading(false)
  }

  const handleUpdateUser = async (userData: Partial<User>) => {
    // Simulation de mise à jour
    console.log('Updating user:', userData)
    setIsEditModalOpen(false)
    setSelectedUser(null)
  }

  const handleCreateTemplate = async (templateData: Partial<Template>) => {
    // Simulation de création
    console.log('Creating template:', templateData)
    setIsTemplateModalOpen(false)
    setSelectedTemplate(null)
    setIsNewTemplate(false)
  }

  const handleUpdateTemplate = async (templateData: Partial<Template>) => {
    // Simulation de mise à jour
    console.log('Updating template:', templateData)
    setIsTemplateModalOpen(false)
    setSelectedTemplate(null)
  }

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce modèle ?')) return
    // Simulation de suppression
    console.log('Deleting template:', templateId)
  }

  const handleCreatePack = async (packData: Partial<Pack>) => {
    // Simulation de création
    console.log('Creating pack:', packData)
    setIsPackModalOpen(false)
    setSelectedPack(null)
    setIsNewPack(false)
  }

  const handleUpdatePack = async (packData: Partial<Pack>) => {
    // Simulation de mise à jour
    console.log('Updating pack:', packData)
    setIsPackModalOpen(false)
    setSelectedPack(null)
  }

  const handleDeletePack = async (packId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce pack ?')) return
    // Simulation de suppression
    console.log('Deleting pack:', packId)
  }

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  const getPackColor = (packType: string | null) => {
    switch (packType) {
      case 'ESSENTIEL': return 'bg-blue-100 text-blue-800'
      case 'PRO': return 'bg-purple-100 text-purple-800'
      case 'COMPLET': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord Administration</h1>
            <p className="text-gray-600">Gérez les utilisateurs, les documents et les paiements</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Déconnexion</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs totaux</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                +{stats.recentSignups} ce mois-ci
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs actifs</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% du total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents créés</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDocuments}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round(stats.totalDocuments / stats.totalUsers)} par utilisateur en moyenne
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus totaux</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} FCFA</div>
              <p className="text-xs text-muted-foreground">
                Depuis le début
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="templates">Modèles</TabsTrigger>
            <TabsTrigger value="packs">Packs</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            {/* Search Bar */}
            <Card>
              <CardHeader>
                <CardTitle>Gestion des utilisateurs</CardTitle>
                <CardDescription>Recherchez et gérez les comptes utilisateurs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher par nom ou email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>Pack</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Revenus</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.name || 'Non défini'}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPackColor(user.packType)}>
                            {user.packType || 'Aucun'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {user.selectedCategory || 'Non définie'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{user.documentCount}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{user.totalPayments.toLocaleString()} FCFA</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.isActive ? 'default' : 'secondary'}>
                            {user.isActive ? 'Actif' : 'Inactif'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user)
                                setIsEditModalOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gestion des modèles</CardTitle>
                  <CardDescription>Créez, éditez et gérez les modèles de documents</CardDescription>
                </div>
                <Button 
                  onClick={() => {
                    setIsNewTemplate(true)
                    setSelectedTemplate({
                      id: '',
                      name: '',
                      category: 'professionnels',
                      description: '',
                      htmlContent: '',
                      isActive: true,
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString()
                    })
                    setIsTemplateModalOpen(true)
                  }}
                  className="flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Nouveau modèle</span>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Créé le</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {templates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{template.category}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{template.description}</TableCell>
                        <TableCell>
                          <Badge variant={template.isActive ? 'default' : 'secondary'}>
                            {template.isActive ? 'Actif' : 'Inactif'}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(template.createdAt)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedTemplate(template)
                                setIsNewTemplate(false)
                                setIsTemplateModalOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteTemplate(template.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

        <TabsContent value="packs" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gestion des packs</CardTitle>
                  <CardDescription>Créez et gérez les packs d'abonnement</CardDescription>
                </div>
                <Button 
                  onClick={() => {
                    setIsNewPack(true)
                    setSelectedPack({
                      id: '',
                      name: '',
                      price: 0,
                      features: [],
                      paymentLink: '',
                      isActive: true,
                      maxDocuments: 10,
                      maxTemplates: 5,
                      hasAIGeneration: false,
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString()
                    })
                    setIsPackModalOpen(true)
                  }}
                  className="flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Nouveau pack</span>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Fonctionnalités</TableHead>
                      <TableHead>Lien paiement</TableHead>
                      <TableHead>Documents max</TableHead>
                      <TableHead>Modèles max</TableHead>
                      <TableHead>IA</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {packs.map((pack) => (
                      <TableRow key={pack.id}>
                        <TableCell className="font-medium">{pack.name}</TableCell>
                        <TableCell>{pack.price.toLocaleString()} FCFA</TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            {pack.features.slice(0, 2).map((feature, index) => (
                              <Badge key={index} variant="outline" className="mr-1 mb-1">
                                {feature}
                              </Badge>
                            ))}
                            {pack.features.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{pack.features.length - 2} autres
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {pack.paymentLink ? (
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                <a 
                                  href={pack.paymentLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-1 hover:underline"
                                >
                                  <CreditCard className="h-3 w-3" />
                                  <span>Chariow</span>
                                </a>
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigator.clipboard.writeText(pack.paymentLink!)}
                                className="h-6 w-6 p-0"
                                title="Copier le lien"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <Badge variant="secondary" className="text-gray-500">
                              Non configuré
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{pack.maxDocuments || '∞'}</TableCell>
                        <TableCell>{pack.maxTemplates || '∞'}</TableCell>
                        <TableCell>
                          <Badge variant={pack.hasAIGeneration ? 'default' : 'secondary'}>
                            {pack.hasAIGeneration ? 'Oui' : 'Non'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={pack.isActive ? 'default' : 'secondary'}>
                            {pack.isActive ? 'Actif' : 'Inactif'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedPack(pack)
                                setIsNewPack(false)
                                setIsPackModalOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePack(pack.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Historique des paiements</CardTitle>
                <CardDescription>Suivez tous les paiements et transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Cette section sera implémentée avec l'historique des paiements</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit User Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Modifier l'utilisateur</DialogTitle>
              <DialogDescription>
                Modifiez les informations et le pack de l'utilisateur
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nom
                  </Label>
                  <Input
                    id="name"
                    defaultValue={selectedUser.name || ''}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pack" className="text-right">
                    Pack
                  </Label>
                  <Select 
                    defaultValue={selectedUser.packType || 'ESSENTIEL'}
                    onValueChange={(value) => handleUpdateUser({ packType: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un pack" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ESSENTIEL">Essentiel</SelectItem>
                      <SelectItem value="PRO">Pro</SelectItem>
                      <SelectItem value="COMPLET">Complet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Catégorie
                  </Label>
                  <Select 
                    defaultValue={selectedUser.selectedCategory || ''}
                    onValueChange={(value) => handleUpdateUser({ selectedCategory: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professionnels">Professionnels</SelectItem>
                      <SelectItem value="administratifs">Administratifs</SelectItem>
                      <SelectItem value="commerciaux">Commerciaux</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Statut
                  </Label>
                  <Select 
                    defaultValue={selectedUser.isActive ? 'true' : 'false'}
                    onValueChange={(value) => handleUpdateUser({ isActive: value === 'true' })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Actif</SelectItem>
                      <SelectItem value="false">Inactif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Template Modal */}
        <Dialog open={isTemplateModalOpen} onOpenChange={setIsTemplateModalOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isNewTemplate ? 'Créer un modèle' : 'Modifier le modèle'}
              </DialogTitle>
              <DialogDescription>
                {isNewTemplate ? 'Créez un nouveau modèle de document' : 'Modifiez les informations du modèle'}
              </DialogDescription>
            </DialogHeader>
            {selectedTemplate && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="template-name" className="text-right">
                    Nom
                  </Label>
                  <Input
                    id="template-name"
                    value={selectedTemplate.name}
                    onChange={(e) => setSelectedTemplate({...selectedTemplate, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="template-category" className="text-right">
                    Catégorie
                  </Label>
                  <Select 
                    value={selectedTemplate.category}
                    onValueChange={(value) => setSelectedTemplate({...selectedTemplate, category: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professionnels">Professionnels</SelectItem>
                      <SelectItem value="administratifs">Administratifs</SelectItem>
                      <SelectItem value="commerciaux">Commerciaux</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="template-description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="template-description"
                    value={selectedTemplate.description}
                    onChange={(e) => setSelectedTemplate({...selectedTemplate, description: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="template-html" className="text-right pt-2">
                    Contenu HTML
                  </Label>
                  <div className="col-span-3 space-y-2">
                    <Textarea
                      id="template-html"
                      value={selectedTemplate.htmlContent}
                      onChange={(e) => setSelectedTemplate({...selectedTemplate, htmlContent: e.target.value})}
                      className="min-h-[200px] font-mono text-sm"
                      placeholder="Collez votre code HTML ici..."
                    />
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Simuler la génération avec l'IA
                          setSelectedTemplate({
                            ...selectedTemplate,
                            htmlContent: `<div class="document">
  <h1>${selectedTemplate.name}</h1>
  <p>Contenu généré par l'IA pour ${selectedTemplate.description}</p>
  <div class="content">
    <!-- Votre contenu ici -->
  </div>
</div>`
                          })
                        }}
                        className="flex items-center space-x-1"
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>Générer avec l'IA</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="template-active" className="text-right">
                    Actif
                  </Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Switch
                      id="template-active"
                      checked={selectedTemplate.isActive}
                      onCheckedChange={(checked) => setSelectedTemplate({...selectedTemplate, isActive: checked})}
                    />
                    <Label htmlFor="template-active">
                      {selectedTemplate.isActive ? 'Modèle visible par les utilisateurs' : 'Modèle masqué'}
                    </Label>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsTemplateModalOpen(false)}>
                    Annuler
                  </Button>
                  <Button 
                    onClick={() => {
                      if (isNewTemplate) {
                        handleCreateTemplate(selectedTemplate)
                      } else {
                        handleUpdateTemplate(selectedTemplate)
                      }
                    }}
                    className="flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>{isNewTemplate ? 'Créer' : 'Sauvegarder'}</span>
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Pack Modal */}
        <Dialog open={isPackModalOpen} onOpenChange={setIsPackModalOpen}>
          <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isNewPack ? 'Créer un pack' : 'Modifier le pack'}
              </DialogTitle>
              <DialogDescription>
                {isNewPack ? 'Créez un nouveau pack d\'abonnement' : 'Modifiez les caractéristiques du pack'}
              </DialogDescription>
            </DialogHeader>
            {selectedPack && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pack-name" className="text-right">
                    Nom
                  </Label>
                  <Input
                    id="pack-name"
                    value={selectedPack.name}
                    onChange={(e) => setSelectedPack({...selectedPack, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pack-price" className="text-right">
                    Prix (FCFA)
                  </Label>
                  <Input
                    id="pack-price"
                    type="number"
                    value={selectedPack.price}
                    onChange={(e) => setSelectedPack({...selectedPack, price: parseInt(e.target.value) || 0})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pack-payment-link" className="text-right">
                    Lien paiement Chariow
                  </Label>
                  <div className="col-span-3 space-y-2">
                    <div className="flex space-x-2">
                      <Input
                        id="pack-payment-link"
                        value={selectedPack.paymentLink || ''}
                        onChange={(e) => setSelectedPack({...selectedPack, paymentLink: e.target.value})}
                        className="flex-1"
                        placeholder="https://chariow.com/payment/..."
                      />
                      {selectedPack.paymentLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(selectedPack.paymentLink, '_blank')}
                          className="flex items-center space-x-1"
                        >
                          <Upload className="h-4 w-4" />
                          <span>Tester</span>
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Entrez le lien de paiement Chariow pour rediriger les clients. Le bouton "Tester" ouvrira le lien dans un nouvel onglet.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="pack-features" className="text-right pt-2">
                    Fonctionnalités
                  </Label>
                  <div className="col-span-3 space-y-2">
                    <Textarea
                      id="pack-features"
                      value={selectedPack.features.join('\n')}
                      onChange={(e) => setSelectedPack({
                        ...selectedPack, 
                        features: e.target.value.split('\n').filter(f => f.trim())
                      })}
                      className="min-h-[100px]"
                      placeholder="Une fonctionnalité par ligne..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Entrez chaque fonctionnalité sur une nouvelle ligne
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pack-documents" className="text-right">
                    Documents max
                  </Label>
                  <Input
                    id="pack-documents"
                    type="number"
                    value={selectedPack.maxDocuments || ''}
                    onChange={(e) => setSelectedPack({
                      ...selectedPack, 
                      maxDocuments: e.target.value ? parseInt(e.target.value) : undefined
                    })}
                    className="col-span-3"
                    placeholder="Laissez vide pour illimité"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pack-templates" className="text-right">
                    Modèles max
                  </Label>
                  <Input
                    id="pack-templates"
                    type="number"
                    value={selectedPack.maxTemplates || ''}
                    onChange={(e) => setSelectedPack({
                      ...selectedPack, 
                      maxTemplates: e.target.value ? parseInt(e.target.value) : undefined
                    })}
                    className="col-span-3"
                    placeholder="Laissez vide pour illimité"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pack-ai" className="text-right">
                    Génération IA
                  </Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Switch
                      id="pack-ai"
                      checked={selectedPack.hasAIGeneration}
                      onCheckedChange={(checked) => setSelectedPack({...selectedPack, hasAIGeneration: checked})}
                    />
                    <Label htmlFor="pack-ai">
                      {selectedPack.hasAIGeneration ? 'Accès IA activé' : 'Accès IA désactivé'}
                    </Label>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pack-active" className="text-right">
                    Actif
                  </Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Switch
                      id="pack-active"
                      checked={selectedPack.isActive}
                      onCheckedChange={(checked) => setSelectedPack({...selectedPack, isActive: checked})}
                    />
                    <Label htmlFor="pack-active">
                      {selectedPack.isActive ? 'Pack visible par les utilisateurs' : 'Pack masqué'}
                    </Label>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsPackModalOpen(false)}>
                    Annuler
                  </Button>
                  <Button 
                    onClick={() => {
                      if (isNewPack) {
                        handleCreatePack(selectedPack)
                      } else {
                        handleUpdatePack(selectedPack)
                      }
                    }}
                    className="flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>{isNewPack ? 'Créer' : 'Sauvegarder'}</span>
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}