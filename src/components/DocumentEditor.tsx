'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  Bot, 
  Download, 
  Plus, 
  Upload, 
  Wand2, 
  ZoomIn, 
  ZoomOut,
  FileText
} from 'lucide-react'

interface DocumentEditorProps {
  isOpen: boolean
  onClose: () => void
  templateId: string
  templateName: string
}

export default function DocumentEditor({ isOpen, onClose, templateId, templateName }: DocumentEditorProps) {
  const [showAIChat, setShowAIChat] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    email: '',
    phone: '',
    experiences: [{
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    }]
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExperiences = [...formData.experiences]
    newExperiences[index] = { ...newExperiences[index], [field]: value }
    setFormData(prev => ({ ...prev, experiences: newExperiences }))
  }

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, {
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }))
  }

  const generateWithAI = () => {
    alert('Fonctionnalité de génération IA à implémenter avec le backend')
  }

  const downloadDocument = () => {
    alert('Fonctionnalité de téléchargement à implémenter')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="min-h-screen">
        {/* Header Éditeur */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={onClose} className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h2 className="font-semibold">{templateName}</h2>
                  <p className="text-xs text-gray-500">Non enregistré</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Aperçu
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowAIChat(!showAIChat)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 px-3 py-2 text-sm font-medium"
                >
                  <Bot className="w-4 h-4" />
                  <span>Coach IA</span>
                </Button>
                <Button onClick={downloadDocument} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Télécharger</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contenu Éditeur */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulaire */}
            <div className="space-y-6">
              <Card className="bg-white border border-gray-200 rounded-xl p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="font-semibold">Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</Label>
                    <Input 
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Ex: Amadou Diallo" 
                    />
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Titre professionnel</Label>
                    <Input 
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Ex: Développeur Full Stack" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Email</Label>
                      <Input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="email@exemple.com" 
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</Label>
                      <Input 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+223 XX XX XX XX" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Photo (optionnel)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-600 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Cliquez pour télécharger une photo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white border border-gray-200 rounded-xl p-6">
                <CardHeader className="p-0 mb-4 flex justify-between items-center">
                  <CardTitle className="font-semibold">Expériences professionnelles</CardTitle>
                  <Button 
                    variant="ghost" 
                    onClick={addExperience}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Ajouter</span>
                  </Button>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  {formData.experiences.map((experience, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Poste</Label>
                        <Input 
                          value={experience.position}
                          onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                          placeholder="Ex: Développeur Web" 
                        />
                      </div>
                      
                      <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</Label>
                        <Input 
                          value={experience.company}
                          onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                          placeholder="Ex: Orange Mali" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-2">Début</Label>
                          <Input 
                            type="month"
                            value={experience.startDate}
                            onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-2">Fin</Label>
                          <Input 
                            type="month"
                            value={experience.endDate}
                            onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Description</Label>
                        <Textarea 
                          rows={4}
                          value={experience.description}
                          onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                          placeholder="Décrivez vos missions et réalisations..." 
                        />
                      </div>
                      
                      {index < formData.experiences.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Button onClick={generateWithAI} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center space-x-2">
                <Wand2 className="w-5 h-5" />
                <span>Générer avec l'IA</span>
              </Button>
            </div>
            
            {/* Aperçu */}
            <div className="lg:sticky lg:top-24 h-fit">
              <Card className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Aperçu en temps réel</span>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" className="text-gray-600 hover:text-gray-900 p-1">
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" className="text-gray-600 hover:text-gray-900 p-1">
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="aspect-[210/297] bg-white p-8">
                  <div className="h-full border border-gray-200 rounded-lg p-6 overflow-y-auto">
                    <div className="text-center mb-6">
                      <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                      <h1 className="text-2xl font-semibold mb-1">{formData.fullName || 'Votre Nom'}</h1>
                      <p className="text-gray-600">{formData.title || 'Votre Titre Professionnel'}</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200">Contact</h2>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{formData.email || 'email@exemple.com'}</p>
                          <p>{formData.phone || '+223 XX XX XX XX'}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h2 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200">Expériences</h2>
                        <div className="space-y-4">
                          {formData.experiences.map((experience, index) => (
                            experience.position && (
                              <div key={index} className="text-sm text-gray-600">
                                <p className="font-medium text-gray-900">{experience.position} - {experience.company}</p>
                                <p className="text-xs mb-2">
                                  {experience.startDate && new Date(experience.startDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                                  {experience.startDate && experience.endDate && ' - '}
                                  {experience.endDate && new Date(experience.endDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                                </p>
                                <p>{experience.description || 'Description de vos missions...'}</p>
                              </div>
                            )
                          ))}
                          {!formData.experiences.some(e => e.position) && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium text-gray-900">Poste - Entreprise</span>
                              <p className="text-xs mb-2">Date début - Date fin</p>
                              <p>Description de vos missions...</p>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}