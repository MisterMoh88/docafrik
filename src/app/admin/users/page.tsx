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
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  Users,
  Mail,
  Calendar,
  Shield,
  Ban,
  CheckCircle,
  AlertCircle,
  Download,
  Crown,
  Star,
  FileText
} from 'lucide-react'
import Link from 'next/link'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: 'admin' | 'premium' | 'free'
  status: 'active' | 'inactive' | 'suspended'
  subscriptionType: 'free' | 'premium' | 'enterprise'
  subscriptionExpiry: string
  registrationDate: string
  lastLogin: string
  downloadsCount: number
  documentsCreated: number
  country: string
  city: string
}

const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Marie',
    lastName: 'Dubois',
    email: 'marie.dubois@email.com',
    phone: '+223 76 45 23 10',
    role: 'premium',
    status: 'active',
    subscriptionType: 'premium',
    subscriptionExpiry: '2024-12-31',
    registrationDate: '2024-01-15',
    lastLogin: '2024-01-20',
    downloadsCount: 45,
    documentsCreated: 23,
    country: 'Mali',
    city: 'Bamako'
  },
  {
    id: '2',
    firstName: 'Ahmadou',
    lastName: 'Traoré',
    email: 'ahmadou.traore@email.com',
    phone: '+223 65 98 76 54',
    role: 'free',
    status: 'active',
    subscriptionType: 'free',
    subscriptionExpiry: '',
    registrationDate: '2024-01-10',
    lastLogin: '2024-01-19',
    downloadsCount: 12,
    documentsCreated: 5,
    country: 'Mali',
    city: 'Sikasso'
  },
  {
    id: '3',
    firstName: 'Fatoumata',
    lastName: 'Konaté',
    email: 'fatoumata.konate@email.com',
    phone: '+223 78 34 12 98',
    role: 'premium',
    status: 'active',
    subscriptionType: 'premium',
    subscriptionExpiry: '2024-06-30',
    registrationDate: '2023-12-01',
    lastLogin: '2024-01-20',
    downloadsCount: 89,
    documentsCreated: 67,
    country: 'Mali',
    city: 'Koulikoro'
  },
  {
    id: '4',
    firstName: 'Ibrahim',
    lastName: 'Cissé',
    email: 'ibrahim.cisse@email.com',
    phone: '+223 70 23 45 67',
    role: 'admin',
    status: 'active',
    subscriptionType: 'enterprise',
    subscriptionExpiry: '2025-01-01',
    registrationDate: '2023-10-15',
    lastLogin: '2024-01-20',
    downloadsCount: 156,
    documentsCreated: 98,
    country: 'Mali',
    city: 'Bamako'
  },
  {
    id: '5',
    firstName: 'Aminata',
    lastName: 'Diallo',
    email: 'aminata.diallo@email.com',
    phone: '+223 64 78 90 12',
    role: 'free',
    status: 'inactive',
    subscriptionType: 'free',
    subscriptionExpiry: '',
    registrationDate: '2023-11-20',
    lastLogin: '2024-01-05',
    downloadsCount: 8,
    documentsCreated: 3,
    country: 'Sénégal',
    city: 'Dakar'
  }
]

const roles = ['Tous', 'admin', 'premium', 'free']
const statuses = ['Tous', 'active', 'inactive', 'suspended']
const subscriptions = ['Toutes', 'free', 'premium', 'enterprise']

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('Tous')
  const [selectedStatus, setSelectedStatus] = useState('Tous')
  const [selectedSubscription, setSelectedSubscription] = useState('Toutes')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'free' as const,
    subscriptionType: 'free' as const,
    subscriptionExpiry: '',
    country: 'Mali',
    city: ''
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

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'Tous' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'Tous' || user.status === selectedStatus
    const matchesSubscription = selectedSubscription === 'Toutes' || user.subscriptionType === selectedSubscription
    return matchesSearch && matchesRole && matchesStatus && matchesSubscription
  })

  const handleCreateUser = async () => {
    setIsLoading(true)
    
    try {
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        status: 'active',
        registrationDate: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString().split('T')[0],
        downloadsCount: 0,
        documentsCreated: 0
      }
      
      setUsers([...users, newUser])
      setIsCreateDialogOpen(false)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: 'free',
        subscriptionType: 'free',
        subscriptionExpiry: '',
        country: 'Mali',
        city: ''
      })
      setNotification({ type: 'success', message: 'Utilisateur créé avec succès!' })
    } catch (error) {
      setNotification({ type: 'error', message: 'Erreur lors de la création de l\'utilisateur' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditUser = async () => {
    if (!selectedUser) return
    
    setIsLoading(true)
    
    try {
      const updatedUsers = users.map(user =>
        user.id === selectedUser.id
          ? { ...user, ...formData }
          : user
      )
      
      setUsers(updatedUsers)
      setIsEditDialogOpen(false)
      setSelectedUser(null)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: 'free',
        subscriptionType: 'free',
        subscriptionExpiry: '',
        country: 'Mali',
        city: ''
      })
      setNotification({ type: 'success', message: 'Utilisateur mis à jour avec succès!' })
    } catch (error) {
      setNotification({ type: 'error', message: 'Erreur lors de la mise à jour de l\'utilisateur' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur?')) return
    
    try {
      setUsers(users.filter(user => user.id !== userId))
      setNotification({ type: 'success', message: 'Utilisateur supprimé avec succès!' })
    } catch (error) {
      setNotification({ type: 'error', message: 'Erreur lors de la suppression de l\'utilisateur' })
    }
  }

  const handleToggleStatus = async (userId: string) => {
    try {
      const updatedUsers = users.map(user =>
        user.id === userId
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      )
      setUsers(updatedUsers)
      setNotification({ type: 'success', message: 'Statut de l\'utilisateur mis à jour!' })
    } catch (error) {
      setNotification({ type: 'error', message: 'Erreur lors de la mise à jour du statut' })
    }
  }

  const openEditDialog = (user: User) => {
    setSelectedUser(user)
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      subscriptionType: user.subscriptionType,
      subscriptionExpiry: user.subscriptionExpiry,
      country: user.country,
      city: user.city
    })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (user: User) => {
    setSelectedUser(user)
    setIsViewDialogOpen(true)
  }

  const getRoleBadge = (role: string) => {
    const badges = {
      'admin': { icon: Crown, color: 'bg-purple-100 text-purple-800', label: 'Admin' },
      'premium': { icon: Star, color: 'bg-yellow-100 text-yellow-800', label: 'Premium' },
      'free': { icon: Users, color: 'bg-gray-100 text-gray-800', label: 'Gratuit' }
    }
    return badges[role as keyof typeof badges] || badges.free
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      'active': { color: 'bg-green-100 text-green-800', label: 'Actif' },
      'inactive': { color: 'bg-gray-100 text-gray-800', label: 'Inactif' },
      'suspended': { color: 'bg-red-100 text-red-800', label: 'Suspendu' }
    }
    return badges[status as keyof typeof badges] || badges.inactive
  }

  const getSubscriptionBadge = (subscription: string) => {
    const badges = {
      'free': { color: 'bg-gray-100 text-gray-800', label: 'Gratuit' },
      'premium': { color: 'bg-blue-100 text-blue-800', label: 'Premium' },
      'enterprise': { color: 'bg-purple-100 text-purple-800', label: 'Enterprise' }
    }
    return badges[subscription as keyof typeof badges] || badges.free
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
              <p className="text-sm text-gray-600">Administrez les comptes utilisateurs et leurs abonnements</p>
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
              <div className="text-2xl font-bold text-blue-600">{users.length}</div>
              <div className="text-sm text-gray-600">Total utilisateurs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {users.filter(u => u.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Utilisateurs actifs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {users.filter(u => u.subscriptionType === 'premium').length}
              </div>
              <div className="text-sm text-gray-600">Abonnements Premium</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {users.reduce((acc, u) => acc + u.downloadsCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total téléchargements</div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et actions */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher un utilisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSubscription} onValueChange={setSelectedSubscription}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Abonnement" />
                  </SelectTrigger>
                  <SelectContent>
                    {subscriptions.map(subscription => (
                      <SelectItem key={subscription} value={subscription}>{subscription}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvel utilisateur
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="Marie"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Dubois"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marie.dubois@email.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+223 XX XX XX XX"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="role">Rôle</Label>
                      <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Gratuit</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="subscriptionType">Abonnement</Label>
                      <Select value={formData.subscriptionType} onValueChange={(value: any) => setFormData({ ...formData, subscriptionType: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Gratuit</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="subscriptionExpiry">Fin d'abonnement</Label>
                      <Input
                        id="subscriptionExpiry"
                        type="date"
                        value={formData.subscriptionExpiry}
                        onChange={(e) => setFormData({ ...formData, subscriptionExpiry: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="country">Pays</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="Mali"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Bamako"
                      />
                    </div>
                    
                    <div className="col-span-2 flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleCreateUser} disabled={isLoading}>
                        {isLoading ? 'Création...' : 'Créer l\'utilisateur'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Tableau des utilisateurs */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des utilisateurs ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Abonnement</TableHead>
                    <TableHead>Statistiques</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => {
                    const roleBadge = getRoleBadge(user.role)
                    const statusBadge = getStatusBadge(user.status)
                    const subscriptionBadge = getSubscriptionBadge(user.subscriptionType)
                    
                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.firstName} {user.lastName}</div>
                            <div className="text-sm text-gray-500">{user.city}, {user.country}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-1 text-gray-400" />
                              <span className="text-sm">{user.email}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <span className="text-sm text-gray-500">{user.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={roleBadge.color}>
                            <roleBadge.icon className="w-3 h-3 mr-1" />
                            {roleBadge.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusBadge.color}>
                            {statusBadge.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={subscriptionBadge.color}>
                            {subscriptionBadge.label}
                          </Badge>
                          {user.subscriptionExpiry && (
                            <div className="text-xs text-gray-500 mt-1">
                              Exp: {user.subscriptionExpiry}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center">
                              <Download className="w-3 h-3 mr-1 text-gray-400" />
                              {user.downloadsCount} téléchargements
                            </div>
                            <div className="flex items-center mt-1">
                              <FileText className="w-3 h-3 mr-1 text-gray-400" />
                              {user.documentsCreated} documents
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openViewDialog(user)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(user)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleStatus(user.id)}
                            >
                              {user.status === 'active' ? (
                                <Ban className="w-4 h-4 text-red-500" />
                              ) : (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog de visualisation */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de l'utilisateur</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nom complet</Label>
                  <p className="font-medium">{selectedUser.firstName} {selectedUser.lastName}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <Label>Téléphone</Label>
                  <p className="font-medium">{selectedUser.phone}</p>
                </div>
                <div>
                  <Label>Localisation</Label>
                  <p className="font-medium">{selectedUser.city}, {selectedUser.country}</p>
                </div>
                <div>
                  <Label>Date d'inscription</Label>
                  <p className="font-medium">{selectedUser.registrationDate}</p>
                </div>
                <div>
                  <Label>Dernière connexion</Label>
                  <p className="font-medium">{selectedUser.lastLogin}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Statistiques</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Téléchargements</Label>
                    <p className="font-medium">{selectedUser.downloadsCount}</p>
                  </div>
                  <div>
                    <Label>Documents créés</Label>
                    <p className="font-medium">{selectedUser.documentsCreated}</p>
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
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-firstName">Prénom</Label>
              <Input
                id="edit-firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="edit-lastName">Nom</Label>
              <Input
                id="edit-lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            
            <div className="col-span-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="edit-phone">Téléphone</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="edit-role">Rôle</Label>
              <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Gratuit</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="edit-subscriptionType">Abonnement</Label>
              <Select value={formData.subscriptionType} onValueChange={(value: any) => setFormData({ ...formData, subscriptionType: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Gratuit</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="edit-subscriptionExpiry">Fin d'abonnement</Label>
              <Input
                id="edit-subscriptionExpiry"
                type="date"
                value={formData.subscriptionExpiry}
                onChange={(e) => setFormData({ ...formData, subscriptionExpiry: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="edit-country">Pays</Label>
              <Input
                id="edit-country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
            
            <div className="col-span-2">
              <Label htmlFor="edit-city">Ville</Label>
              <Input
                id="edit-city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            
            <div className="col-span-2 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleEditUser} disabled={isLoading}>
                {isLoading ? 'Modification...' : 'Modifier l\'utilisateur'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}