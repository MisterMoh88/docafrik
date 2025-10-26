'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  Settings, 
  Save, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard,
  Shield,
  Bell,
  Palette,
  Database,
  CheckCircle,
  AlertCircle,
  Upload,
  Download,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'

interface SiteSettings {
  siteName: string
  siteDescription: string
  siteUrl: string
  logo: string
  favicon: string
  primaryColor: string
  secondaryColor: string
  language: string
  timezone: string
  currency: string
}

interface ContactSettings {
  email: string
  phone: string
  address: string
  city: string
  country: string
  postalCode: string
  whatsapp: string
  facebook: string
  twitter: string
  linkedin: string
}

interface PaymentSettings {
  provider: 'stripe' | 'paypal' | 'wave'
  publicKey: string
  secretKey: string
  webhookSecret: string
  currency: string
  testMode: boolean
}

interface NotificationSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  newUserNotification: boolean
  newOrderNotification: boolean
  systemMaintenanceNotification: boolean
}

interface SecuritySettings {
  twoFactorAuth: boolean
  sessionTimeout: number
  passwordMinLength: number
  requireStrongPassword: boolean
  loginAttempts: number
  ipWhitelist: string[]
}

const defaultSettings = {
  site: {
    siteName: 'DocAfrik',
    siteDescription: 'Plateforme de création de documents professionnelle pour l\'Afrique',
    siteUrl: 'https://docafrik.com',
    logo: '',
    favicon: '',
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    language: 'fr',
    timezone: 'Africa/Bamako',
    currency: 'XOF'
  } as SiteSettings,
  contact: {
    email: 'contact@docafrik.com',
    phone: '+223 XX XX XX XX',
    address: '123 Rue du Commerce',
    city: 'Bamako',
    country: 'Mali',
    postalCode: 'BP 1234',
    whatsapp: '+223 XX XX XX XX',
    facebook: 'https://facebook.com/docafrik',
    twitter: 'https://twitter.com/docafrik',
    linkedin: 'https://linkedin.com/company/docafrik'
  } as ContactSettings,
  payment: {
    provider: 'wave',
    publicKey: '',
    secretKey: '',
    webhookSecret: '',
    currency: 'XOF',
    testMode: true
  } as PaymentSettings,
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newUserNotification: true,
    newOrderNotification: true,
    systemMaintenanceNotification: true
  } as NotificationSettings,
  security: {
    twoFactorAuth: false,
    sessionTimeout: 24,
    passwordMinLength: 8,
    requireStrongPassword: true,
    loginAttempts: 5,
    ipWhitelist: []
  } as SecuritySettings
}

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('site')
  const [settings, setSettings] = useState(defaultSettings)
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

  const handleSaveSettings = async (section: string) => {
    setIsLoading(true)
    
    try {
      // Simuler la sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000))
      setNotification({ type: 'success', message: 'Paramètres sauvegardés avec succès!' })
    } catch (error) {
      setNotification({ type: 'error', message: 'Erreur lors de la sauvegarde des paramètres' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = 'docafrik-settings.json'
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string)
          setSettings(importedSettings)
          setNotification({ type: 'success', message: 'Paramètres importés avec succès!' })
        } catch (error) {
          setNotification({ type: 'error', message: 'Erreur lors de l\'importation des paramètres' })
        }
      }
      reader.readAsText(file)
    }
  }

  const tabs = [
    { id: 'site', label: 'Site', icon: Globe },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'payment', label: 'Paiement', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
              <p className="text-sm text-gray-600">Configurez les paramètres de la plateforme</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleExportSettings}>
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button variant="outline" asChild>
                <label className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Importer
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportSettings}
                    className="hidden"
                  />
                </label>
              </Button>
              <Link href="/admin">
                <Button variant="outline">
                  ← Retour admin
                </Button>
              </Link>
            </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Contenu */}
          <div className="lg:col-span-3">
            {/* Paramètres du site */}
            {activeTab === 'site' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Paramètres du site
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="siteName">Nom du site</Label>
                      <Input
                        id="siteName"
                        value={settings.site.siteName}
                        onChange={(e) => setSettings({
                          ...settings,
                          site: { ...settings.site, siteName: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="siteUrl">URL du site</Label>
                      <Input
                        id="siteUrl"
                        value={settings.site.siteUrl}
                        onChange={(e) => setSettings({
                          ...settings,
                          site: { ...settings.site, siteUrl: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="siteDescription">Description du site</Label>
                    <Textarea
                      id="siteDescription"
                      value={settings.site.siteDescription}
                      onChange={(e) => setSettings({
                        ...settings,
                        site: { ...settings.site, siteDescription: e.target.value }
                      })}
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="primaryColor">Couleur primaire</Label>
                      <Input
                        id="primaryColor"
                        type="color"
                        value={settings.site.primaryColor}
                        onChange={(e) => setSettings({
                          ...settings,
                          site: { ...settings.site, primaryColor: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="secondaryColor">Couleur secondaire</Label>
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={settings.site.secondaryColor}
                        onChange={(e) => setSettings({
                          ...settings,
                          site: { ...settings.site, secondaryColor: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="language">Langue</Label>
                      <Select value={settings.site.language} onValueChange={(value) => setSettings({
                        ...settings,
                        site: { ...settings.site, language: value }
                      })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => handleSaveSettings('site')} disabled={isLoading}>
                      {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Paramètres de contact */}
            {activeTab === 'contact' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Informations de contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.contact.email}
                        onChange={(e) => setSettings({
                          ...settings,
                          contact: { ...settings.contact, email: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={settings.contact.phone}
                        onChange={(e) => setSettings({
                          ...settings,
                          contact: { ...settings.contact, phone: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      value={settings.contact.address}
                      onChange={(e) => setSettings({
                        ...settings,
                        contact: { ...settings.contact, address: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">Ville</Label>
                      <Input
                        id="city"
                        value={settings.contact.city}
                        onChange={(e) => setSettings({
                          ...settings,
                          contact: { ...settings.contact, city: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Pays</Label>
                      <Input
                        id="country"
                        value={settings.contact.country}
                        onChange={(e) => setSettings({
                          ...settings,
                          contact: { ...settings.contact, country: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Code postal</Label>
                      <Input
                        id="postalCode"
                        value={settings.contact.postalCode}
                        onChange={(e) => setSettings({
                          ...settings,
                          contact: { ...settings.contact, postalCode: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input
                        id="whatsapp"
                        value={settings.contact.whatsapp}
                        onChange={(e) => setSettings({
                          ...settings,
                          contact: { ...settings.contact, whatsapp: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        value={settings.contact.facebook}
                        onChange={(e) => setSettings({
                          ...settings,
                          contact: { ...settings.contact, facebook: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => handleSaveSettings('contact')} disabled={isLoading}>
                      {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Paramètres de paiement */}
            {activeTab === 'payment' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Configuration des paiements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="provider">Fournisseur de paiement</Label>
                    <Select value={settings.payment.provider} onValueChange={(value: any) => setSettings({
                      ...settings,
                      payment: { ...settings.payment, provider: value }
                    })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wave">Wave (Afrique)</SelectItem>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="publicKey">Clé publique</Label>
                      <Input
                        id="publicKey"
                        type="password"
                        value={settings.payment.publicKey}
                        onChange={(e) => setSettings({
                          ...settings,
                          payment: { ...settings.payment, publicKey: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="secretKey">Clé secrète</Label>
                      <Input
                        id="secretKey"
                        type="password"
                        value={settings.payment.secretKey}
                        onChange={(e) => setSettings({
                          ...settings,
                          payment: { ...settings.payment, secretKey: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="webhookSecret">Secret webhook</Label>
                    <Input
                      id="webhookSecret"
                      type="password"
                      value={settings.payment.webhookSecret}
                      onChange={(e) => setSettings({
                        ...settings,
                        payment: { ...settings.payment, webhookSecret: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="testMode"
                      checked={settings.payment.testMode}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        payment: { ...settings.payment, testMode: checked }
                      })}
                    />
                    <Label htmlFor="testMode">Mode test</Label>
                  </div>
                  
                  {settings.payment.testMode && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="text-sm text-yellow-800">
                          Le mode test est activé. Aucune transaction réelle ne sera effectuée.
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <Button onClick={() => handleSaveSettings('payment')} disabled={isLoading}>
                      {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Paramètres de notification */}
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Paramètres de notification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications">Notifications email</Label>
                        <p className="text-sm text-gray-500">Recevoir les notifications par email</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={settings.notifications.emailNotifications}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, emailNotifications: checked }
                        })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="smsNotifications">Notifications SMS</Label>
                        <p className="text-sm text-gray-500">Recevoir les notifications par SMS</p>
                      </div>
                      <Switch
                        id="smsNotifications"
                        checked={settings.notifications.smsNotifications}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, smsNotifications: checked }
                        })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushNotifications">Notifications push</Label>
                        <p className="text-sm text-gray-500">Recevoir les notifications push</p>
                      </div>
                      <Switch
                        id="pushNotifications"
                        checked={settings.notifications.pushNotifications}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, pushNotifications: checked }
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h4 className="font-medium mb-4">Types de notifications</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="newUserNotification">Nouveaux utilisateurs</Label>
                          <p className="text-sm text-gray-500">Notifier lors de l'inscription d'un nouvel utilisateur</p>
                        </div>
                        <Switch
                          id="newUserNotification"
                          checked={settings.notifications.newUserNotification}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, newUserNotification: checked }
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="newOrderNotification">Nouvelles commandes</Label>
                          <p className="text-sm text-gray-500">Notifier lors d'une nouvelle commande</p>
                        </div>
                        <Switch
                          id="newOrderNotification"
                          checked={settings.notifications.newOrderNotification}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, newOrderNotification: checked }
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="systemMaintenanceNotification">Maintenance système</Label>
                          <p className="text-sm text-gray-500">Notifier lors des maintenances système</p>
                        </div>
                        <Switch
                          id="systemMaintenanceNotification"
                          checked={settings.notifications.systemMaintenanceNotification}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            notifications: { ...settings.notifications, systemMaintenanceNotification: checked }
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => handleSaveSettings('notifications')} disabled={isLoading}>
                      {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Paramètres de sécurité */}
            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Paramètres de sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="twoFactorAuth">Authentification à deux facteurs</Label>
                        <p className="text-sm text-gray-500">Exiger l'A2F pour les comptes administrateurs</p>
                      </div>
                      <Switch
                        id="twoFactorAuth"
                        checked={settings.security.twoFactorAuth}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          security: { ...settings.security, twoFactorAuth: checked }
                        })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="requireStrongPassword">Mots de passe forts</Label>
                        <p className="text-sm text-gray-500">Exiger des mots de passe complexes</p>
                      </div>
                      <Switch
                        id="requireStrongPassword"
                        checked={settings.security.requireStrongPassword}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          security: { ...settings.security, requireStrongPassword: checked }
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sessionTimeout">Délai d'expiration de session (heures)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, sessionTimeout: parseInt(e.target.value) || 24 }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="passwordMinLength">Longueur minimale du mot de passe</Label>
                      <Input
                        id="passwordMinLength"
                        type="number"
                        value={settings.security.passwordMinLength}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, passwordMinLength: parseInt(e.target.value) || 8 }
                        })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="loginAttempts">Tentatives de connexion maximales</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      value={settings.security.loginAttempts}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, loginAttempts: parseInt(e.target.value) || 5 }
                      })}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => handleSaveSettings('security')} disabled={isLoading}>
                      {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}