// Stockage côté client pour remplacer la base de données en mode statique
export interface ClientDocument {
  id: string;
  title: string;
  content: string;
  templateName: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?: string;
}

export interface ClientTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  htmlContent: string;
  isActive: boolean;
  usageCount: number;
  createdAt: string;
  features: string[];
  colorVariants: string[];
  thumbnailUrl?: string;
}

export interface ClientUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'CLIENT';
  createdAt: string;
}

class ClientStorage {
  private readonly STORAGE_KEYS = {
    DOCUMENTS: 'docafrik_documents',
    TEMPLATES: 'docafrik_templates',
    USER: 'docafrik_user',
    SETTINGS: 'docafrik_settings'
  };

  // Documents
  getDocuments(): ClientDocument[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.STORAGE_KEYS.DOCUMENTS);
    return data ? JSON.parse(data) : this.getDefaultDocuments();
  }

  saveDocument(document: ClientDocument): void {
    if (typeof window === 'undefined') return;
    const documents = this.getDocuments();
    const index = documents.findIndex(doc => doc.id === document.id);
    
    if (index >= 0) {
      documents[index] = { ...document, updatedAt: new Date().toISOString() };
    } else {
      documents.push({ ...document, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    
    localStorage.setItem(this.STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
  }

  deleteDocument(id: string): void {
    if (typeof window === 'undefined') return;
    const documents = this.getDocuments().filter(doc => doc.id !== id);
    localStorage.setItem(this.STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
  }

  // Templates
  getTemplates(): ClientTemplate[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.STORAGE_KEYS.TEMPLATES);
    return data ? JSON.parse(data) : this.getDefaultTemplates();
  }

  saveTemplate(template: ClientTemplate): void {
    if (typeof window === 'undefined') return;
    const templates = this.getTemplates();
    const index = templates.findIndex(t => t.id === template.id);
    
    if (index >= 0) {
      templates[index] = template;
    } else {
      templates.push(template);
    }
    
    localStorage.setItem(this.STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
  }

  // User
  getUser(): ClientUser | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(this.STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  }

  saveUser(user: ClientUser): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(user));
  }

  logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.STORAGE_KEYS.USER);
  }

  // Données par défaut
  private getDefaultDocuments(): ClientDocument[] {
    return [
      {
        id: '1',
        title: 'CV Moderne - Exemple',
        content: '<html><body><h1>Jean Dupont</h1><p>Développeur Web</p></body></html>',
        templateName: 'CV Moderne',
        status: 'DRAFT',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
      }
    ];
  }

  private getDefaultTemplates(): ClientTemplate[] {
    return [
      {
        id: '1',
        name: 'CV Moderne',
        category: 'Professionnel',
        description: 'CV moderne et élégant parfait pour les professionnels du tech',
        htmlContent: this.getDefaultCVTemplate(),
        isActive: true,
        usageCount: 156,
        createdAt: '2024-01-01T00:00:00Z',
        features: ['Moderne', 'Élégant', 'Tech'],
        colorVariants: ['#2563eb', '#059669', '#7c3aed'],
        thumbnailUrl: '/api/placeholder/400/300/2563eb/ffffff?text=CV+Moderne'
      },
      {
        id: '2',
        name: 'Lettre de Motivation',
        category: 'Professionnel',
        description: 'Lettre de motivation professionnelle et percutante',
        htmlContent: this.getDefaultLetterTemplate(),
        isActive: true,
        usageCount: 89,
        createdAt: '2024-01-01T00:00:00Z',
        features: ['Professionnel', 'Percutant'],
        colorVariants: ['#1e40af', '#0891b2', '#047857'],
        thumbnailUrl: '/api/placeholder/400/300/1e40af/ffffff?text=Lettre+Motivation'
      },
      {
        id: '3',
        name: 'Facture Pro',
        category: 'Commercial',
        description: 'Facture professionnelle complète avec tous les champs nécessaires',
        htmlContent: this.getDefaultInvoiceTemplate(),
        isActive: true,
        usageCount: 67,
        createdAt: '2024-01-01T00:00:00Z',
        features: ['Professionnel', 'Complet', 'Entreprise'],
        colorVariants: ['#059669', '#0891b2', '#1e40af'],
        thumbnailUrl: '/api/placeholder/400/300/059669/ffffff?text=Facture+Pro'
      }
    ];
  }

  private getDefaultCVTemplate(): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>CV Moderne</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
        .section { margin: 20px 0; }
        .job { margin: 10px 0; }
        .skills { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill { background: #2563eb; color: white; padding: 5px 10px; border-radius: 3px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>{{nom}}</h1>
        <p>{{titre}} | {{email}} | {{telephone}}</p>
      </div>
      
      <div class="section">
        <h2>À propos</h2>
        <p>{{description}}</p>
      </div>
      
      <div class="section">
        <h2>Expérience professionnelle</h2>
        <div class="job">
          <h3>{{poste1}} - {{entreprise1}}</h3>
          <p>{{periode1}}</p>
          <p>{{description1}}</p>
        </div>
      </div>
      
      <div class="section">
        <h2>Compétences</h2>
        <div class="skills">
          <span class="skill">{{competence1}}</span>
          <span class="skill">{{competence2}}</span>
          <span class="skill">{{competence3}}</span>
        </div>
      </div>
    </body>
    </html>`;
  }

  private getDefaultLetterTemplate(): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Lettre de Motivation</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: right; margin-bottom: 30px; }
        .recipient { margin-bottom: 30px; }
        .content { text-align: justify; }
        .signature { margin-top: 50px; }
      </style>
    </head>
    <body>
      <div class="header">
        <p>{{ville}}, le {{date}}</p>
        <p>{{nom}} {{prenom}}</p>
        <p>{{adresse}}</p>
        <p>{{email}} | {{telephone}}</p>
      </div>
      
      <div class="recipient">
        <p>{{entreprise}}</p>
        <p>{{service}}</p>
        <p>{{adresse_entreprise}}</p>
      </div>
      
      <div class="content">
        <p>Objet: Candidature au poste de {{poste}}</p>
        
        <p>Madame, Monsieur,</p>
        
        <p>{{introduction}}</p>
        
        <p>{{motivation}}</p>
        
        <p>{{conclusion}}</p>
        
        <p>Dans l'attente de votre réponse, je reste à votre disposition pour un entretien.</p>
        
        <p>Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>
      </div>
      
      <div class="signature">
        <p>{{nom}} {{prenom}}</p>
      </div>
    </body>
    </html>`;
  }

  private getDefaultInvoiceTemplate(): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Facture</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .invoice-info { text-align: right; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f2f2f2; }
        .total { text-align: right; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1>{{entreprise}}</h1>
          <p>{{adresse_entreprise}}</p>
          <p>{{email_entreprise}} | {{telephone_entreprise}}</p>
        </div>
        <div class="invoice-info">
          <h2>FACTURE</h2>
          <p>N°: {{numero_facture}}</p>
          <p>Date: {{date_facture}}</p>
        </div>
      </div>
      
      <div>
        <h3>Client:</h3>
        <p>{{nom_client}}</p>
        <p>{{adresse_client}}</p>
        <p>{{email_client}}</p>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{produit1}}</td>
            <td>{{quantite1}}</td>
            <td>{{prix1}}</td>
            <td>{{total1}}</td>
          </tr>
        </tbody>
      </table>
      
      <div class="total">
        <p>Total HT: {{total_ht}}</p>
        <p>TVA (20%): {{tva}}</p>
        <p><strong>Total TTC: {{total_ttc}}</strong></p>
      </div>
    </body>
    </html>`;
  }
}

export const clientStorage = new ClientStorage();