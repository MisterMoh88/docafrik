export interface TemplateField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'email' | 'tel' | 'date' | 'select' | 'radio' | 'checkbox' | 'file';
  required: boolean;
  placeholder?: string;
  options?: string[]; // Pour select, radio, checkbox
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  defaultValue?: string;
  order: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'professionnels' | 'administratifs' | 'commerciaux' | 'academiques' | 'personnels';
  thumbnail: string; // URL de l'aperçu miniature
  previewImage?: string; // Image de prévisualisation plus grande
  tags: string[];
  fields: TemplateField[];
  htmlTemplate: string; // Template HTML avec placeholders
  cssStyles?: string; // Styles CSS spécifiques
  isActive: boolean;
  isPremium: boolean;
  usageCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}

export interface TemplateFormData {
  [key: string]: string | boolean | string[];
}