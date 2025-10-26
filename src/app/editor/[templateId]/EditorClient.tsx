'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  Download, 
  FileText, 
  Eye, 
  Settings, 
  ArrowLeft, 
  Save,
  Palette,
  Printer,
  Share2,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

interface TemplateField {
  id: string
  type: 'text' | 'textarea' | 'select' | 'date' | 'email' | 'tel'
  label: string
  placeholder?: string
  required?: boolean
  options?: string[]
  defaultValue?: string
}

interface Template {
  id: string
  name: string
  category: string
  fields: TemplateField[]
  htmlContent: string
  styles: {
    primaryColor: string
    secondaryColor: string
    fontFamily: string
    fontSize: string
  }
}

const mockTemplate: Template = {
  id: 'cv-moderne-bleu',
  name: 'CV Moderne Bleu',
  category: 'CV',
  fields: [
    { id: 'fullName', type: 'text', label: 'Nom complet', placeholder: 'Jean Dupont', required: true },
    { id: 'jobTitle', type: 'text', label: 'Poste recherché', placeholder: 'Développeur Web', required: true },
    { id: 'email', type: 'email', label: 'Email', placeholder: 'jean.dupont@email.com', required: true },
    { id: 'phone', type: 'tel', label: 'Téléphone', placeholder: '+223 XX XX XX XX', required: true },
    { id: 'address', type: 'text', label: 'Adresse', placeholder: 'Bamako, Mali' },
    { id: 'summary', type: 'textarea', label: 'Résumé professionnel', placeholder: 'Développeur avec 5 ans d\'expérience...' },
    { id: 'experience', type: 'textarea', label: 'Expérience professionnelle', placeholder: 'Décrivez votre expérience...' },
    { id: 'education', type: 'textarea', label: 'Formation', placeholder: 'Votre parcours académique...' },
    { id: 'skills', type: 'textarea', label: 'Compétences', placeholder: 'Listez vos compétences techniques...' },
    { id: 'languages', type: 'text', label: 'Langues', placeholder: 'Français, Anglais, Bambara' }
  ],
  htmlContent: `
    <div class="cv-container" style="font-family: 'Arial', sans-serif; max-width: 800px; margin: 0 auto; background: white; padding: 40px;">
      <header class="cv-header" style="background: linear-gradient(135deg, #2563eb, #1e40af); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
        <h1 data-field="fullName" style="margin: 0; font-size: 2.5em; font-weight: bold;">Votre Nom</h1>
        <p data-field="jobTitle" style="margin: 10px 0 0 0; font-size: 1.3em; opacity: 0.9;">Votre Poste</p>
      </header>
      
      <section class="contact-info" style="margin-bottom: 30px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
          <div><strong>Email:</strong> <span data-field="email">votre@email.com</span></div>
          <div><strong>Téléphone:</strong> <span data-field="phone">+223 XX XX XX XX</span></div>
          <div><strong>Adresse:</strong> <span data-field="address">Votre Adresse</span></div>
        </div>
      </section>
      
      <section class="summary" style="margin-bottom: 30px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Résumé Professionnel</h2>
        <p data-field="summary" style="line-height: 1.6;">Votre résumé professionnel...</p>
      </section>
      
      <section class="experience" style="margin-bottom: 30px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Expérience Professionnelle</h2>
        <div data-field="experience" style="line-height: 1.6;">Votre expérience...</div>
      </section>
      
      <section class="education" style="margin-bottom: 30px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Formation</h2>
        <div data-field="education" style="line-height: 1.6;">Votre formation...</div>
      </section>
      
      <section class="skills" style="margin-bottom: 30px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Compétences</h2>
        <div data-field="skills" style="line-height: 1.6;">Vos compétences...</div>
      </section>
      
      <section class="languages">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Langues</h2>
        <div data-field="languages">Vos langues...</div>
      </section>
    </div>
  `,
  styles: {
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    fontFamily: 'Arial',
    fontSize: '14px'
  }
}

const colorThemes = [
  { name: 'Bleu', primary: '#2563eb', secondary: '#1e40af' },
  { name: 'Vert', primary: '#059669', secondary: '#047857' },
  { name: 'Gris', primary: '#6b7280', secondary: '#4b5563' },
  { name: 'Doré', primary: '#d97706', secondary: '#b45309' },
  { name: 'Rouge', primary: '#dc2626', secondary: '#b91c1c' }
]

const fontFamilies = [
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Times New Roman', value: 'Times New Roman, serif' },
  { name: 'Calibri', value: 'Calibri, sans-serif' },
  { name: 'Verdana', value: 'Verdana, sans-serif' }
]

export function EditorClient({ templateId }: { templateId: Promise<{ templateId: string }> }) {
  const params = useParams()
  const router = useRouter()
  const resolvedTemplateId = React.use(templateId) || params.templateId as string
  
  const [template, setTemplate] = useState<Template>(mockTemplate)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [selectedTheme, setSelectedTheme] = useState(colorThemes[0])
  const [selectedFont, setSelectedFont] = useState(fontFamilies[0])
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const previewRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Charger le template en fonction du templateId
    // Pour l'instant, on utilise le mockTemplate
    // Dans une vraie application, on chargerait depuis une API
    setTemplate(mockTemplate)
  }, [resolvedTemplateId])

  useEffect(() => {
    // Initialiser les données du formulaire avec les valeurs par défaut
    const initialData: Record<string, string> = {}
    template.fields.forEach(field => {
      initialData[field.id] = field.defaultValue || ''
    })
    setFormData(initialData)
  }, [template])

  useEffect(() => {
    updatePreview()
  }, [formData, selectedTheme, selectedFont])

  const updatePreview = () => {
    if (!previewRef.current) return
    
    const iframe = previewRef.current
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
    
    if (!iframeDoc) return
    
    // Mettre à jour le contenu HTML avec les données du formulaire
    let updatedHtml = template.htmlContent
    
    // Remplacer les champs de données
    template.fields.forEach(field => {
      const value = formData[field.id] || field.placeholder || `[${field.label}]`
      const regex = new RegExp(`data-field="${field.id}"[^>]*>[^<]*`, 'g')
      updatedHtml = updatedHtml.replace(regex, `data-field="${field.id}">${value}`)
    })
    
    // Appliquer le thème de couleur
    updatedHtml = updatedHtml.replace(/#2563eb/g, selectedTheme.primary)
    updatedHtml = updatedHtml.replace(/#1e40af/g, selectedTheme.secondary)
    
    // Appliquer la police
    updatedHtml = updatedHtml.replace(/font-family: 'Arial', sans-serif/g, `font-family: ${selectedFont.value}`)
    
    iframeDoc.body.innerHTML = updatedHtml
    
    // Ajouter les styles CSS
    const style = iframeDoc.createElement('style')
    style.textContent = `
      body {
        margin: 0;
        padding: 20px;
        background: #f5f5f5;
        font-family: ${selectedFont.value};
      }
      .cv-container {
        background: white;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        border-radius: 10px;
      }
      @media print {
        body {
          background: white;
          padding: 0;
        }
        .cv-container {
          box-shadow: none;
          border-radius: 0;
        }
      }
    `
    iframeDoc.head.appendChild(style)
  }

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }))
    setSaveStatus('idle')
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus('saving')
    
    // Simuler une sauvegarde
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSaving(false)
    setSaveStatus('saved')
    
    setTimeout(() => {
      setSaveStatus('idle')
    }, 2000)
  }

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return
    
    const iframe = previewRef.current
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
    
    if (!iframeDoc) return
    
    const content = iframeDoc.body.querySelector('.cv-container')
    if (content) {
      // Importer dynamiquement la fonction d'export PDF
      const { exportToPDF } = await import('@/lib/pdf-export')
      await exportToPDF(content as HTMLElement, `${template.name.replace(/\s+/g, '_')}.pdf`)
    } else {
      // Fallback: imprimer l'iframe
      iframe.contentWindow?.print()
    }
  }

  const handleDownloadWord = async () => {
    if (!previewRef.current) return
    
    const iframe = previewRef.current
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
    
    if (!iframeDoc) return
    
    const content = iframeDoc.body.innerHTML
    const { exportToWord } = await import('@/lib/pdf-export')
    await exportToWord(content, `${template.name.replace(/\s+/g, '_')}.docx`)
  }

  const handleShare = () => {
    // Implémenter la fonctionnalité de partage
    alert('Lien de partage copié dans le presse-papiers!')
  }

  const renderField = (field: TemplateField) => {
    const value = formData[field.id] || ''
    
    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={field.id}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className="min-h-[100px] resize-none"
            />
          </div>
        )
      
      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Select value={value} onValueChange={(newValue) => handleFieldChange(field.id, newValue)}>
              <SelectTrigger>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      
      default:
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              type={field.type}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder}
            />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/templates">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{template.name}</h1>
                <p className="text-sm text-gray-600">{template.category}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
              <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadWord}>
                <Download className="w-4 h-4 mr-2" />
                Word
              </Button>
              <Button size="sm" onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
              {saveStatus === 'saved' && (
                <Badge variant="default" className="bg-green-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Sauvegardé
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Informations du document
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {template.fields.map(renderField)}
              </CardContent>
            </Card>

            {/* Personnalisation du style */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Personnalisation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Thème de couleur</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {colorThemes.map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() => setSelectedTheme(theme)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedTheme.name === theme.name
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div
                          className="w-full h-8 rounded mb-1"
                          style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                        />
                        <span className="text-xs">{theme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Police de caractères</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {fontFamilies.map((font) => (
                      <button
                        key={font.name}
                        onClick={() => setSelectedFont(font)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedFont.name === font.name
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-sm" style={{ fontFamily: font.value }}>
                          {font.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prévisualisation */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Prévisualisation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <iframe
                    ref={previewRef}
                    className="w-full h-[600px] bg-white"
                    title="Document Preview"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                  <span>Prévisualisation en temps réel</span>
                  <Button variant="ghost" size="sm" onClick={() => window.print()}>
                    <Printer className="w-4 h-4 mr-2" />
                    Imprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}