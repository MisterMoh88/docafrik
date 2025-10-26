'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Download, 
  FileText, 
  CreditCard,
  Calendar,
  ArrowUp,
  ArrowDown,
  Eye,
  Activity
} from 'lucide-react'
import Link from 'next/link'

interface StatsData {
  period: string
  users: {
    total: number
    new: number
    active: number
    premium: number
  }
  documents: {
    created: number
    downloaded: number
    templates: number
  }
  revenue: {
    total: number
    monthly: number
    growth: number
  }
  engagement: {
    avgSession: number
    bounceRate: number
    retention: number
  }
}

const mockStats: StatsData[] = [
  {
    period: 'Janvier 2024',
    users: { total: 2540, new: 320, active: 1890, premium: 890 },
    documents: { created: 12450, downloaded: 48320, templates: 12 },
    revenue: { total: 2840000, monthly: 2840000, growth: 12.5 },
    engagement: { avgSession: 8.5, bounceRate: 32, retention: 78 }
  },
  {
    period: 'Décembre 2023',
    users: { total: 2220, new: 280, active: 1650, premium: 750 },
    documents: { created: 10800, downloaded: 42100, templates: 10 },
    revenue: { total: 2520000, monthly: 2520000, growth: 8.3 },
    engagement: { avgSession: 7.8, bounceRate: 35, retention: 74 }
  },
  {
    period: 'Novembre 2023',
    users: { total: 1940, new: 240, active: 1420, premium: 620 },
    documents: { created: 9200, downloaded: 36500, templates: 8 },
    revenue: { total: 2320000, monthly: 2320000, growth: 15.2 },
    engagement: { avgSession: 7.2, bounceRate: 38, retention: 71 }
  }
]

const topTemplates = [
  { name: 'CV Moderne Bleu', usage: 15420, growth: 12.5 },
  { name: 'CV Classique Noir', usage: 23100, growth: 8.3 },
  { name: 'Lettre de Motivation Pro', usage: 8900, growth: 15.2 },
  { name: 'Attestation de Travail', usage: 18900, growth: 6.7 },
  { name: 'Facture Service', usage: 12300, growth: -2.1 }
]

const userActivity = [
  { day: 'Lun', sessions: 450, documents: 120 },
  { day: 'Mar', sessions: 520, documents: 145 },
  { day: 'Mer', sessions: 480, documents: 130 },
  { day: 'Jeu', sessions: 590, documents: 165 },
  { day: 'Ven', sessions: 620, documents: 180 },
  { day: 'Sam', sessions: 320, documents: 85 },
  { day: 'Dim', sessions: 280, documents: 70 }
]

export default function AdminStatsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('current')
  const [stats, setStats] = useState<StatsData>(mockStats[0])
  const [isLoading, setIsLoading] = useState(false)

  const periods = [
    { value: 'current', label: 'Mois en cours' },
    { value: 'last', label: 'Mois dernier' },
    { value: 'quarter', label: 'Ce trimestre' },
    { value: 'year', label: 'Cette année' }
  ]

  useEffect(() => {
    // Simuler le chargement des données
    setIsLoading(true)
    setTimeout(() => {
      const index = selectedPeriod === 'current' ? 0 : selectedPeriod === 'last' ? 1 : 0
      setStats(mockStats[index])
      setIsLoading(false)
    }, 500)
  }, [selectedPeriod])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount).replace('XOF', 'FCFA')
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <ArrowUp className="w-4 h-4 text-green-500" />
    if (growth < 0) return <ArrowDown className="w-4 h-4 text-red-500" />
    return <div className="w-4 h-4" />
  }

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600'
    if (growth < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Statistiques</h1>
              <p className="text-sm text-gray-600">Consultez les statistiques d'utilisation et de performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {periods.map(period => (
                    <SelectItem key={period.value} value={period.value}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Link href="/admin">
                <Button variant="outline">
                  ← Retour admin
                </Button>
              </Link>
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
                  <p className="text-sm font-medium text-gray-600">Utilisateurs totaux</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.users.total)}</p>
                  <div className="flex items-center mt-1">
                    {getGrowthIcon(15.2)}
                    <span className={`text-xs ml-1 ${getGrowthColor(15.2)}`}>
                      +{stats.users.new} ce mois
                    </span>
                  </div>
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
                  <p className="text-sm font-medium text-gray-600">Revenus mensuels</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.revenue.monthly)}</p>
                  <div className="flex items-center mt-1">
                    {getGrowthIcon(stats.revenue.growth)}
                    <span className={`text-xs ml-1 ${getGrowthColor(stats.revenue.growth)}`}>
                      {stats.revenue.growth > 0 ? '+' : ''}{stats.revenue.growth}%
                    </span>
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Documents créés</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.documents.created)}</p>
                  <div className="flex items-center mt-1">
                    {getGrowthIcon(8.5)}
                    <span className={`text-xs ml-1 ${getGrowthColor(8.5)}`}>
                      {formatNumber(stats.documents.downloaded)} téléchargements
                    </span>
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taux de rétention</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.engagement.retention}%</p>
                  <div className="flex items-center mt-1">
                    {getGrowthIcon(2.3)}
                    <span className={`text-xs ml-1 ${getGrowthColor(2.3)}`}>
                      Session moy: {stats.engagement.avgSession}min
                    </span>
                  </div>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Templates les plus populaires */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Templates les plus populaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTemplates.map((template, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <p className="text-sm text-gray-500">{formatNumber(template.usage)} utilisations</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {getGrowthIcon(template.growth)}
                      <span className={`text-sm ml-1 ${getGrowthColor(template.growth)}`}>
                        {template.growth > 0 ? '+' : ''}{template.growth}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activité hebdomadaire */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Activité hebdomadaire
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userActivity.map((day, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{day.day}</span>
                      <span className="text-sm text-gray-500">{day.sessions} sessions</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(day.sessions / 620) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{day.documents} documents</span>
                      <span>{Math.round((day.sessions / 620) * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistiques détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Répartition des utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Utilisateurs actifs</span>
                  <span className="font-medium">{formatNumber(stats.users.active)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(stats.users.active / stats.users.total) * 100}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Utilisateurs Premium</span>
                  <span className="font-medium">{formatNumber(stats.users.premium)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: `${(stats.users.premium / stats.users.total) * 100}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Nouveaux utilisateurs</span>
                  <span className="font-medium">{formatNumber(stats.users.new)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(stats.users.new / stats.users.total) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Session moyenne</span>
                  <span className="font-medium">{stats.engagement.avgSession} min</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${(stats.engagement.avgSession / 10) * 100}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Taux de rebond</span>
                  <span className="font-medium">{stats.engagement.bounceRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${stats.engagement.bounceRate}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Taux de rétention</span>
                  <span className="font-medium">{stats.engagement.retention}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${stats.engagement.retention}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Templates disponibles</span>
                  <span className="font-medium">{stats.documents.templates}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(stats.documents.templates / 20) * 100}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Documents créés/jour</span>
                  <span className="font-medium">{Math.round(stats.documents.created / 30)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${Math.min((Math.round(stats.documents.created / 30) / 500) * 100, 100)}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Revenu/jour moyen</span>
                  <span className="font-medium">{formatCurrency(Math.round(stats.revenue.monthly / 30))}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: `${Math.min((Math.round(stats.revenue.monthly / 30) / 100000) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}