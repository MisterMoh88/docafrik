'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  FileText,
  Download,
  Upload,
  Save,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

interface Template {
  id: string
  name: string
  category: string
  description: string
  htmlContent: string
  jsonConfig: string
  previewImage: string
  isActive: boolean
  usageCount: number
  createdAt: string
  updatedAt: string
}

const mockTemplates: Template[] = [
  {
    id: 'cv-moderne-bleu',
    name: 'CV Moderne Bleu',
    category: 'CV',
    description: 'Design moderne et professionnel avec touches de bleu',
    htmlContent: '<div>HTML content...</div>',
    jsonConfig: '{"fields": [...]}',
    previewImage: '/api/template-preview/cv-moderne-bleu',
    isActive: true,
    usageCount: 15420,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  },
  {
    id: 'cv-classique-noir',
    name: 'CV Classique Noir',
    category: 'CV',
    description: 'Design intemporel et élégant',
    htmlContent: '<div>HTML content...</div>',
    jsonConfig: '{"fields": [...]}',
    previewImage: '/api/template-preview/cv-classique-noir',
    isActive: true,
    usageCount: 23100,
    createdAt: '2024-01-02',
    updatedAt: '2024-01-12'
  },
  {
    id: 'lettre-motivation-pro',
    name: 'Lettre de Motivation Pro',
    category: 'Lettre',
    description: 'Lettre de motivation professionnelle et percutante',
    htmlContent: '<div>HTML content...</div>',
    jsonConfig: '{"fields": [...]}',
    previewImage: '/api/template-preview/lettre-motivation-pro',
    isActive: true,
    usageCount: 8900,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-10'
  },
  {
    id: 'facture-service',
    name: 'Facture Service',
    category: 'Facture',
    description: 'Facture professionnelle pour services',
    htmlContent: '<div>HTML content...</div>',
    jsonConfig: '{"fields": [...]}',
    previewImage: '/api/template-preview/facture-service',
    isActive: false,
    usageCount: 12300,
    createdAt: '2024-01-04',
    updatedAt: '2024-01-08'
  },
  {
    id: 'cv-creatif-rose',
    name: 'CV Créatif Rose',
    category: 'CV',
    description: 'Design créatif et original',
    htmlContent: '<div>HTML content...</div>',
    jsonConfig: '{"fields": [...]}',
    previewImage: '/api/template-preview/cv-creatif-rose',
    isActive: true,
    usageCount: 6700,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  },
  {
    id: 'attestation-travail',
    name: 'Attestation de Travail',
    category: 'Document Administratif',
    description: 'Attestation de travail officielle',
    htmlContent: '<div>HTML content...</div>',
    jsonConfig: '{"fields": [...]}',
    previewImage: '/api/template-preview/attestation-travail',
    isActive: true,
    usageCount: 18900,
    createdAt: '2024-01-06',
    updatedAt: '2024-01-03'
  }
]

const categories = ['Toutes', 'CV', 'Lettre', 'Facture', 'Document Administratif']

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Toutes')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'CV',
    description: '',
    htmlContent: '',
    jsonConfig: ''
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

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Toutes' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateTemplate = async () => {
    setIsLoading(true)
    
    try {
      // Simuler la création
      const newTemplate: Template = {
        id: formData.name.toLowerCase().replace(/\s+/g, '-'),
        name: formData.name,
        category: formData.category,
        description: formData.description,
        htmlContent: formData.htmlContent,
        jsonConfig: formData.jsonConfig,
        previewImage: `/api/template-preview/${formData.name.toLowerCase().replace(/\s+/g, '-')}`,
        isActive: true,
        usageCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      }
      
      setTemplates([...templates, newTemplate])
      setIsCreateDialogOpen(false)
      setFormData({ name: '', category: 'CV', description: '', htmlContent: '', jsonConfig: '' })
      setNotification({ type: 'success', message: 'Modèle créé avec succès!' })
    } catch (error) {
      setNotification({ type: 'error', message: 'Erreur lors de la création du modèle' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditTemplate = async () => {
    if (!selectedTemplate) return
    
    setIsLoading(true)
    
    try {
      const updatedTemplates = templates.map(template =>
        template.id === selectedTemplate.id
          ? {
              ...template,
              ...formData,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : template
      )
      
      setTemplates(updatedTemplates)
      setIsEditDialogOpen(false)
      setSelectedTemplate(null)
      setFormData({ name: '', category: 'CV', description: '', htmlContent: '', jsonConfig: '' })
      setNotification({ type: 'success', message: 'Modèle mis à jour avec succès!' })
    } catch (error) {
      setNotification({ type: 'error', message: 'Erreur lors de la mise à jour du modèle' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce modèle?')) return
    
    try {
      setTemplates(templates.filter(template => template.id !== templateId))
      setNotification({ type: 'success', message: 'Modèle supprimé avec succès!' })
    } catch (error) {
      setNotification({ type: 'error', message: 'Erreur lors de la suppression du modèle' })
    }
  }

  const handleToggleActive = async (templateId: string) => {
    try {
      const updatedTemplates = templates.map(template =>
        template.id === templateId
          ? { ...template, isActive: !template.isActive }
          : template
      )
      setTemplates(updatedTemplates)
      setNotification({ type: 'success', message: 'Statut du modèle mis à jour!' })
    } catch (error) {
      setNotification({ type: 'error', message: 'Erreur lors de la mise à jour du statut' })
    }
  }

  const openEditDialog = (template: Template) => {
    setSelectedTemplate(template)
    setFormData({
      name: template.name,
      category: template.category,
      description: template.description,
      htmlContent: template.htmlContent,
      jsonConfig: template.jsonConfig
    })
    setIsEditDialogOpen(true)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'CV': 'bg-blue-100 text-blue-800',
      'Lettre': 'bg-green-100 text-green-800',
      'Facture': 'bg-purple-100 text-purple-800',
      'Document Administratif': 'bg-orange-100 text-orange-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Modèles</h1>
              <p className="text-sm text-gray-600">Administrez les modèles de documents disponibles</p>
            </div>
            <Link href="/">
              <Button variant="outline">
                ← Retour à l'accueil
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
        {/* Filtres et actions */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher un modèle..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau modèle
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Créer un nouveau modèle</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nom du modèle</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: CV Moderne Bleu"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Catégorie</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CV">CV</SelectItem>
                          <SelectItem value="Lettre">Lettre</SelectItem>
                          <SelectItem value="Facture">Facture</SelectItem>
                          <SelectItem value="Document Administratif">Document Administratif</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Décrivez le modèle..."
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="htmlContent">Contenu HTML</Label>
                      <Textarea
                        id="htmlContent"
                        value={formData.htmlContent}
                        onChange={(e) => setFormData({ ...formData, htmlContent: e.target.value })}
                        placeholder="<div>Contenu HTML du modèle...</div>"
                        rows={6}
                        className="font-mono text-sm"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="jsonConfig">Configuration JSON</Label>
                      <Textarea
                        id="jsonConfig"
                        value={formData.jsonConfig}
                        onChange={(e) => setFormData({ ...formData, jsonConfig: e.target.value })}
                        placeholder='{"fields": [...]}'
                        rows={4}
                        className="font-mono text-sm"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleCreateTemplate} disabled={isLoading}>
                        {isLoading ? 'Création...' : 'Créer le modèle'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{templates.length}</div>
              <div className="text-sm text-gray-600">Total modèles</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {templates.filter(t => t.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Modèles actifs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {templates.reduce((acc, t) => acc + t.usageCount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Utilisations totales</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {new Set(templates.map(t => t.category)).size}
              </div>
              <div className="text-sm text-gray-600">Catégories</div>
            </CardContent>
          </Card>
        </div>

        {/* Tableau des modèles */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des modèles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Utilisations</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-mono text-sm">{template.id}</TableCell>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(template.category)}>
                          {template.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{template.description}</TableCell>
                      <TableCell>{template.usageCount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleActive(template.id)}
                          className={template.isActive ? 'text-green-600' : 'text-gray-400'}
                        >
                          {template.isActive ? 'Actif' : 'Inactif'}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(`/editor/${template.id}`, '_blank')}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(template)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTemplate(template.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredTemplates.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun modèle trouvé</h3>
                  <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog d'édition */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le modèle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Nom du modèle</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: CV Moderne Bleu"
              />
            </div>
            
            <div>
              <Label htmlFor="edit-category">Catégorie</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CV">CV</SelectItem>
                  <SelectItem value="Lettre">Lettre</SelectItem>
                  <SelectItem value="Facture">Facture</SelectItem>
                  <SelectItem value="Document Administratif">Document Administratif</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez le modèle..."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="edit-htmlContent">Contenu HTML</Label>
              <Textarea
                id="edit-htmlContent"
                value={formData.htmlContent}
                onChange={(e) => setFormData({ ...formData, htmlContent: e.target.value })}
                placeholder="<div>Contenu HTML du modèle...</div>"
                rows={6}
                className="font-mono text-sm"
              />
            </div>
            
            <div>
              <Label htmlFor="edit-jsonConfig">Configuration JSON</Label>
              <Textarea
                id="edit-jsonConfig"
                value={formData.jsonConfig}
                onChange={(e) => setFormData({ ...formData, jsonConfig: e.target.value })}
                placeholder='{"fields": [...]}'
                rows={4}
                className="font-mono text-sm"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleEditTemplate} disabled={isLoading}>
                {isLoading ? 'Mise à jour...' : 'Mettre à jour'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}