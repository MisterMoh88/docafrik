'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useClientAuth } from '@/hooks/useClientAuth'
import AdminDashboard from '@/components/AdminDashboard'
import { 
  Sparkles, 
  Zap, 
  Wand2, 
  Award, 
  MapPin, 
  FileText, 
  Mail, 
  ShieldCheck, 
  FileCheck, 
  ScrollText, 
  BookOpen, 
  Receipt, 
  Calculator, 
  ShoppingCart, 
  ArrowRight, 
  Menu, 
  X, 
  Check, 
  Star, 
  Bot, 
  Brain, 
  MessageCircle, 
  Globe, 
  Download, 
  Plus, 
  Upload, 
  ZoomIn, 
  ZoomOut, 
  Send, 
  Facebook, 
  Twitter, 
  Linkedin, 
  ArrowLeft,
  Settings
} from 'lucide-react'
import DocumentEditor from '@/components/DocumentEditor'
import AIChat from '@/components/AIChat'

export default function Home() {
  const { user, isLoading, login, register, logout } = useClientAuth()
  const router = useRouter()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isPackModalOpen, setIsPackModalOpen] = useState(false)
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false)
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  const [selectedPack, setSelectedPack] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [activeFilter, setActiveFilter] = useState('tous')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState({ id: '', name: '' })
  const [authLoading, setAuthLoading] = useState(false)
  const [models, setModels] = useState([])

  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href')!)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      })
    })

    // Charger les modèles si l'utilisateur est connecté
    if (user && user.role !== 'ADMIN') {
      fetchModels()
    }
  }, [user])

  const fetchModels = async () => {
    try {
      const response = await fetch('/api/templates')
      const data = await response.json()
      if (data.success) {
        setModels(data.templates)
      }
    } catch (error) {
      console.error('Error fetching models:', error)
    }
  }

  const packData = {
    1: { name: 'Pack Essentiel', price: '2,000 FCFA', category: true },
    2: { name: 'Pack Pro', price: '6,000 FCFA', category: false },
    3: { name: 'Pack Complet', price: '10,000 FCFA', category: false }
  }

  const defaultModels = [
    { id: 'cv_moderne', name: 'CV Moderne', category: 'professionnels', description: 'Design épuré et professionnel avec photo optionnelle', variants: 20, icon: FileText, color: 'blue' },
    { id: 'lettre_motivation', name: 'Lettre de motivation', category: 'professionnels', description: 'Lettres convaincantes générées par IA', variants: 20, icon: Mail, color: 'purple' },
    { id: 'facture_pro', name: 'Facture Professionnelle', category: 'commerciaux', description: 'Factures avec calculs TVA automatiques', variants: 20, icon: Receipt, color: 'emerald' },
    { id: 'attestation_travail', name: 'Attestation de travail', category: 'administratifs', description: 'Attestations de travail, stage, formation', variants: 20, icon: ShieldCheck, color: 'green' },
    { id: 'demande_conge', name: 'Demande de congé', category: 'administratifs', description: 'Demandes officielles de congés et absences', variants: 20, icon: FileCheck, color: 'orange' }
  ]

  const filteredModels = activeFilter === 'tous' 
    ? (models.length > 0 ? models : defaultModels) 
    : (models.length > 0 ? models : defaultModels).filter((model: any) => model.category === activeFilter)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    const success = await login(email, password)
    
    if (success) {
      setIsLoginModalOpen(false)
      if (user?.role === 'ADMIN') {
        // Rediriger vers le tableau de bord admin
        window.location.href = '/admin'
      }
    } else {
      alert('Erreur de connexion')
    }
    
    setAuthLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    const success = await register(email, password, name)
    
    if (success) {
      setIsRegisterModalOpen(false)
      alert('Compte créé avec succès! Vous pouvez maintenant choisir un pack.')
      window.location.hash = 'tarifs'
    } else {
      alert('Erreur lors de l\'inscription')
    }
    
    setAuthLoading(false)
  }

  const handleLogout = () => {
    logout()
  }

  const scrollToModels = () => {
    document.getElementById('modeles')?.scrollIntoView({ behavior: 'smooth' })
  }

  const selectPack = (packNumber: number) => {
    setSelectedPack(packNumber)
    setIsPackModalOpen(true)
  }

  const proceedToPayment = async () => {
    if (selectedPack === 1 && !selectedCategory) {
      alert('Veuillez sélectionner une catégorie')
      return
    }
    
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packType: packData[selectedPack as keyof typeof packData].name.replace('Pack ', '').toUpperCase(),
          amount: parseInt(packData[selectedPack as keyof typeof packData].price.replace(',', '').replace(' FCFA', ''))
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Rediriger vers Chariow
        window.location.href = data.redirectUrl
      } else {
        alert('Erreur lors de la création du paiement')
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Erreur serveur')
    }
    
    setIsPackModalOpen(false)
  }

  const openEditor = (templateId: string, templateName: string) => {
    setSelectedTemplate({ id: templateId, name: templateName })
    setIsEditorModalOpen(true)
  }

  // Si c'est un admin, afficher le tableau de bord
  if (user?.role === 'ADMIN') {
    return <AdminDashboard />
  }

  // Si c'est un client connecté, afficher un lien vers le dashboard
  if (user && !isLoading) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        {/* Navigation simplifiée pour client connecté */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-600 text-white font-semibold px-3 py-1.5 rounded-lg tracking-tight text-lg">DA</div>
                <span className="font-semibold text-xl tracking-tight">DocAfrik</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Bonjour, {user.name || user.email}
                  {user.packType && (
                    <Badge className="ml-2 bg-blue-100 text-blue-800">
                      {user.packType}
                    </Badge>
                  )}
                </span>
                <Button 
                  onClick={() => router.push('/client')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Mon tableau de bord
                </Button>
                <Button variant="ghost" onClick={handleLogout} className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section pour client connecté */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
              Bienvenue dans votre espace, {user.name || user.email}!
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Accédez à votre tableau de bord pour gérer vos documents et votre abonnement
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button 
                onClick={() => router.push('/client')}
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-blue-700 flex items-center space-x-2"
              >
                <span>Accéder à mon tableau de bord</span>
              </Button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Si le chargement est en cours
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white font-semibold px-3 py-1.5 rounded-lg tracking-tight text-lg">DA</div>
              <span className="font-semibold text-xl tracking-tight">DocAfrik</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#accueil" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">Accueil</a>
              <a href="/templates" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Galerie</a>
              <a href="#tarifs" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Tarifs</a>
              <a href="#fonctionnalites" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Fonctionnalités</a>
            </div>
            
            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  <span className="text-sm text-gray-600">
                    Bonjour, {user.name || user.email}
                    {user.packType && (
                      <Badge className="ml-2 bg-blue-100 text-blue-800">
                        {user.packType}
                      </Badge>
                    )}
                  </span>
                  <Button variant="ghost" onClick={handleLogout} className="text-sm font-medium text-gray-600 hover:text-gray-900">
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setIsLoginModalOpen(true)} className="text-sm font-medium text-gray-600 hover:text-gray-900">
                    Connexion
                  </Button>
                  <Button onClick={() => setIsRegisterModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                    Commencer
                  </Button>
                </>
              )}
              <Button 
                variant="ghost" 
                className="md:hidden" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 animate-fadeIn">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse-slow">
              <Sparkles className="w-4 h-4" />
              <span>Propulsé par l'Intelligence Artificielle</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight mb-6">
              L'IA au service de vos documents professionnels
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Générez automatiquement CV, lettres, factures et documents administratifs en quelques clics. Simple, rapide et professionnel.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button onClick={() => setIsRegisterModalOpen(true)} className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-blue-700 flex items-center space-x-2 btn-scale">
                <span>Commencer maintenant</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button onClick={() => window.location.href = '/templates'} variant="outline" className="w-full sm:w-auto border border-gray-300 px-8 py-3.5 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 btn-scale">
                Voir les modèles
              </Button>
            </div>
            
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-semibold tracking-tight mb-1">10,000+</div>
                <div className="text-sm text-gray-600">Utilisateurs actifs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold tracking-tight mb-1">60+</div>
                <div className="text-sm text-gray-600">Modèles disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold tracking-tight mb-1">99.9%</div>
                <div className="text-sm text-gray-600">Satisfaction client</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold tracking-tight mb-1">24/7</div>
                <div className="text-sm text-gray-600">Support disponible</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold tracking-tight mb-4">Pourquoi choisir DocAfrik ?</h2>
            <p className="text-lg text-gray-600">Une solution pensée pour l'Afrique de l'Ouest</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all card-hover">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Rapide</h3>
              <p className="text-gray-600 leading-relaxed">Générez vos documents en moins de 2 minutes grâce à notre IA performante.</p>
            </Card>
            
            <Card className="bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all card-hover">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Wand2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Automatique</h3>
              <p className="text-gray-600 leading-relaxed">L'IA remplit et structure vos documents selon vos informations.</p>
            </Card>
            
            <Card className="bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all card-hover">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professionnel</h3>
              <p className="text-gray-600 leading-relaxed">Plus de 60 modèles conçus par des experts pour tous les besoins.</p>
            </Card>
            
            <Card className="bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all card-hover">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Local</h3>
              <p className="text-gray-600 leading-relaxed">Adapté aux normes et pratiques du Mali et de l'Afrique de l'Ouest.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Catalogue de modèles */}
      <section id="modeles" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold tracking-tight mb-4">Catalogue de modèles</h2>
            <p className="text-lg text-gray-600">Plus de 60 modèles personnalisables pour tous vos besoins</p>
          </div>
          
          {/* Filtres de catégories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button 
              onClick={() => setActiveFilter('tous')}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                activeFilter === 'tous' 
                  ? 'bg-blue-600 text-white' 
                  : 'border border-gray-300 hover:border-gray-400'
              }`}
            >
              Tous les modèles
            </Button>
            <Button 
              onClick={() => setActiveFilter('professionnels')}
              variant="outline"
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                activeFilter === 'professionnels' 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'border border-gray-300 hover:border-gray-400'
              }`}
            >
              Professionnels
            </Button>
            <Button 
              onClick={() => setActiveFilter('administratifs')}
              variant="outline"
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                activeFilter === 'administratifs' 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'border border-gray-300 hover:border-gray-400'
              }`}
            >
              Administratifs
            </Button>
            <Button 
              onClick={() => setActiveFilter('commerciaux')}
              variant="outline"
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                activeFilter === 'commerciaux' 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'border border-gray-300 hover:border-gray-400'
              }`}
            >
              Commerciaux
            </Button>
          </div>
          
          {/* Grille de modèles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModels.map((model) => {
              const Icon = model.icon
              const categoryColors = {
                professionnels: 'bg-blue-100 text-blue-700',
                administratifs: 'bg-orange-100 text-orange-700',
                commerciaux: 'bg-green-100 text-green-700'
              }
              
              return (
                <Card 
                  key={model.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all group cursor-pointer card-hover"
                  onClick={() => openEditor(model.id, model.name)}
                >
                  <div className={`aspect-[3/4] bg-gradient-to-br from-${model.color}-50 to-${model.color}-100 flex items-center justify-center relative overflow-hidden`}>
                    {model.thumbnailUrl ? (
                      <img 
                        src={model.thumbnailUrl} 
                        alt={model.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Icon className="w-20 h-20 text-gray-400 opacity-50" />
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{model.name}</h3>
                      <Badge className={`text-xs ${categoryColors[model.category as keyof typeof categoryColors]}`}>
                        {model.category === 'professionnels' ? 'Professionnel' : 
                         model.category === 'administratifs' ? 'Administratif' : 'Commercial'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{model.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{model.variants} variantes disponibles</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tarifs Section */}
      <section id="tarifs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold tracking-tight mb-4">Tarifs simples et transparents</h2>
            <p className="text-lg text-gray-600">Choisissez le pack qui correspond à vos besoins</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Pack 1 */}
            <Card className="bg-white border border-gray-200 rounded-xl p-8 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Pack Essentiel</h3>
                <p className="text-sm text-gray-600">Pour les besoins basiques</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-semibold tracking-tight">2,000</span>
                  <span className="text-gray-600 ml-2">FCFA/an</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">1 catégorie au choix</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">20+ modèles personnalisables</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Génération par IA</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Export PDF et Word</span>
                </div>
              </div>
              
              <Button onClick={() => selectPack(1)} variant="outline" className="w-full border border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-gray-50">
                Choisir ce pack
              </Button>
            </Card>
            
            {/* Pack 2 - Populaire */}
            <Card className="bg-white border-2 border-blue-600 rounded-xl p-8 relative shadow-lg">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Populaire
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Pack Pro</h3>
                <p className="text-sm text-gray-600">Pour les professionnels</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-semibold tracking-tight">6,000</span>
                  <span className="text-gray-600 ml-2">FCFA/an</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">2 catégories incluses</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">40+ modèles personnalisables</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Génération IA avancée</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Export PDF et Word</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Chat IA Coach</span>
                </div>
              </div>
              
              <Button onClick={() => selectPack(2)} className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Choisir ce pack
              </Button>
            </Card>
            
            {/* Pack 3 */}
            <Card className="bg-white border border-gray-200 rounded-xl p-8 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Pack Complet</h3>
                <p className="text-sm text-gray-600">Accès illimité</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-semibold tracking-tight">10,000</span>
                  <span className="text-gray-600 ml-2">FCFA/an</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Toutes les catégories</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">60+ modèles personnalisables</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">IA génération premium</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Export PDF et Word</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Chat IA Coach 24/7</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Support prioritaire</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">Logo personnalisé</span>
                </div>
              </div>
              
              <Button onClick={() => selectPack(3)} variant="outline" className="w-full border border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-gray-50">
                Choisir ce pack
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Fonctionnalités IA Section */}
      <section id="fonctionnalites" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold tracking-tight mb-4">Propulsé par l'Intelligence Artificielle</h2>
            <p className="text-lg text-gray-600">Une assistance intelligente à chaque étape</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Génération automatique de contenu</h3>
                  <p className="text-gray-600 leading-relaxed">Notre IA analyse vos informations et génère automatiquement un contenu professionnel adapté à votre profil et au type de document.</p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Coach IA personnalisé</h3>
                  <p className="text-gray-600 leading-relaxed">Posez vos questions à notre coach virtuel pour améliorer vos documents, reformuler des phrases ou obtenir des conseils personnalisés.</p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Optimisation intelligente</h3>
                  <p className="text-gray-600 leading-relaxed">L'IA suggère des améliorations en temps réel pour rendre vos documents plus impactants et professionnels.</p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Adapté au contexte africain</h3>
                  <p className="text-gray-600 leading-relaxed">Des modèles et suggestions adaptés aux normes et pratiques professionnelles du Mali et de l'Afrique de l'Ouest.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200">
              <Card className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Coach DocAfrik</div>
                    <div className="text-xs text-green-600 flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>En ligne</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider avec votre CV aujourd'hui ?</p>
                  </div>
                  
                  <div className="bg-blue-600 text-white rounded-lg p-4 ml-8">
                    <p className="text-sm">Comment améliorer la section expérience ?</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">Je vous suggère d'utiliser des verbes d'action et de quantifier vos réalisations. Par exemple : "Augmenté les ventes de 35% en 6 mois".</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold tracking-tight mb-4">Ce que disent nos utilisateurs</h2>
            <p className="text-lg text-gray-600">Des milliers de professionnels nous font confiance</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">"DocAfrik m'a fait gagner énormément de temps. J'ai créé mon CV professionnel en moins de 10 minutes. L'IA a su parfaitement reformuler mes expériences."</p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                <div>
                  <div className="font-semibold">Amadou Diallo</div>
                  <div className="text-sm text-gray-600">Ingénieur, Bamako</div>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">"Excellent pour mon entreprise ! Les factures générées sont très professionnelles et je peux ajouter mon logo. Le Pack Complet vaut vraiment son prix."</p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full"></div>
                <div>
                  <div className="font-semibold">Fatoumata Traoré</div>
                  <div className="text-sm text-gray-600">Entrepreneure, Dakar</div>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">"Interface très intuitive et modèles variés. Le coach IA m'a beaucoup aidé à structurer ma lettre de motivation. Je recommande vivement !"</p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full"></div>
                <div>
                  <div className="font-semibold">Ibrahim Koné</div>
                  <div className="text-sm text-gray-600">Étudiant, Abidjan</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold tracking-tight mb-6">Prêt à créer vos documents professionnels ?</h2>
          <p className="text-xl text-gray-600 mb-10">Rejoignez des milliers d'utilisateurs qui font confiance à DocAfrik</p>
          <Button onClick={() => setIsRegisterModalOpen(true)} className="bg-blue-600 text-white px-10 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 inline-flex items-center space-x-2">
            <span>Commencer gratuitement</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 text-white font-semibold px-3 py-1.5 rounded-lg tracking-tight text-lg">DA</div>
                <span className="font-semibold text-xl tracking-tight text-white">DocAfrik</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">L'IA au service de vos documents professionnels en Afrique</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Produit</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#modeles" className="hover:text-white transition-colors">Modèles</a></li>
                <li><a href="#tarifs" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><a href="#fonctionnalites" className="hover:text-white transition-colors">Fonctionnalités</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Ressources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guide d'utilisation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Légal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© 2024 DocAfrik. Tous droits réservés.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Connexion */}
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent className="max-w-md w-full p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold tracking-tight">Connexion</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</Label>
              <Input name="email" type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="votre@email.com" />
            </div>
            
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</Label>
              <Input name="password" type="password" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="••••••••" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm text-gray-600">Se souvenir de moi</Label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700">Mot de passe oublié ?</a>
            </div>
            
            <Button type="submit" disabled={authLoading} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
              {authLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
            
            <p className="text-center text-sm text-gray-600">
              Pas encore de compte ? 
              <Button type="button" variant="link" onClick={() => { setIsLoginModalOpen(false); setIsRegisterModalOpen(true); }} className="text-blue-600 hover:text-blue-700 font-medium p-0">
                S'inscrire
              </Button>
            </p>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal d'Inscription */}
      <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
        <DialogContent className="max-w-md w-full p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold tracking-tight">Inscription</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nom complet</Label>
              <Input name="name" type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Votre nom" />
            </div>
            
            <div>
              <Label htmlFor="email-register" className="block text-sm font-medium text-gray-700 mb-2">Email</Label>
              <Input name="email" type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="votre@email.com" />
            </div>
            
            <div>
              <Label htmlFor="password-register" className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</Label>
              <Input name="password" type="password" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="••••••••" />
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm text-gray-600">J'accepte les conditions d'utilisation et la politique de confidentialité</Label>
            </div>
            
            <Button type="submit" disabled={authLoading} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
              {authLoading ? 'Inscription...' : 'Créer mon compte'}
            </Button>
            
            <p className="text-center text-sm text-gray-600">
              Déjà un compte ? 
              <Button type="button" variant="link" onClick={() => { setIsRegisterModalOpen(false); setIsLoginModalOpen(true); }} className="text-blue-600 hover:text-blue-700 font-medium p-0">
                Se connecter
              </Button>
            </p>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de Sélection de Pack */}
      <Dialog open={isPackModalOpen} onOpenChange={setIsPackModalOpen}>
        <DialogContent className="max-w-lg w-full p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold tracking-tight">Choisir votre pack</DialogTitle>
          </DialogHeader>
          
          {selectedPack > 0 && (
            <div className="mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-4">
                <h3 className="text-xl font-semibold mb-2">{packData[selectedPack as keyof typeof packData].name}</h3>
                <div className="text-3xl font-semibold tracking-tight text-blue-600 mb-4">{packData[selectedPack as keyof typeof packData].price}</div>
                <p className="text-sm text-gray-600">Abonnement annuel</p>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {selectedPack === 1 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Sélectionnez votre catégorie :</p>
                <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                  <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition-all">
                    <RadioGroupItem value="professionnels" id="professionnels" />
                    <Label htmlFor="professionnels" className="cursor-pointer">
                      <div className="font-medium">Documents Professionnels</div>
                      <div className="text-sm text-gray-600">CV, lettres, attestations, contrats</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition-all">
                    <RadioGroupItem value="administratifs" id="administratifs" />
                    <Label htmlFor="administratifs" className="cursor-pointer">
                      <div className="font-medium">Documents Administratifs</div>
                      <div className="text-sm text-gray-600">Demandes, déclarations, rapports</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition-all">
                    <RadioGroupItem value="commerciaux" id="commerciaux" />
                    <Label htmlFor="commerciaux" className="cursor-pointer">
                      <div className="font-medium">Documents Commerciaux</div>
                      <div className="text-sm text-gray-600">Factures, devis, bons de commande</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            <Button onClick={proceedToPayment} className="w-full bg-blue-600 text-white px-6 py-3.5 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center space-x-2">
              <span>Procéder au paiement via Chariow</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            <p className="text-xs text-center text-gray-500">Après paiement, votre compte sera activé sous 24h</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat IA */}
      <AIChat 
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
      />

      {/* Document Editor Modal */}
      <DocumentEditor 
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        templateId={selectedTemplate.id}
        templateName={selectedTemplate.name}
      />
    </div>
  )
}