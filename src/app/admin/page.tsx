'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  FileText, 
  Package, 
  BarChart3, 
  Settings, 
  LogOut,
  TrendingUp,
  Download,
  Eye,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalTemplates: number
  activeTemplates: number
  totalPacks: number
  activePacks: number
  totalDownloads: number
  monthlyRevenue: number
}

const mockStats: DashboardStats = {
  totalUsers: 2540,
  activeUsers: 1890,
  totalTemplates: 12,
  activeTemplates: 8,
  totalPacks: 5,
  activePacks: 3,
  totalDownloads: 48320,
  monthlyRevenue: 2840
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>(mockStats)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
      router.push('/admin/login')
    }
  }

  const menuItems = [
    {
      title: 'Gestion des Utilisateurs',
      description: 'Gérez les comptes utilisateurs et leurs abonnements',
      icon: Users,
      href: '/admin/users',
      color: 'bg-blue-500',
      badge: stats.totalUsers
    },
    {
      title: 'Gestion des Modèles',
      description: 'Créez et modifiez les modèles de documents',
      icon: FileText,
      href: '/admin/templates',
      color: 'bg-green-500',
      badge: stats.totalTemplates
    },
    {
      title: 'Gestion des Packs',
      description: 'Configurez les packs d\'abonnements et tarifs',
      icon: Package,
      href: '/admin/packs',
      color: 'bg-purple-500',
      badge: stats.totalPacks
    },
    {
      title: 'Statistiques',
      description: 'Consultez les statistiques d\'utilisation',
      icon: BarChart3,
      href: '/admin/stats',
      color: 'bg-orange-500',
      badge: null
    },
    {
      title: 'Paramètres',
      description: 'Configurez les paramètres de la plateforme',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-gray-500',
      badge: null
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panneau d'Administration</h1>
              <p className="text-sm text-gray-600">DocAfrik - Plateforme de Gestion de Documents</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline">
                  ← Retour au site
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Utilisateurs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stats.activeUsers} actifs
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Modèles</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalTemplates}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {stats.activeTemplates} actifs
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Téléchargements</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalDownloads.toLocaleString()}</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <Download className="w-3 h-3 mr-1" />
                    Total
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenus mensuels</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.monthlyRevenue.toLocaleString()} €</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% ce mois
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Menu de navigation */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Gestion de la plateforme</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className={`${item.color} p-2 rounded-lg mr-3`}>
                            <item.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.title}</h3>
                            {item.badge && (
                              <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Activité récente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Nouvel utilisateur inscrit</p>
                    <p className="text-xs text-gray-500">Il y a 5 minutes</p>
                  </div>
                </div>
                <span className="text-sm text-gray-600">marie.dubois@email.com</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Download className="w-4 h-4 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Téléchargement de modèle</p>
                    <p className="text-xs text-gray-500">Il y a 12 minutes</p>
                  </div>
                </div>
                <span className="text-sm text-gray-600">CV Moderne Bleu</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Package className="w-4 h-4 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Nouvel abonnement</p>
                    <p className="text-xs text-gray-500">Il y a 1 heure</p>
                  </div>
                </div>
                <span className="text-sm text-gray-600">Pack Premium</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-4 h-4 text-orange-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Mise à jour système</p>
                    <p className="text-xs text-gray-500">Il y a 2 heures</p>
                  </div>
                </div>
                <span className="text-sm text-gray-600">Version 2.1.0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}