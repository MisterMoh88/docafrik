'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Template, TemplateField, TemplateFormData } from '@/types/template';
import { 
  Save, 
  Download, 
  Eye, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  MapPin,
  Building,
  GraduationCap,
  Briefcase,
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  Star,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface TemplateFormProps {
  template: Template;
  onSubmit: (data: TemplateFormData) => void;
  onSave?: (data: TemplateFormData) => void;
  onPreview?: (data: TemplateFormData) => void;
  initialData?: TemplateFormData;
  showProgress?: boolean;
}

export default function TemplateForm({ 
  template, 
  onSubmit, 
  onSave, 
  onPreview, 
  initialData = {},
  showProgress = true 
}: TemplateFormProps) {
  const [formData, setFormData] = useState<TemplateFormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeScore, setResumeScore] = useState(0);
  const [scoreChanges, setScoreChanges] = useState<string[]>([]);

  // Group fields by sections matching the screenshot
  const fieldGroups = [
    {
      title: 'Détails personnels',
      subtitle: 'Commençons par vos informations de contact',
      icon: User,
      fields: template.fields.filter(f => 
        f.name.includes('first_name') || f.name.includes('last_name') || 
        f.name.includes('email') || f.name.includes('phone') || f.name.includes('address') ||
        f.name.includes('job_title')
      )
    },
    {
      title: 'Résumé professionnel',
      subtitle: 'Parlez-nous de votre parcours professionnel',
      icon: Briefcase,
      fields: template.fields.filter(f => 
        f.name.includes('summary') || f.name.includes('experience') || f.name.includes('objective')
      )
    },
    {
      title: 'Informations supplémentaires',
      subtitle: 'Détails supplémentaires pour renforcer votre CV',
      icon: FileText,
      fields: template.fields.filter(f => 
        !f.name.includes('first_name') && !f.name.includes('last_name') && 
        !f.name.includes('email') && !f.name.includes('phone') && !f.name.includes('address') &&
        !f.name.includes('job_title') && !f.name.includes('summary') && 
        !f.name.includes('experience') && !f.name.includes('objective')
      )
    }
  ].filter(group => group.fields.length > 0);

  const totalSteps = fieldGroups.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // Calculate resume score based on filled fields
  useEffect(() => {
    let score = 0;
    const changes: string[] = [];
    
    // Base score for having basic info
    if (formData.first_name && formData.last_name) {
      score += 20;
      changes.push('Ajout du nom: +10%');
    }
    if (formData.email) {
      score += 15;
      changes.push('Ajout de l\'email: +10%');
    }
    if (formData.phone) {
      score += 15;
      changes.push('Ajout du téléphone: +5%');
    }
    if (formData.job_title) {
      score += 25;
      changes.push('Ajout du poste: +25%');
    }
    if (formData.summary && formData.summary.length > 50) {
      score += 25;
      changes.push('Ajout du résumé professionnel: +25%');
    }

    setResumeScore(score);
    setScoreChanges(changes.slice(-3)); // Show last 3 changes
  }, [formData]);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleFieldChange = (fieldName: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validateField = (field: TemplateField, value: any): string => {
    if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
      return `${field.label} est requis`;
    }

    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Veuillez entrer une adresse email valide';
      }
    }

    if (field.validation) {
      if (field.validation.minLength && value && value.length < field.validation.minLength) {
        return `${field.label} doit contenir au moins ${field.validation.minLength} caractères`;
      }
      if (field.validation.maxLength && value && value.length > field.validation.maxLength) {
        return `${field.label} ne doit pas dépasser ${field.validation.maxLength} caractères`;
      }
    }

    return '';
  };

  const validateStep = (stepIndex: number): boolean => {
    const stepFields = fieldGroups[stepIndex].fields;
    const newErrors: Record<string, string> = {};

    stepFields.forEach(field => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Validate all fields
    let isValid = true;
    const allErrors: Record<string, string> = {};

    template.fields.forEach(field => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        allErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(allErrors);

    if (isValid) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderField = (field: TemplateField) => {
    const value = formData[field.name] || field.defaultValue || '';
    const error = errors[field.name];

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'date':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2 text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={value as string}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className={`h-11 ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            />
            {error && <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2 text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              value={value as string}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              rows={4}
              className={`resize-none ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            />
            {error && <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="flex items-center gap-2 text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Select
              value={value as string}
              onValueChange={(newValue) => handleFieldChange(field.name, newValue)}
            >
              <SelectTrigger className={`h-11 ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>}
          </div>
        );

      case 'radio':
        return (
          <div key={field.id} className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <RadioGroup
              value={value as string}
              onValueChange={(newValue) => handleFieldChange(field.name, newValue)}
            >
              {field.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                  <Label htmlFor={`${field.id}-${option}`} className="text-sm">{option}</Label>
                </div>
              ))}
            </RadioGroup>
            {error && <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </Label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.id}-${option}`}
                    checked={(value as string[] || []).includes(option)}
                    onCheckedChange={(checked) => {
                      const currentValues = value as string[] || [];
                      if (checked) {
                        handleFieldChange(field.name, [...currentValues, option]);
                      } else {
                        handleFieldChange(field.name, currentValues.filter(v => v !== option));
                      }
                    }}
                  />
                  <Label htmlFor={`${field.id}-${option}`} className="text-sm">{option}</Label>
                </div>
              ))}
            </div>
            {error && <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>}
          </div>
        );

      default:
        return null;
    }
  };

  const currentGroup = fieldGroups[currentStep];
  const Icon = currentGroup.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 text-white font-semibold px-3 py-1.5 rounded-lg tracking-tight text-lg">DA</div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{template.name}</h1>
                <p className="text-sm text-gray-500">{template.description}</p>
              </div>
            </div>
            
            {/* Resume Score */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <TrendingUp className="w-5 h-5" />
                  Score de votre CV +{resumeScore}%
                </div>
                {scoreChanges.length > 0 && (
                  <div className="text-xs text-gray-500">
                    {scoreChanges[scoreChanges.length - 1]}
                  </div>
                )}
              </div>
              
              <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold">{resumeScore}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Détails personnels</h3>
                    <p className="text-sm text-gray-500">Vos informations de contact</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Résumé professionnel</h3>
                    <p className="text-sm text-gray-500">Votre parcours</p>
                  </div>
                </div>
                
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  <FileText className="w-5 h-5" />
                </div>
              </div>
              
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Étape {currentStep + 1} sur {totalSteps}</span>
                <span>{Math.round(progress)}% complété</span>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentGroup.title}</h2>
                <p className="text-gray-600">{currentGroup.subtitle}</p>
              </div>

              <div className="space-y-6">
                {currentGroup.fields
                  .sort((a, b) => a.order - b.order)
                  .map(renderField)}
              </div>

              {/* Photo Upload Section */}
              {currentStep === 0 && (
                <div className="mt-8 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Télécharger une photo</h3>
                  <p className="text-gray-600 mb-4">Ajoutez une photo professionnelle pour augmenter vos chances</p>
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Choisir une photo
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">JPG, PNG jusqu'à 5MB</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div>
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Précédent
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-3">
                {onSave && (
                  <Button
                    variant="outline"
                    onClick={() => onSave(formData)}
                    className="flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Sauvegarder
                  </Button>
                )}

                {currentStep < totalSteps - 1 ? (
                  <Button
                    onClick={handleNextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6"
                  >
                    Suivant: {fieldGroups[currentStep + 1].title}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Génération...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Télécharger le CV
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Conseils pro
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Utilisez une adresse email professionnelle</li>
                <li>• Incluez votre profil LinkedIn</li>
                <li>• Gardez votre résumé concis</li>
                <li>• Utilisez des verbes d'action</li>
              </ul>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Aperçu</h3>
              <div className="bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">L'aperçu du CV apparaîtra ici</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}