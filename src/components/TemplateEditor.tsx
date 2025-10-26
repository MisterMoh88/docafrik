'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Template, TemplateField } from '@/types/template';
import { 
  Save, 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  MoveUp, 
  MoveDown, 
  Settings,
  FileText,
  Image as ImageIcon,
  Code,
  Palette,
  Layout,
  Copy,
  Download
} from 'lucide-react';

interface TemplateEditorProps {
  template?: Template;
  onSave: (template: Template) => void;
  onCancel: () => void;
  mode?: 'create' | 'edit';
}

export default function TemplateEditor({ 
  template, 
  onSave, 
  onCancel, 
  mode = 'create' 
}: TemplateEditorProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Template>>({
    name: '',
    description: '',
    category: 'professionnels',
    thumbnail: '',
    previewImage: '',
    tags: [],
    fields: [],
    htmlTemplate: '',
    cssStyles: '',
    isActive: true,
    isPremium: false,
    usageCount: 0,
    rating: 0,
    createdBy: 'admin'
  });

  const [newTag, setNewTag] = useState('');
  const [selectedField, setSelectedField] = useState<TemplateField | null>(null);

  useEffect(() => {
    if (template && mode === 'edit') {
      setFormData(template);
    }
  }, [template, mode]);

  const handleAddField = () => {
    const newField: TemplateField = {
      id: `field_${Date.now()}`,
      name: '',
      label: '',
      type: 'text',
      required: false,
      placeholder: '',
      order: formData.fields?.length || 0
    };

    setFormData(prev => ({
      ...prev,
      fields: [...(prev.fields || []), newField]
    }));
    setSelectedField(newField);
  };

  const handleUpdateField = (fieldId: string, updates: Partial<TemplateField>) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields?.map(field => 
        field.id === fieldId ? { ...field, ...updates } : field
      )
    }));
  };

  const handleDeleteField = (fieldId: string) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields?.filter(field => field.id !== fieldId)
    }));
    if (selectedField?.id === fieldId) {
      setSelectedField(null);
    }
  };

  const handleMoveField = (fieldId: string, direction: 'up' | 'down') => {
    const fields = [...(formData.fields || [])];
    const index = fields.findIndex(f => f.id === fieldId);
    
    if (direction === 'up' && index > 0) {
      [fields[index], fields[index - 1]] = [fields[index - 1], fields[index]];
    } else if (direction === 'down' && index < fields.length - 1) {
      [fields[index], fields[index + 1]] = [fields[index + 1], fields[index]];
    }

    setFormData(prev => ({ ...prev, fields }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove)
    }));
  };

  const generateThumbnail = () => {
    // Simuler la génération d'un thumbnail
    const thumbnailUrl = `https://picsum.photos/seed/${formData.name || 'template'}/400/300.jpg`;
    setFormData(prev => ({ ...prev, thumbnail: thumbnailUrl }));
  };

  const handleSave = () => {
    const templateToSave: Template = {
      id: template?.id || `template_${Date.now()}`,
      name: formData.name || '',
      description: formData.description || '',
      category: formData.category as any,
      thumbnail: formData.thumbnail || '',
      previewImage: formData.previewImage || '',
      tags: formData.tags || [],
      fields: formData.fields || [],
      htmlTemplate: formData.htmlTemplate || '',
      cssStyles: formData.cssStyles || '',
      isActive: formData.isActive ?? true,
      isPremium: formData.isPremium ?? false,
      usageCount: formData.usageCount || 0,
      rating: formData.rating || 0,
      createdAt: template?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: formData.createdBy || 'admin'
    };

    onSave(templateToSave);
  };

  const renderFieldEditor = () => {
    if (!selectedField) {
      return (
        <div className="text-center py-8 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Sélectionnez un champ pour l'éditer</p>
          <Button onClick={handleAddField} className="mt-4">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un champ
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Éditer le champ</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeleteField(selectedField.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nom du champ</Label>
            <Input
              value={selectedField.name}
              onChange={(e) => handleUpdateField(selectedField.id, { name: e.target.value })}
              placeholder="ex: nom_complet"
            />
          </div>

          <div className="space-y-2">
            <Label>Label</Label>
            <Input
              value={selectedField.label}
              onChange={(e) => handleUpdateField(selectedField.id, { label: e.target.value })}
              placeholder="ex: Nom complet"
            />
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={selectedField.type}
              onValueChange={(value) => handleUpdateField(selectedField.id, { type: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Texte</SelectItem>
                <SelectItem value="textarea">Zone de texte</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="tel">Téléphone</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="select">Liste déroulante</SelectItem>
                <SelectItem value="radio">Boutons radio</SelectItem>
                <SelectItem value="checkbox">Cases à cocher</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Placeholder</Label>
            <Input
              value={selectedField.placeholder || ''}
              onChange={(e) => handleUpdateField(selectedField.id, { placeholder: e.target.value })}
              placeholder="Texte d'aide"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={selectedField.required}
            onCheckedChange={(checked) => handleUpdateField(selectedField.id, { required: checked })}
          />
          <Label>Champ obligatoire</Label>
        </div>

        {(selectedField.type === 'select' || selectedField.type === 'radio' || selectedField.type === 'checkbox') && (
          <div className="space-y-2">
            <Label>Options</Label>
            <Textarea
              value={selectedField.options?.join('\n') || ''}
              onChange={(e) => handleUpdateField(selectedField.id, { 
                options: e.target.value.split('\n').filter(o => o.trim()) 
              })}
              placeholder="Option 1&#10;Option 2&#10;Option 3"
              rows={4}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* En-tête */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {mode === 'create' ? 'Créer un modèle' : 'Modifier le modèle'}
              </CardTitle>
              <CardDescription>
                Configurez votre modèle de document avec ses champs et son apparence
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={onCancel}>
                Annuler
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Informations
          </TabsTrigger>
          <TabsTrigger value="fields" className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            Champs
          </TabsTrigger>
          <TabsTrigger value="template" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            Template
          </TabsTrigger>
          <TabsTrigger value="style" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Styles
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Aperçu
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations de base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom du modèle</Label>
                  <Input
                    value={formData.name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="ex: CV Moderne"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Catégorie</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professionnels">Professionnels</SelectItem>
                      <SelectItem value="administratifs">Administratifs</SelectItem>
                      <SelectItem value="commerciaux">Commerciaux</SelectItem>
                      <SelectItem value="academiques">Académiques</SelectItem>
                      <SelectItem value="personnels">Personnels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Décrivez votre modèle..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Ajouter un tag"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button onClick={handleAddTag}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer">
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-xs hover:text-red-600"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Thumbnail</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.thumbnail || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
                    placeholder="URL de l'image thumbnail"
                  />
                  <Button variant="outline" onClick={generateThumbnail}>
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Générer
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                  <Label>Actif</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.isPremium}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPremium: checked }))}
                  />
                  <Label>Premium</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fields" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Liste des champs */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Champs du formulaire</CardTitle>
                  <Button size="sm" onClick={handleAddField}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {formData.fields?.map((field, index) => (
                  <div
                    key={field.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedField?.id === field.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedField(field)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{field.label || 'Champ sans nom'}</div>
                        <div className="text-sm text-gray-500">{field.type}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveField(field.id, 'up');
                          }}
                          disabled={index === 0}
                        >
                          <MoveUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoveField(field.id, 'down');
                          }}
                          disabled={index === (formData.fields?.length || 0) - 1}
                        >
                          <MoveDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Éditeur de champ */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Éditeur de champ</CardTitle>
              </CardHeader>
              <CardContent>
                {renderFieldEditor()}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="template" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Template HTML</CardTitle>
              <CardDescription>
                Utilisez {"{nom_du_champ}"} comme placeholder pour les champs du formulaire
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.htmlTemplate || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, htmlTemplate: e.target.value }))}
                placeholder="<h1>{nom_complet}</h1>
<p>{email}</p>
<p>{telephone}</p>"
                rows={20}
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="style" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Styles CSS</CardTitle>
              <CardDescription>
                Styles personnalisés pour votre modèle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.cssStyles || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, cssStyles: e.target.value }))}
                placeholder="body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}
h1 {
  color: #333;
}"
                rows={15}
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aperçu du modèle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6 min-h-[400px]">
                {formData.thumbnail ? (
                  <img 
                    src={formData.thumbnail} 
                    alt="Aperçu" 
                    className="w-full h-auto rounded"
                  />
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Aucun aperçu disponible</p>
                    <p className="text-sm">Générez un thumbnail dans l'onglet "Informations"</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}