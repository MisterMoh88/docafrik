'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Star, Users, Clock, FileText, Briefcase, Mail, Receipt } from 'lucide-react'
import Link from 'next/link'

interface Template {
  id: string
  name: string
  category: string
  description: string
  image: string
  isPremium: boolean
  usageCount: number
  rating: number
  lastUpdated: string
}

const templatesData: Template[] = [
  {
    id: 'cv-moderne-bleu',
    name: 'CV Moderne Bleu',
    category: 'CV',
    description: 'Design moderne et professionnel avec touches de bleu',
    image: '/api/template-preview/cv-moderne-bleu',
    isPremium: false,
    usageCount: 15420,
    rating: 4.8,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'cv-classique-noir',
    name: 'CV Classique Noir',
    category: 'CV',
    description: 'Design intemporel et élégant',
    image: '/api/template-preview/cv-classique-noir',
    isPremium: false,
    usageCount: 23100,
    rating: 4.9,
    lastUpdated: '2024-01-12'
  },
  {
    id: 'lettre-motivation-pro',
    name: 'Lettre de Motivation Pro',
    category: 'Lettre',
    description: 'Lettre de motivation professionnelle et percutante',
    image: '/api/template-preview/lettre-motivation-pro',
    isPremium: true,
    usageCount: 8900,
    rating: 4.7,
    lastUpdated: '2024-01-10'
  },
  {
    id: 'facture-service',
    name: 'Facture Service',
    category: 'Facture',
    description: 'Facture professionnelle pour services',
    image: '/api/template-preview/facture-service',
    isPremium: true,
    usageCount: 12300,
    rating: 4.6,
    lastUpdated: '2024-01-08'
  },
  {
    id: 'cv-creatif-rose',
    name: 'CV Créatif Rose',
    category: 'CV',
    description: 'Design créatif et original',
    image: '/api/template-preview/cv-creatif-rose',
    isPremium: true,
    usageCount: 6700,
    rating: 4.5,
    lastUpdated: '2024-01-05'
  },
  {
    id: 'attestation-travail',
    name: 'Attestation de Travail',
    category: 'Document Administratif',
    description: 'Attestation de travail officielle',
    image: '/api/template-preview/attestation-travail',
    isPremium: false,
    usageCount: 18900,
    rating: 4.8,
    lastUpdated: '2024-01-03'
  }
]

const categoryIcons = {
  'CV': Briefcase,
  'Lettre': Mail,
  'Facture': Receipt,
  'Document Administratif': FileText
}

const categoryColors = {
  'CV': 'bg-blue-100 text-blue-800',
  'Lettre': 'bg-green-100 text-green-800',
  'Facture': 'bg-purple-100 text-purple-800',
  'Document Administratif': 'bg-orange-100 text-orange-800'
}

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('popularity')
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(templatesData)

  useEffect(() => {
    let filtered = templatesData.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Tri
    switch (sortBy) {
      case 'popularity':
        filtered.sort((a, b) => b.usageCount - a.usageCount)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'recent':
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    setFilteredTemplates(filtered)
  }, [searchTerm, selectedCategory, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Galerie de Modèles</h1>
              <p className="text-gray-600 mt-2">Choisissez parmi des centaines de modèles professionnels</p>
            </div>
            <Link href="/">
              <Button variant="outline">
                ← Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un modèle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtre par catégorie */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="CV">CV</SelectItem>
                <SelectItem value="Lettre">Lettres</SelectItem>
                <SelectItem value="Facture">Factures</SelectItem>
                <SelectItem value="Document Administratif">Documents Administratifs</SelectItem>
              </SelectContent>
            </Select>

            {/* Tri */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Plus populaires</SelectItem>
                <SelectItem value="rating">Mieux notés</SelectItem>
                <SelectItem value="recent">Plus récents</SelectItem>
                <SelectItem value="name">Ordre alphabétique</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{templatesData.length}</div>
            <div className="text-sm text-gray-600">Modèles disponibles</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {templatesData.reduce((acc, t) => acc + t.usageCount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Utilisations totales</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {(templatesData.reduce((acc, t) => acc + t.rating, 0) / templatesData.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Note moyenne</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">24/7</div>
            <div className="text-sm text-gray-600">Support disponible</div>
          </div>
        </div>

        {/* Grille de modèles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
            const IconComponent = categoryIcons[template.category as keyof typeof categoryIcons]
            
            return (
              <Card key={template.id} className="template-card group cursor-pointer overflow-hidden">
                <div className="relative">
                  {/* Image de prévisualisation */}
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full max-w-xs mx-auto p-4 bg-white shadow-lg rounded">
                        {/* Miniature du document */}
                        <div className="border-2 border-gray-200 rounded h-full p-3 bg-white">
                          <div className="h-2 bg-gray-300 rounded mb-2 w-3/4"></div>
                          <div className="h-1 bg-gray-200 rounded mb-1 w-full"></div>
                          <div className="h-1 bg-gray-200 rounded mb-1 w-5/6"></div>
                          <div className="h-1 bg-gray-200 rounded mb-3 w-4/5"></div>
                          <div className="space-y-1">
                            <div className="h-1 bg-gray-200 rounded w-full"></div>
                            <div className="h-1 bg-gray-200 rounded w-full"></div>
                            <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Badge Premium */}
                    {template.isPremium && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                          Premium
                        </Badge>
                      </div>
                    )}

                    {/* Badge Catégorie */}
                    <div className="absolute top-3 left-3">
                      <Badge className={categoryColors[template.category as keyof typeof categoryColors]}>
                        <IconComponent className="w-3 h-3 mr-1" />
                        {template.category}
                      </Badge>
                    </div>

                    {/* Overlay au survol */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                      <Button className="opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300">
                        <FileText className="w-4 h-4 mr-2" />
                        Aperçu rapide
                      </Button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-5">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
                  </div>

                  {/* Statistiques */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-400 mr-1" />
                      <span>{template.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{template.usageCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{new Date(template.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Bouton d'action */}
                  <Link href={`/editor/${template.id}`}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 transition-all duration-200 transform hover:scale-[1.02]">
                      {template.isPremium ? 'Débloquer ce modèle' : 'Utiliser ce modèle'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Message si aucun résultat */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun modèle trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .template-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .template-card:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}