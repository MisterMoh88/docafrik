import { Template } from '@/types/template';

export const mockTemplates: Template[] = [
  {
    id: 'cv_moderne',
    name: 'CV Moderne',
    description: 'Design épuré et professionnel avec photo optionnelle',
    category: 'professionnels',
    thumbnail: '/api/placeholder/400/300?text=CV+Moderne',
    previewImage: '/api/placeholder/800/600?text=CV+Moderne+Preview',
    tags: ['CV', 'Moderne', 'Professionnel', 'Photo'],
    usageCount: 1250,
    rating: 4.8,
    isPremium: false,
    fields: [
      {
        id: 'job_title',
        name: 'job_title',
        label: 'Intitulé du poste',
        type: 'text',
        required: true,
        placeholder: 'Le poste que vous visez',
        order: 1
      },
      {
        id: 'first_name',
        name: 'first_name',
        label: 'Prénom',
        type: 'text',
        required: true,
        placeholder: 'Jean',
        order: 2
      },
      {
        id: 'last_name',
        name: 'last_name',
        label: 'Nom',
        type: 'text',
        required: true,
        placeholder: 'Dupont',
        order: 3
      },
      {
        id: 'email',
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        placeholder: 'jean.dupont@email.com',
        order: 4
      },
      {
        id: 'phone',
        name: 'phone',
        label: 'Téléphone',
        type: 'tel',
        required: true,
        placeholder: '+223 01 23 45 67',
        order: 5
      },
      {
        id: 'address',
        name: 'address',
        label: 'Adresse',
        type: 'text',
        required: false,
        placeholder: 'Bamako, Mali',
        order: 6
      },
      {
        id: 'summary',
        name: 'summary',
        label: 'Résumé professionnel',
        type: 'textarea',
        required: true,
        placeholder: 'Décrivez votre parcours professionnel en quelques lignes...',
        order: 7
      }
    ],
    htmlTemplate: `
<div class="cv-container">
  <header class="cv-header">
    <div class="photo-placeholder">
      <div style="width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px;">
        {first_name} {last_name}
      </div>
    </div>
    <div class="contact-info">
      <h1>{first_name} {last_name}</h1>
      <p class="poste">{job_title}</p>
      <div class="contact-details">
        <p>📧 {email}</p>
        <p>📱 {phone}</p>
        <p>📍 {address}</p>
      </div>
    </div>
  </header>
  
  <main class="cv-content">
    <section class="summary">
      <h2>Résumé professionnel</h2>
      <div class="content">{summary}</div>
    </section>
  </main>
</div>

<style>
.cv-container {
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  color: #333;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.cv-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #2563eb;
}

.contact-info h1 {
  color: #2563eb;
  margin: 0 0 5px 0;
  font-size: 2.5em;
}

.poste {
  color: #64748b;
  font-size: 1.2em;
  margin: 0 0 10px 0;
}

.contact-details p {
  margin: 5px 0;
  font-size: 0.9em;
}

section {
  margin-bottom: 25px;
}

section h2 {
  color: #2563eb;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 5px;
  margin-bottom: 15px;
}

.content {
  line-height: 1.6;
}
</style>
    `,
    cssStyles: '',
    isActive: true,
    isPremium: false,
    usageCount: 1250,
    rating: 4.8,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    createdBy: 'admin'
  },
  {
    id: 'lettre_motivation',
    name: 'Lettre de motivation',
    description: 'Lettres convaincantes générées par IA',
    category: 'professionnels',
    thumbnail: '/api/placeholder/400/300?text=Lettre+Motivation',
    previewImage: '/api/placeholder/800/600?text=Lettre+Motivation+Preview',
    tags: ['Lettre', 'Motivation', 'Professionnel', 'IA'],
    usageCount: 890,
    rating: 4.6,
    isPremium: false,
    fields: [
      {
        id: 'job_title',
        name: 'job_title',
        label: 'Intitulé du poste',
        type: 'text',
        required: true,
        placeholder: 'Le poste que vous visez',
        order: 1
      },
      {
        id: 'first_name',
        name: 'first_name',
        label: 'Prénom',
        type: 'text',
        required: true,
        placeholder: 'Marie',
        order: 2
      },
      {
        id: 'last_name',
        name: 'last_name',
        label: 'Nom',
        type: 'text',
        required: true,
        placeholder: 'Martin',
        order: 3
      },
      {
        id: 'email',
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        placeholder: 'marie.martin@email.com',
        order: 4
      },
      {
        id: 'phone',
        name: 'phone',
        label: 'Téléphone',
        type: 'tel',
        required: true,
        placeholder: '+223 01 23 45 67',
        order: 5
      },
      {
        id: 'company',
        name: 'company',
        label: 'Nom de l\'entreprise',
        type: 'text',
        required: true,
        placeholder: 'Tech Solutions SA',
        order: 6
      },
      {
        id: 'motivation',
        name: 'motivation',
        label: 'Votre motivation',
        type: 'textarea',
        required: true,
        placeholder: 'Expliquez pourquoi vous êtes le candidat idéal...',
        order: 7
      }
    ],
    htmlTemplate: `
<div class="letter-container">
  <header class="letter-header">
    <div class="sender-info">
      <p><strong>{first_name} {last_name}</strong></p>
      <p>{email}</p>
      <p>{phone}</p>
    </div>
    <div class="date">
      <p>{current_date}</p>
    </div>
  </header>
  
  <div class="recipient-info">
    <p><strong>À l'attention du service RH</strong></p>
    <p>{company}</p>
  </div>
  
  <main class="letter-content">
    <h1>Lettre de motivation</h1>
    <p>Objet : Candidature au poste de {job_title}</p>
    
    <div class="letter-body">
      <p>Madame, Monsieur,</p>
      
      <p>C'est avec grand intérêt que j'ai pris connaissance de votre offre d'emploi pour le poste de {job_title} au sein de votre entreprise {company}. Je suis convaincu que mon profil et mes compétences correspondent parfaitement à vos attentes.</p>
      
      <div class="motivation-section">
        <h3>Ma motivation pour ce poste</h3>
        <p>{motivation}</p>
      </div>
      
      <p>Je serais ravi de pouvoir échanger avec vous plus en détail sur ma candidature lors d'un entretien.</p>
      
      <p>Dans l'attente de votre retour, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>
    </div>
  </main>
  
  <footer class="letter-footer">
    <p>{first_name} {last_name}</p>
  </footer>
</div>

<style>
.letter-container {
  font-family: 'Times New Roman', serif;
  max-width: 700px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  color: #333;
  line-height: 1.6;
}

.letter-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.sender-info p, .date p {
  margin: 5px 0;
  font-size: 0.9em;
}

.recipient-info {
  margin-bottom: 30px;
  padding: 20px;
  background: #f8fafc;
  border-left: 4px solid #2563eb;
}

.letter-content h1 {
  color: #2563eb;
  text-align: center;
  margin-bottom: 10px;
}

.letter-content p:first-of-type {
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
}

.letter-body p {
  margin-bottom: 15px;
  text-align: justify;
}

.motivation-section {
  margin: 25px 0;
  padding: 20px;
  background: #f1f5f9;
  border-radius: 8px;
}

.motivation-section h3 {
  color: #2563eb;
  margin-bottom: 10px;
}

.letter-footer {
  margin-top: 50px;
  text-align: right;
}
</style>
    `,
    cssStyles: '',
    isActive: true,
    isPremium: false,
    usageCount: 890,
    rating: 4.6,
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
    createdBy: 'admin'
  },
  {
    id: 'facture_pro',
    name: 'Facture Professionnelle',
    description: 'Factures professionnelles avec logo et calculs TVA automatiques',
    category: 'commerciaux',
    thumbnail: '/api/placeholder/400/300?text=Facture+Pro',
    previewImage: '/api/placeholder/800/600?text=Facture+Pro+Preview',
    tags: ['Facture', 'Commercial', 'Professionnel', 'TVA'],
    usageCount: 567,
    rating: 4.9,
    isPremium: true,
    fields: [
      {
        id: 'company_name',
        name: 'company_name',
        label: 'Nom de votre entreprise',
        type: 'text',
        required: true,
        placeholder: 'Tech Solutions SARL',
        order: 1
      },
      {
        id: 'company_address',
        name: 'company_address',
        label: 'Adresse de l\'entreprise',
        type: 'text',
        required: true,
        placeholder: '123 Rue du Commerce, Bamako',
        order: 2
      },
      {
        id: 'client_name',
        name: 'client_name',
        label: 'Nom du client',
        type: 'text',
        required: true,
        placeholder: 'Client ABC',
        order: 3
      },
      {
        id: 'client_address',
        name: 'client_address',
        label: 'Adresse du client',
        type: 'text',
        required: true,
        placeholder: '456 Avenue des Nations, Bamako',
        order: 4
      },
      {
        id: 'invoice_number',
        name: 'invoice_number',
        label: 'Numéro de facture',
        type: 'text',
        required: true,
        placeholder: 'FAC-2024-001',
        order: 5
      },
      {
        id: 'invoice_date',
        name: 'invoice_date',
        label: 'Date de facturation',
        type: 'date',
        required: true,
        order: 6
      },
      {
        id: 'due_date',
        name: 'due_date',
        label: 'Date d\'échéance',
        type: 'date',
        required: true,
        order: 7
      },
      {
        id: 'services',
        name: 'services',
        label: 'Services rendus',
        type: 'textarea',
        required: true,
        placeholder: 'Décrivez les services facturés...',
        order: 8
      },
      {
        id: 'amount_ht',
        name: 'amount_ht',
        label: 'Montant HT (FCFA)',
        type: 'text',
        required: true,
        placeholder: '100000',
        order: 9
      },
      {
        id: 'tva',
        name: 'tva',
        label: 'TVA (%)',
        type: 'select',
        required: true,
        options: ['0', '10', '18'],
        defaultValue: '18',
        order: 10
      }
    ],
    htmlTemplate: `
<div class="invoice-container">
  <header class="invoice-header">
    <div class="company-info">
      <h1>{company_name}</h1>
      <p>{company_address}</p>
    </div>
    <div class="invoice-info">
      <h2>FACTURE</h2>
      <p><strong>N° :</strong> {invoice_number}</p>
      <p><strong>Date :</strong> {invoice_date}</p>
      <p><strong>Échéance :</strong> {due_date}</p>
    </div>
  </header>
  
  <section class="client-info">
    <h3>Client :</h3>
    <p><strong>{client_name}</strong></p>
    <p>{client_address}</p>
  </section>
  
  <main class="invoice-content">
    <section class="services">
      <h3>Prestations</h3>
      <div class="services-content">
        {services}
      </div>
    </section>
    
    <section class="amounts">
      <div class="amount-row">
        <span>Montant HT :</span>
        <span>{amount_ht} FCFA</span>
      </div>
      <div class="amount-row">
        <span>TVA ({tva}%) :</span>
        <span>{tva_amount} FCFA</span>
      </div>
      <div class="amount-row total">
        <span>Montant TTC :</span>
        <span>{total_amount} FCFA</span>
      </div>
    </section>
  </main>
  
  <footer class="invoice-footer">
    <p>Mentions légales : En cas de retard de paiement, une pénalité de 3 fois le taux d'intérêt légal sera appliquée.</p>
    <p>Merci de votre confiance !</p>
  </footer>
</div>

<style>
.invoice-container {
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background: white;
  color: #333;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #2563eb;
}

.company-info h1 {
  color: #2563eb;
  margin: 0 0 10px 0;
  font-size: 1.8em;
}

.invoice-info {
  text-align: right;
}

.invoice-info h2 {
  color: #2563eb;
  margin: 0 0 15px 0;
  font-size: 1.5em;
}

.invoice-info p {
  margin: 5px 0;
}

.client-info {
  margin-bottom: 30px;
  padding: 20px;
  background: #f8fafc;
  border-left: 4px solid #2563eb;
}

.client-info h3 {
  margin: 0 0 10px 0;
  color: #2563eb;
}

.services {
  margin-bottom: 30px;
}

.services h3 {
  color: #2563eb;
  margin-bottom: 15px;
}

.services-content {
  padding: 20px;
  background: #f1f5f9;
  border-radius: 8px;
  line-height: 1.6;
}

.amounts {
  background: #f8fafc;
  padding: 20px;
  border-radius: 8px;
}

.amount-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 1.1em;
}

.amount-row.total {
  border-top: 2px solid #2563eb;
  padding-top: 10px;
  font-weight: bold;
  color: #2563eb;
  font-size: 1.3em;
}

.invoice-footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  font-size: 0.9em;
  color: #64748b;
}
</style>
    `,
    cssStyles: '',
    isActive: true,
    isPremium: true,
    usageCount: 567,
    rating: 4.9,
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z',
    createdBy: 'admin'
  },
  {
    id: 'attestation_travail',
    name: 'Attestation de travail',
    description: 'Attestations de travail, stage, formation',
    category: 'administratifs',
    thumbnail: '/api/placeholder/400/300?text=Attestation',
    previewImage: '/api/placeholder/800/600?text=Attestation+Preview',
    tags: ['Attestation', 'Travail', 'Administratif', 'Officiel'],
    usageCount: 445,
    rating: 4.7,
    isPremium: false,
    fields: [
      {
        id: 'company_name',
        name: 'company_name',
        label: 'Nom de l\'entreprise',
        type: 'text',
        required: true,
        placeholder: 'Tech Solutions SARL',
        order: 1
      },
      {
        id: 'company_address',
        name: 'company_address',
        label: 'Adresse de l\'entreprise',
        type: 'text',
        required: true,
        placeholder: '123 Rue du Commerce, Bamako',
        order: 2
      },
      {
        id: 'employee_name',
        name: 'employee_name',
        label: 'Nom de l\'employé',
        type: 'text',
        required: true,
        placeholder: 'Jean Dupont',
        order: 3
      },
      {
        id: 'birth_date',
        name: 'birth_date',
        label: 'Date de naissance',
        type: 'date',
        required: true,
        order: 4
      },
      {
        id: 'position',
        name: 'position',
        label: 'Poste occupé',
        type: 'text',
        required: true,
        placeholder: 'Développeur Full Stack',
        order: 5
      },
      {
        id: 'start_date',
        name: 'start_date',
        label: 'Date de début',
        type: 'date',
        required: true,
        order: 6
      },
      {
        id: 'end_date',
        name: 'end_date',
        label: 'Date de fin',
        type: 'date',
        required: false,
        order: 7
      },
      {
        id: 'attestation_type',
        name: 'attestation_type',
        label: 'Type d\'attestation',
        type: 'select',
        required: true,
        options: ['Travail', 'Stage', 'Formation'],
        order: 8
      }
    ],
    htmlTemplate: `
<div class="attestation-container">
  <header class="attestation-header">
    <div class="letterhead">
      <h1>{company_name}</h1>
      <p>{company_address}</p>
    </div>
    <div class="document-title">
      <h2>ATTESTATION DE {attestation_type.toUpperCase()}</h2>
    </div>
  </header>
  
  <main class="attestation-content">
    <div class="attestation-body">
      <p><strong>Date :</strong> {current_date}</p>
      <br>
      <p>Je soussigné, représentant de {company_name}, certifie par la présente que :</p>
      <br>
      <p><strong>M./Mme {employee_name}</strong>, né(e) le {birth_date || 'Date à spécifier'}, a bien effectué un {attestation_type.toLowerCase()} au sein de notre entreprise.</p>
      <br>
      <p><strong>Détails du {attestation_type.toLowerCase()} :</strong></p>
      <ul>
        <li>Poste occupé : {position}</li>
        <li>Date de début : {start_date}</li>
        <li>Date de fin : {end_date || 'En cours'}</li>
      </ul>
      <br>
      <p>Cette attestation est délivrée pour servir et valoir ce que de droit.</p>
    </div>
  </main>
  
  <footer class="attestation-footer">
    <div class="signature">
      <p>Fait à Bamako, le {current_date}</p>
      <br><br>
      <p>Signature et cachet de l'entreprise</p>
    </div>
  </footer>
</div>

<style>
.attestation-container {
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  color: #333;
  line-height: 1.6;
  border: 1px solid #ddd;
}

.attestation-header {
  text-align: center;
  margin-bottom: 40px;
  border-bottom: 2px solid #2563eb;
  padding-bottom: 20px;
}

.letterhead h1 {
  color: #2563eb;
  margin: 0 0 10px 0;
  font-size: 2em;
}

.document-title h2 {
  color: #1a1a1a;
  margin: 20px 0 0 0;
  font-size: 1.5em;
  font-weight: bold;
}

.attestation-body {
  margin: 30px 0;
  text-align: justify;
}

.attestation-body ul {
  margin: 20px 0;
  padding-left: 20px;
}

.attestation-body li {
  margin: 10px 0;
}

.attestation-footer {
  margin-top: 50px;
  text-align: center;
}

.signature {
  margin-top: 30px;
  border-top: 1px solid #ddd;
  padding-top: 20px;
}
</style>
    `,
    cssStyles: '',
    isActive: true,
    isPremium: false,
    usageCount: 445,
    rating: 4.7,
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z',
    createdBy: 'admin'
  },
  {
    id: 'demande_conge',
    name: 'Demande de congé',
    description: 'Demandes officielles de congés et absences',
    category: 'administratifs',
    thumbnail: '/api/placeholder/400/300?text=Congé',
    previewImage: '/api/placeholder/800/600?text=Congé+Preview',
    tags: ['Congé', 'Absence', 'RH', 'Officiel'],
    usageCount: 324,
    rating: 4.5,
    isPremium: false,
    fields: [
      {
        id: 'employee_name',
        name: 'employee_name',
        label: 'Nom complet',
        type: 'text',
        required: true,
        placeholder: 'Jean Dupont',
        order: 1
      },
      {
        id: 'position',
        name: 'position',
        label: 'Poste',
        type: 'text',
        required: true,
        placeholder: 'Développeur Full Stack',
        order: 2
      },
      {
        id: 'department',
        name: 'department',
        label: 'Département',
        type: 'text',
        required: true,
        placeholder: 'Direction Technique',
        order: 3
      },
      {
        id: 'leave_type',
        name: 'leave_type',
        label: 'Type de congé',
        type: 'select',
        required: true,
        options: ['Congé annuel', 'Congé maladie', 'Congé exceptionnel', 'Congé maternité/paternité'],
        order: 4
      },
      {
        id: 'start_date',
        name: 'start_date',
        label: 'Date de début',
        type: 'date',
        required: true,
        order: 5
      },
      {
        id: 'end_date',
        name: 'end_date',
        label: 'Date de fin',
        type: 'date',
        required: true,
        order: 6
      },
      {
        id: 'reason',
        name: 'reason',
        label: 'Motif',
        type: 'textarea',
        required: false,
        placeholder: 'Précisez le motif si nécessaire...',
        order: 7
      }
    ],
    htmlTemplate: `
<div class="leave-request-container">
  <header class="request-header">
    <h1>DEMANDE DE CONGÉ</h1>
  </header>
  
  <main class="request-content">
    <section class="employee-info">
      <h2>Informations de l'employé</h2>
      <div class="info-grid">
        <div class="info-item">
          <label>Nom complet :</label>
          <span>{employee_name}</span>
        </div>
        <div class="info-item">
          <label>Poste :</label>
          <span>{position}</span>
        </div>
        <div class="info-item">
          <label>Département :</label>
          <span>{department}</span>
        </div>
      </div>
    </section>
    
    <section class="leave-details">
      <h2>Détails du congé</h2>
      <div class="info-grid">
        <div class="info-item">
          <label>Type de congé :</label>
          <span>{leave_type}</span>
        </div>
        <div class="info-item">
          <label>Date de début :</label>
          <span>{start_date}</span>
        </div>
        <div class="info-item">
          <label>Date de fin :</label>
          <span>{end_date}</span>
        </div>
        <div class="info-item">
          <label>Durée totale :</label>
          <span>{duration}</span>
        </div>
      </div>
      
      <div class="reason-section">
        <label>Motif :</label>
        <p>{reason}</p>
      </div>
    </section>
    
    <section class="request-footer">
      <p>Fait le {current_date}</p>
      <br>
      <div class="signature-area">
        <div class="signature-box">
          <p>Signature de l'employé</p>
          <div class="signature-line"></div>
        </div>
        <div class="signature-box">
          <p>Signature du responsable</p>
          <div class="signature-line"></div>
        </div>
      </div>
    </section>
  </main>
</div>

<style>
.leave-request-container {
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  color: #333;
  line-height: 1.6;
  border: 1px solid #ddd;
}

.request-header {
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #2563eb;
  padding-bottom: 20px;
}

.request-header h1 {
  color: #2563eb;
  margin: 0;
  font-size: 2em;
}

section {
  margin-bottom: 30px;
}

section h2 {
  color: #2563eb;
  margin-bottom: 15px;
  font-size: 1.3em;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 5px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #f8fafc;
  border-radius: 5px;
}

.info-item label {
  font-weight: bold;
  color: #374151;
}

.reason-section {
  margin-top: 20px;
  padding: 15px;
  background: #f1f5f9;
  border-radius: 5px;
}

.reason-section label {
  font-weight: bold;
  color: #374151;
  display: block;
  margin-bottom: 10px;
}

.signature-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 40px;
}

.signature-box {
  text-align: center;
}

.signature-line {
  border-bottom: 1px solid #374151;
  height: 40px;
  margin-top: 10px;
}
</style>
    `,
    cssStyles: '',
    isActive: true,
    isPremium: false,
    usageCount: 324,
    rating: 4.5,
    createdAt: '2024-01-19T10:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z',
    createdBy: 'admin'
  }
];

export const templateCategories = [
  { id: 'professionnels', name: 'Professionnels', icon: '💼' },
  { id: 'administratifs', name: 'Administratifs', icon: '📋' },
  { id: 'commerciaux', name: 'Commerciaux', icon: '💰' },
  { id: 'academiques', name: 'Académiques', icon: '🎓' },
  { id: 'personnels', name: 'Personnels', icon: '👤' },
  { id: 'creatifs', name: 'Créatifs', icon: '🎨' }
];